const User = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const { setuser } = require("../service/auth");
async function handlesignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    Name: name,
    email: email,
    password: password,
  });
  return res.redirect("/");
}
async function handlelogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      Error: "Wrong Credentials || if not signed in then first signup",
    });
  console.log(user);

  const token=setuser( user);
  res.cookie("uid", token);

  return res.redirect("/");
}

module.exports = {
  handlesignup,
  handlelogin,
};
