import React, { ChangeEvent, useCallback, useState } from "react"
import "./App.css"
import { AnnounceResponse } from "../../types/Torrent"

function App() {
	const [peerData, setPeerData] = useState<AnnounceResponse | null>(null)
	const handleUpload = useCallback(
		async (event: ChangeEvent<HTMLInputElement>) => {
			const files: FileList | null = event.target.files
			const formData: FormData = new FormData()
			if (files) formData.append("torrent", files[0])

			const response = await fetch("/upload", {
				method: "POST",
				body: formData,
			})
			const json = await response.json()
			const obj: AnnounceResponse = JSON.parse(json)
			setPeerData(obj)
		},
		[setPeerData]
	)
	return (
		<div className='App'>
			<input type='file' name='torrent' onChange={handleUpload} />
		</div>
	)
}

export default App
