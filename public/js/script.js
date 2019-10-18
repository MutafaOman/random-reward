function UserInValidate() {
    const transferIn = $('#transferIn').val()
    const winlose = $('#winlose').val()
    const l = $('#platinum').val()
    const m = $('#gold').val()
    const s = $('#silver').val()
    const webId = $('input[name="optradio"]:checked').val()
    const percent = parseInt(l) + parseInt(m) + parseInt(s)
    if (percent == 100) {
        $('.percentage').removeClass('is-invalid')
        $('#percentage-error').text('').addClass('d-none')
        $.ajax({
            url: "/getUser",
            method: "POST",
            data: {
                transferIn: transferIn,
                winlose: winlose,
                webId: webId
            },
            success: function (result) {
                console.log(result)
                calPercentage(l, m, s, result.data, result.data.length)
            }
        });
    } else {
        $('.percentage').addClass('is-invalid')
        $('#percentage-error').text('The percentage must be 100.').addClass('d-block')
    }
}

function calPercentage(l, m, s, user, max) {
    const amount = $('#amount').val()
    const userL = parseInt(l * user.length / 100)
    const userM = parseInt(m * user.length / 100)
    let userS = parseInt(s * user.length / 100)
    let sum = (userL + userM + userS) - user.length
    if (sum < 0) {
        sum = sum * -1
        userS = userS + sum
    } else if (sum > 0) {
        userS = userS + sum
    }
    //45 35 20
    const moneyL = parseInt(45 * amount / 100)
    const moneyM = parseInt(35 * amount / 100)
    let moneyS = parseInt(20 * amount / 100)
    const allmoney = {
        moneyL: moneyL,
        moneyM: moneyM,
        moneyS: moneyS
    }
    // console.log(moneyL, moneyM, moneyS)

    if (moneyS / 20 >= userS) {
        $('.amount').removeClass('is-invalid')
        $('#amount-error').text('').addClass('d-none')
        const reward = {
            arrayL: [],
            arrayM: [],
            arrayS: []
        }

        const calS = CalSizeS(reward, user, moneyS, userS)
        const calM = CalSizeM(reward, user, moneyM, userM, calS.max)
        const calL = CalSizeL(reward, user, moneyL, userL, calM.max)
        Draw(reward, calS, calM, calL, max, allmoney)
    } else {
        $('.amount').addClass('is-invalid')
        $('#amount-error').text('Error Amount').addClass('d-block')
    }

}

function CalSizeS(reward, user, moneyS, userS) {
    const moneyDf = moneyS - (userS * 20)
    let balanceS = moneyDf / userS
    let newBalanceS = 0, numbers = []
    for (let i = 0; i < userS; i++) {
        const index = Math.floor(Math.random() * user.length);
        if (user[index]) {
            const money = Math.floor(Math.random() * (balanceS - 1 + 1) + 1);
            newBalanceS = (balanceS - money) + newBalanceS
            user[index].reward = 20 + money
            reward.arrayS.push(user[index])
            user.splice(index, 1);
        }
    }
    newBalanceS = parseInt(newBalanceS / userS)
    let countBalanceS = 0
    if (newBalanceS / userS >= 0) {
        // console.log("if", newBalanceS)
        for (let i in reward.arrayS) {
            reward.arrayS[i].reward = reward.arrayS[i].reward + newBalanceS
            numbers.push(reward.arrayS[i].reward)
            countBalanceS = countBalanceS + reward.arrayS[i].reward
        }
    } else {
        console.log("else", newBalanceS)
    }

    return {
        min: Math.min.apply(null, numbers),
        max: Math.max.apply(null, numbers),
        balance: countBalanceS
    }
}

function CalSizeM(reward, user, moneyM, userM, min) {
    const moneyDf = moneyM - (userM * min)
    let balanceM = moneyDf / userM
    let newBalanceM = 0, numbers = []
    for (let i = 0; i < userM; i++) {
        const index = Math.floor(Math.random() * user.length);
        if (user[index]) {
            const money = Math.floor(Math.random() * (balanceM - 1 + 1) + 1);
            newBalanceM = (balanceM - money) + newBalanceM
            user[index].reward = min + money
            reward.arrayM.push(user[index])
            user.splice(index, 1);
        }
    }
    newBalanceM = parseInt(newBalanceM / userM)
    let countBalanceM = 0
    if (newBalanceM / userM >= 0) {
        // console.log("if", newBalanceM)
        for (let i in reward.arrayM) {
            reward.arrayM[i].reward = reward.arrayM[i].reward + newBalanceM
            numbers.push(reward.arrayM[i].reward)
            countBalanceM = countBalanceM + reward.arrayM[i].reward
        }
    } else {
        console.log("else", newBalanceM)
    }

    return {
        min: Math.min.apply(null, numbers),
        max: Math.max.apply(null, numbers),
        balance: countBalanceM
    }
}

