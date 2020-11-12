import buffer from "buffer"
const Buffer = buffer.Buffer
import crypto from "crypto"
import { Torrent } from "../../../types/Torrent"
import { infoHash, size } from "../../torrentParser"
import { genId } from "./util"

const buildAnnounceReq = (
	connId: Buffer,
	torrent: Torrent,
	port = 6881
): Buffer => {
	//an announce request contains a buffer of 98 bytes
	//some elements are similar to the conn resp/req
	const buf = Buffer.allocUnsafe(98)

	//connection id
	connId.copy(buf, 0)

	//action --- unlike before, our action is now ANNOUNCE(1)
	//rather than CONNECT(0)
	buf.writeUInt32BE(1, 8)

	//transaction id
	crypto.randomBytes(4).copy(buf, 12)

	//info hash
	infoHash(torrent).copy(buf, 16)

	// peerId - this is a unique id to the client. This is a random 20-byte string
	genId().copy(buf, 36)
	// downloaded
	Buffer.alloc(8).copy(buf, 56)
	// left
	size(torrent).copy(buf, 64)
	// uploaded
	Buffer.alloc(8).copy(buf, 72)
	// event - initialized to 0
	buf.writeUInt32BE(0, 80)
	// ip address - initialized to 0
	buf.writeUInt32BE(0, 80)
	// key - initialized to 0
	crypto.randomBytes(4).copy(buf, 88)
	// num want
	buf.writeInt32BE(-1, 92)
	// port -- spec says bitTorrent ports should be between 6881 and 6889.
	// port default for this app is 6881
	buf.writeUInt16BE(port, 96)

	return buf
}

export default buildAnnounceReq
