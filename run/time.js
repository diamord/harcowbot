const isHostTime = true
function nowTime() {
    let x
	let toPad = function (text) {
        return text.padStart(2, '0')
    }
	if (!isHostTime) x = new Date
	else {
		const utcTimestamp = Date.now()
		const utcOffset = 6 * 60 * 60 * 1000
		const utcPlus8Timestamp = utcTimestamp + utcOffset
		x = new Date(utcPlus8Timestamp)
	}
	
	const month = x.getMonth() + 1
	const day = x.getDate()
	const hours = x.getHours()
	const minutes = x.getMinutes()
	const seconds = x.getSeconds()
	return `${toPad(month.toString())}/${toPad(day.toString())} ${toPad(hours.toString())}:${toPad(minutes.toString())}:${toPad(seconds.toString())}`
}
  
module.exports = nowTime