function CalSizeL(reward, user, moneyL, userL, min) {
    const moneyDf = moneyL - (userL * min)
    let balanceL = moneyDf / userL
    let newBalanceL = 0, numbers = []
    for (let i = 0; i < userL; i++) {
        const index = Math.floor(Math.random() * user.length);
        if (user[index]) {
            const money = Math.floor(Math.random() * (balanceL - 1 + 1) + 1);
            newBalanceL = (balanceL - money) + newBalanceL
            user[index].reward = min + money
            reward.arrayL.push(user[index])
            user.splice(index, 1);
        }
    }
    newBalanceL = parseInt(newBalanceL / userL)
    let countBalanceL = 0
    if (newBalanceL / userL >= 0) {
        // console.log("if", newBalanceL)
        for (let i in reward.arrayL) {
            reward.arrayL[i].reward = reward.arrayL[i].reward + newBalanceL
            numbers.push(reward.arrayL[i].reward)
            countBalanceL = countBalanceL + reward.arrayL[i].reward
        }
    } else {
        console.log("else", newBalanceL)
    }

    return {
        min: Math.min.apply(null, numbers),
        max: Math.max.apply(null, numbers),
        balance: countBalanceL
    }
}

function Draw(reward, calS, calM, calL, max, allmoney) {
    $('#max').val(max);
    //Size s
    $('#silver-min').val(calS.min)
    $('#silver-max').val(calS.max)
    $('#balancS').text(`${allmoney.moneyS} - ${calS.balance} = ${allmoney.moneyS - calS.balance}`)
    $('#userS').val(reward.arrayS.length)

    //Size m
    $('#gold-min').val(calM.min)
    $('#gold-max').val(calM.max)
    $('#balancM').text(`${allmoney.moneyM} - ${calM.balance} = ${allmoney.moneyM - calM.balance}`)
    $('#userM').val(reward.arrayM.length)

    //Size L
    $('#platinum-min').val(calL.min)
    $('#platinum-max').val(calL.max)
    $('#balancL').text(`${allmoney.moneyL} - ${calL.balance} = ${allmoney.moneyL - calL.balance}`)
    $('#userL').val(reward.arrayL.length)

    let html = ''
    html += `<div>`
    html += `<table class="table"><thead>`
    html += `<tr><th>No.</th><th>User</th><th>Reward</th>`
    html += `<tbody>`
    for (let i in reward.arrayS) {
        html += `<tr>`
        html += `<td>${parseInt(i) + 1}</td>`
        html += `<td>${reward.arrayS[i].user}</td>`
        html += `<td>${reward.arrayS[i].reward}</td>`
        html += `</tr>`
    }
    html += `</tbody>`
    html += `</tr></thead></table>`
    html += `</div>`
    $('#divRewardS').html(html)

    let html2 = ''
    html2 += `<div>`
    html2 += `<table class="table"><thead>`
    html2 += `<tr><th>No.</th><th>User</th><th>Reward</th>`
    html2 += `<tbody>`
    for (let i in reward.arrayM) {
        html2 += `<tr>`
        html2 += `<td>${parseInt(i) + 1}</td>`
        html2 += `<td>${reward.arrayM[i].user}</td>`
        html2 += `<td>${reward.arrayM[i].reward}</td>`
        html2 += `</tr>`
    }
    html2 += `</tbody>`
    html2 += `</tr></thead></table>`
    html2 += `</div>`
    $('#divRewardM').html(html2)

    let html3 = ''
    html3 += `<div>`
    html3 += `<table class="table"><thead>`
    html3 += `<tr><th>No.</th><th>User</th><th>Reward</th>`
    html3 += `<tbody>`
    for (let i in reward.arrayL) {
        html3 += `<tr>`
        html3 += `<td>${parseInt(i) + 1}</td>`
        html3 += `<td>${reward.arrayL[i].user}</td>`
        html3 += `<td>${reward.arrayL[i].reward}</td>`
        html3 += `</tr>`
    }
    html3 += `</tbody>`
    html3 += `</tr></thead></table>`
    html3 += `</div>`
    $('#divRewardL').html(html3)
    console.log(reward)
}