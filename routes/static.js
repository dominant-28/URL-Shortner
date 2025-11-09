const express = require("express");
const router = express.Router();
const URL = require("../models/user");
router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const userId = req.user._id; // Get the logged-in user's ID
  const allurl = await URL.find({ createdby: userId });
  return res.render("home", {
    urls: allurl,
  });
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
