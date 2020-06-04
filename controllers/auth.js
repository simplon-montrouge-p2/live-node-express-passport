const User = require("../models/user");

exports.registerPage = (request, response) => {
  response.render("register.ejs");
};

exports.register = async (request, response) => {
  const { name, email, password } = request.body;
  const hashedPassword = await User.hashPassword(password);
  const newUser = {
    name,
    email,
    password: hashedPassword,
  };

  User.create(newUser, (error, user) => {
    if (error) {
      response.render("error.ejs");
    }
    response.redirect("/login");
  });
};

exports.loginPage = (request, response) => {
  response.render("login.ejs");
};
