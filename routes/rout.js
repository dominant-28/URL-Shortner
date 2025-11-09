const express = require("express");
const { generateShortUrl, clicksurl } = require("../controller/url.js");

const router = express.Router();
router.get("/analytics/:shortId", clicksurl);
router.post("/", generateShortUrl);
module.exports = router;
