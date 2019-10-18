const mongoose = require("mongoose");

//define the schema for our user model
const usersSchema = mongoose.Schema(
    {
        user: String,
        date: Date,
        usernameUpper: String,
        transferInAmount: Number,
        winlose: Number
    },
    {
        timestamps: true
    }
);

//create the model for event and expose it to our app
module.exports = mongoose.model("summaryuserweb_days", usersSchema);
