import React, { ChangeEvent, useCallback, useState, useEffect } from "react"
import "./App.css"
import { AnnounceResponse, PeersObject } from "../../types/Torrent"
import styled from "@emotion/styled"
// import {css, jsx} from '@emotion/react'
import { css } from "@emotion/css"
import { ToneAudioNode, MonoSynth } from "tone"
import { ScoreData } from "../../types/Score"
import wavetypes from "./utils/Wavetypes"

const InputContainer = styled.div`
	border: solid red 1px;
`

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
	const [voices, setVoices] = useState<any>()
	const [scoreData, setScoreData] = useState<ScoreData>()

	useEffect(() => {
		const synths = scoreData?.IPs.map((ip: number[]) => {
			const isEven: boolean = ip[0] % 2 === 0

			//set the wavetype equal either a random string from wavetypes
			return new MonoSynth({
				oscillator: {
					type: "triangle15",
				},
			}).toDestination()
		})
	}, [scoreData])
	useEffect(() => {
		const IPs:
			| undefined
			| number[][] = peerData?.peers
			.map((peer: PeersObject) => peer.ip.split("."))
			.map((ipArray: string[]) =>
				ipArray.map((ipPart: string) => Number(ipPart))
			)
		const ports: number[] | undefined = peerData?.peers.map(
			(peer: PeersObject) => peer.port
		)
		console.log(IPs, ports)
		const ID: number[] | undefined = peerData?.transactionId
			?.toString()
			.split("")
			.map(Number)
		if (IPs && ports && ID) {
			setScoreData({ IPs, ports, ID })
		}
	}, [peerData])

	const [instruments, setInstruments] = useState<ToneAudioNode[] | null>(null)
	useEffect(() => console.log(peerData), [peerData])
	return (
		<div className='App'>
			<InputContainer
				className={
					peerData
						? css`
								display: none;
						  `
						: css`
								display: block;
						  `
				}>
				<input type='file' name='torrent' onChange={handleUpload} />
			</InputContainer>
		</div>
	)
}

export default App
