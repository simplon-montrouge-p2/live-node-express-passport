const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

const initialize = (passport) => {
  const authenticateUser = (email, password, done) => {
    User.findByEmail(email, async (error, user) => {
      if (error) {
        return done(error);
      }
      if (!user) {
        return done(null, false, { message: "Utilisateur inconnu" });
      }
      if (!(await User.validPassword(password, user.password))) {
        return done(null, false, { message: "Mot de passe incorrect" });
      }
      return done(null, user);
    });
  };
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(null, user);
    });
  });
};

module.exports = initialize;
