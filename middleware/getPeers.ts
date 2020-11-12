import { open } from "./torrentParser"
import path from "path"
import { getAnnounceRespsonse } from "./tracker/tracker"
import { AnnounceResponse } from "../types/Torrent"

const getPeers = (
	torrentName: string,
	callback: (resp: any) => any
): null | AnnounceResponse => {
	const filePath = path.join(__dirname, "..", `/uploads/${torrentName}`)
	const torrent = open(filePath)
	const announceResponse: AnnounceResponse | null = getAnnounceRespsonse(
		torrent,
		callback
	)

	if (announceResponse) {
		return announceResponse
	}

	return null
}

export default getPeers
