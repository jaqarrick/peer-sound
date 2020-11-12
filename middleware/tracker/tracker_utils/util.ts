import crypto from "crypto"
let id: null | Buffer = null

const genId = () => {
	if (!id) {
		id = crypto.randomBytes(20)
		//Here is where the Peerid of the bitTorrent client is generated
		//ET for ext-torrent, 0001 for version no.
		Buffer.from("-ET0001-").copy(id, 0)
	}
	return id
}

export { genId }
