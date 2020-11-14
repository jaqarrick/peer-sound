export interface Torrent {
	announce: Buffer
	"announce-list": Buffer[]
	"created by": Buffer[]
	"creation date": number
	encoding: Buffer
	info: InfoObject
}

interface InfoObject {
	length: number
	name: Buffer
	"piece length": number
	pieces: Buffer
	private: number
	files?: any
}

export interface ConnectionResponse {
	action: number
	transactionId: number
	connectionId: Buffer
}

export interface AnnounceResponse {
	action: number
	transactionId: number
	leechers: number
	seeders: number
	peers: PeersObject[]
}

export interface PeersObject {
	ip: string
	port: number
}
