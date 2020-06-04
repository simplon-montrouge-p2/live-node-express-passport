const express = require("express");
const passport = require("passport");

const authController = require("../controllers/auth");

const authRouter = express.Router();

authRouter.get("/register", authController.registerPage);
authRouter.post("/register", authController.register);
authRouter.get("/login", authController.loginPage);
authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

authRouter.get("/logout", (request, response) => {
  request.logout();
  response.redirect("/");
});

module.exports = authRouter;
