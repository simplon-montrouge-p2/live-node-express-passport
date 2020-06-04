const express = require("express");

const authRouter = require("./auth");

const router = express.Router();

router.use(authRouter);

router.get("/", (request, response) => {
  const name = request.user ? request.user.name : "";
  response.render("home.ejs", { name });
});

router.get("*", (request, response) => {
  response.status(404).render("404.ejs");
});

module.exports = router;
