const express = require("express");
const cookieparser = require("cookie-parser");
const urlRout = require("./routes/rout");
const { resticttologin, chechauth } = require("./middlewares/authe");
const staticRout = require("./routes/static");
const userroute = require("./routes/usersing");
const path = require("path");
const URL = require("./models/user");
const { connectToMongo } = require("./connect");
const app = express();
const port = 8000;
connectToMongo("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("DB is connected")
);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  console.log("ShortId:", shortId); // Debugging

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    console.log("Entry:", entry); // Debugging

    if (!entry) {
      return res.status(404).send("Short URL not found.");
    }

    res.redirect(entry.redirectURL);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
app.use(cookieparser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", resticttologin, urlRout);
app.use("/", chechauth, staticRout);
app.use("/user", userroute);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.listen(port, () => console.log("server is listening on the 8000 port"));
