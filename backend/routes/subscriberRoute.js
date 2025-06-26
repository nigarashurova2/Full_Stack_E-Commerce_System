const express = require("express");
const router = express.Router();
const {createSubscribe} = require("../controllers/subscribeController");


// @route POST /api/subscribe
// @desc add subscribe
// @access public
router.post("/", createSubscribe)



module.exports = router;