function randomIntFromInterval() {
    const count = UserInValidate()
    const max = count.max
    Draw(max)
}

function UserInValidate() {
    let status = true
    const tranferInMin = $('#tranferIn').val()
    const turnOverMin = $('#turnover').val()
    const platinum = $('#platinum').val()
    const gold = $('#gold').val()
    const silver = $('#silver').val()
    const percent = parseInt(platinum) + parseInt(gold) + parseInt(silver)
    const array = []
    if (percent == 100) {
        $('.percentage').removeClass('is-invalid')
        $('#percentage-error').text('').addClass('d-none')
        for (let i in User) {
            if (parseInt(tranferInMin) <= User[i].tranferIn &&
                parseInt(turnOverMin) <= User[i].turnOver) {
                array.push(User[i])
            }
        }
        calPercentage(platinum, gold, silver)
    } else {
        $('.percentage').addClass('is-invalid')
        $('#percentage-error').text('The percentage must be 100.').addClass('d-block')
        status = false
    }

    const data = {
        status: status,
        max: array.length,
        data: array
    }

    return data
}

function calPercentage(platinum, gold, silver) {
    const amount = $('#amount').val()
    const moneyPlatinum = platinum * amount / 100
    const moneyGold = gold * amount / 100
    const moneySilver = silver * amount / 100
    console.log(moneyPlatinum, moneyGold, moneySilver)
}

function Draw(count) {
    $('#max').val(count);
}