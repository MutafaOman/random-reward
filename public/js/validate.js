$('#random').validate({
    errorClass: 'is-invalid',
    rules: {
        'amount': {
            required: !0,
        },
        'tranferIn': {
            required: !0,
        },
        'turnover': {
            required: !0,
        },
        'platinum': {
            required: !0,
        },
        'gold': {
            required: !0,
        },
        'silver': {
            required: !0,
        },
        'platinum-min': {
            required: !0,
        },
        'platinum-max': {
            required: !0,
        },
        'gold-min': {
            required: !0,
        },
        'gold-max': {
            required: !0,
        },
        'silver-min': {
            required: !0,
        },
        'silver-max': {
            required: !0,
        }
    },
    messages: {
        'amount': {
            required: 'Enter amount',
        },
        'tranferIn': {
            required: 'Enter tranferIn min',
        },
        'turnover': {
            required: 'Enter turnover min',
        },
        'platinum': {
            required: 'Enter percentage',
        },
        'gold': {
            required: 'Enter percentage',
        },
        'silver': {
            required: 'Enter percentage',
        },
        'platinum-min': {
            required: 'Enter Platinum Min',
        },
        'platinum-max': {
            required: 'Enter Platinum Max',
        },
        'gold-min': {
            required: 'Enter Gold Min',
        },
        'gold-max': {
            required: 'Enter Gold Max',
        },
        'silver-min': {
            required: 'Enter Silver Min',
        },
        'silver-max': {
            required: 'Enter Silver Max',
        }
    },
    submitHandler: function (form) {
        randomIntFromInterval()
    }
});