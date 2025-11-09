const URL = require("../models/user");

async function generateShortUrl(req, res) {
  const { nanoid } = await import("nanoid");
  const body = req.body;
  if (!body.url) return res.status(400).json({ err: "url is require " });
  const shortid = nanoid(8);
  await URL.create({
    shortId: shortid,
    redirectURL: body.url,
    visitHistory: [],
    createdby: req.user._id,
  });
  return res.render("home", {
    id: shortid,
  });
}
async function clicksurl(req, res) {
  const shortId = req.params.shortId;
  console.log("shortId:", shortId); // Log the shortId
  try {
    const result = await URL.findOne({ shortId });
    console.log("Result:", result); // Log the result of the database query

    if (!result) {
      return res.status(404).json({ err: "Short URL not found." });
    }

    return res.status(200).json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Failed to fetch analytics." });
  }
}

module.exports = {
  generateShortUrl,
  clicksurl,
};
