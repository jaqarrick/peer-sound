import { ConnectionResponse } from "../../../types/Torrent"

const parseConnResp = (resp: Buffer): ConnectionResponse => {
	// a connection response is another 16 byte buffer
	console.log(resp.slice(8))
	return {
		//first 4 bytes are an action (32 bits), in this case would be 0
		action: resp.readUInt32BE(0),

		//next 4 bytes are transation_id
		transactionId: resp.readUInt32BE(4),

		//final 8 bytes (64-bit integer) are connection_id
		connectionId: resp.slice(8),
	}
}

export default parseConnResp
