const { getuser } = require("../service/auth");
async function resticttologin(req, res, next) {
  const userid = req.cookies?.uid;
  console.log(userid);
  if (!userid) return res.redirect("/login");
  const user = getuser(userid);
  console.log(user);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}

async function chechauth(req, res, next) {
  const userid = req.cookies?.uid;

  const user = getuser(userid);

  req.user = user;
  next();
}
module.exports = {
  resticttologin,
  chechauth,
};
