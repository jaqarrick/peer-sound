const respType = (resp: Buffer) => {
	const action = resp.readUInt32BE(0)
	if (action === 0) return "connect"
	if (action === 1) return "announce"
}

export default respType
