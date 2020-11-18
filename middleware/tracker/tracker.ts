import dgram from "dgram"
import url from "url"
const urlParse = url.parse
import buffer from "buffer"

import buildConnReq from "./tracker_utils/buildConnReq"
import parseConnResp from "./tracker_utils/parseConnResp"
import buildAnnounceReq from "./tracker_utils/buildAnnounceReq"
import parseAnnounceResp from "./tracker_utils/parseAnnounceResp"
// import respType from './tracker_utils/respType'
import {
	Torrent,
	ConnectionResponse,
	AnnounceResponse,
} from "../../types/Torrent"
import respType from "./tracker_utils/respType"

//UDP Tracker Protocol and Message Format
//Trackers follow a specific protocol and message format
//In order to get a list of peers, we need to follow this protocol.
//1. Send a connect request
//2. Get the connect response and extract connection id
//3. Use the connection id to send an announce request - this is where we tell
//the tracker which files we're interested in
//4. Get the announce response and extract the peers list

const getAnnounceRespsonse = (
	torrent: Torrent,
	callback: (announceResp: any) => any
): null | AnnounceResponse => {
	//dgram is a module for udp.
	//socket instance is a means for network communication.
	//argument 'udp4' means we want to use 4-byte IPv4 address (this is the most commonly used)
	const socket = dgram.createSocket("udp4")
	//Extract url parts (protocol, hostname, port, etc)
	const url = urlParse(torrent.announce.toString("utf8"))
	// 1. send connect request
	//This is a convenience function, exctracted from socket.send. It excludes the offset and length arguments, since we are sending the whole buffer.
	udpSend(socket, buildConnReq(), url)

	socket.on("message", response => {
		console.log(`response to connection request: ${response}`)
		// console.log(respType(response))
		//there will be two responses upon the request: a connect and an announce response. We need to distinguish between the two and process them separately.
		if (respType(response) === "connect") {
			const connResp: ConnectionResponse = parseConnResp(response)
			const announceReq = buildAnnounceReq(connResp.connectionId, torrent)
			udpSend(socket, announceReq, url)
		} else if (respType(response) === "announce") {
			const announceResp: AnnounceResponse = parseAnnounceResp(response)
			callback(announceResp)
			return announceResp
		}
	})

	return null
}

const udpSend = (
	socket: any,
	message: Buffer,
	rawUrl: any,
	callback = (err: Error) => {
		if (err) {
			console.log(err)
			socket.close()
		}
	}
) => {
	console.log("connection requested!")
	const url = urlParse(rawUrl)
	console.log(url, url.port, url.hostname)
	socket.send(message, 0, message.length, url.port, url.hostname, callback)
}

export { getAnnounceRespsonse }
