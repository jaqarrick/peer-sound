import { open } from "./torrentParser"
import path from "path"
import { getAnnounceRespsonse } from "./tracker/tracker"
import { AnnounceResponse } from "../types/Torrent"

const getPeers = (): null | AnnounceResponse => {
	const filePath = path.join(__dirname, "..", "/data/dn2020-1026.mp4.torrent")
	console.log(filePath)
	const torrent = open(filePath)
	console.log(torrent)
	const announceResponse: AnnounceResponse | null = getAnnounceRespsonse(
		torrent
	)
	if (announceResponse) {
		return announceResponse
	}

	return null
}

export default getPeers
