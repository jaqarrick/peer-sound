import express from "express"
import path from "path"
import { torrentFilter } from "./middleware/helpers"
import getPeers from "./middleware/getPeers"
import multer from "multer"
const app = express()
const dev = app.get("env") !== "production"
const normalizePort = (port: string) => parseInt(port, 10)
const PORT = normalizePort(process.env.PORT || "5000")

const upload = multer({ dest: "./uploads" })

app.post("/upload", upload.single("torrent"), async (req, res, next) => {
	console.log(req.file)
	const peerObject = getPeers(req.file.filename)
	console.log("peer object", peerObject)
	res.send("peerobject")
})

app.listen(PORT, () => {
	console.log(`the server is up and running on port ${PORT}`)
})
