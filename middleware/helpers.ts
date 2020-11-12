const torrentFilter = (req: any, file: any, cb: any) => {
	if (!file.originalname.match(/\.(torrent)$/)) {
		req.fileValidationError = "Only .torrent files are allowed!"
		return cb(new Error("Only torrent files are allowed!"), false)
	}
	cb(null, true)
}

export { torrentFilter }
