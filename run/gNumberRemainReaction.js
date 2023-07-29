function numberReaction (remain) {
    let reaction
    const allNumber = ['🔟','9️⃣','8️⃣','7️⃣','6️⃣','5️⃣','4️⃣','3️⃣','2️⃣','1️⃣']

    if (remain === 10) reaction = allNumber[0]
    else if (remain === 9) reaction = allNumber[1]
    else if (remain === 8) reaction = allNumber[2]
    else if (remain === 7) reaction = allNumber[3]
    else if (remain === 6) reaction = allNumber[4]
    else if (remain === 5) reaction = allNumber[5]
    else if (remain === 4) reaction = allNumber[6]
    else if (remain === 3) reaction = allNumber[7]
    else if (remain === 2) reaction = allNumber[8]
    else if (remain === 1) reaction = allNumber[9]
    else if (remain === 0) reaction = '💀'

	return reaction
}
  
module.exports = numberReaction
