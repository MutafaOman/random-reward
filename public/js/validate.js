$('#random').validate({
    errorClass: 'is-invalid',
    rules: {
        'amount': {
            required: !0,
        },
        'transferIn': {
            required: !0,
        },
        'winlose': {
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
        }
    },
    messages: {
        'amount': {
            required: 'Enter amount',
        },
        'transferIn': {
            required: 'Enter transferIn min',
        },
        'winlose': {
            required: 'Enter Winlose min',
        },
        'platinum': {
            required: 'Enter percentage',
        },
        'gold': {
            required: 'Enter percentage',
        },
        'silver': {
            required: 'Enter percentage',
        }
    },
    submitHandler: function (form) {
        UserInValidate()
    }
});