const express = require("express");
const ejs = require("ejs");
const logger = require("morgan");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");

const initializePassport = require("./config/passport");
const routes = require("./routes");

const server = express();

const PORT = 8080;

initializePassport(passport);

// TEMPLATE ENGINE
server.engine("ejs", ejs.renderFile);
server.use("/dist", express.static("dist"));

// MIDDLEWARES
server.use(logger("dev"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(flash());

// SESSION
server.use(
  session({
    secret: "nyan cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000, // 24 hours
    },
  })
);

// PASSPORT
server.use(passport.initialize());
server.use(passport.session());

// ROUTES
server.use(routes);

// SERVER LISTENING
server.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
