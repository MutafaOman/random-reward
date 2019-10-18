var express = require('express');
var router = express.Router();
const User = require('../models/userModel')
const Web = require('../models/webModel')
var mongoose = require("mongoose");
/* GET home page. */
router.get('/', async (req, res, next) => {
  const w = await Web.aggregate(
    [
      {
        $group: {
          _id: "$webType",
          data: { $push: "$$ROOT" }
        }
      },
      { $sort: { "createdAt": 1 } }
    ]
  )
  res.render('index', { web: w });
});

router.post('/getUser', async (req, res) => {
  const $Req = req.body
  const result = await User.find({
    transferInAmount: { $gte: $Req.transferIn },
    winlose: { $gte: -$Req.winlose, $lte: $Req.winlose },
    webId: mongoose.Types.ObjectId($Req.webId),
    date: '2019-01-11 17:00:00.000Z'
  })
  res.json({ data: result })
})

module.exports = router;
