import express from "express"
import path from "path"
import getPeers from "./middleware/getPeers"
import multer from "multer"
import { AnnounceResponse } from "./types/Torrent"
const app = express()
const dev = app.get("env") !== "production"
const normalizePort = (port: string) => parseInt(port, 10)
const PORT = normalizePort(process.env.PORT || "5000")
import fs from "fs"
if (!dev) {
	app.use(express.static(path.resolve(__dirname, "client", "build")))
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	})
}

const upload = multer({ dest: "./uploads" })

app.post("/upload", upload.single("torrent"), (req, res, next) => {
	console.log("upload received")
	console.log(req.file)
	getPeers(req.file.filename, (announceResponse: AnnounceResponse) => {
		console.log(
			"this is the announce response",
			JSON.stringify(announceResponse)
		)
		res.json(JSON.stringify(announceResponse))
		fs.truncate(path.resolve("/uploads"), 0, () => console.log("filesreset"))
		res.end()
	})
})

app.listen(PORT, () => {
	console.log(`the server is up and running on port ${PORT}`)
})

