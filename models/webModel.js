const mongoose = require("mongoose");

//define the schema for our user model
const websSchema = mongoose.Schema(
    {
        name: String,
        color: String,
        webType: String
    },
    {
        timestamps: true
    }
);

//create the model for event and expose it to our app
module.exports = mongoose.model("webs", websSchema);
