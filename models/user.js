const bcrypt = require("bcrypt");

const db = require("../config/db");

class User {
  constructor(props) {
    const { name, email, password } = props;

    this._name = name;
    this._email = email;
    this._password = password;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  static create(newUser, done) {
    const query = `INSERT INTO users(name, email, password) VALUES('${newUser.name}', '${newUser.email}', '${newUser.password}');`;

    db.query(query, (error, created) => {
      if (error) {
        console.error(`Erreur : ${error}`);
        return done(error, null);
      }

      console.log("Utilisateur créé");
      return done(null, {
        id: created.insertId,
        ...newUser,
      });
    });
  }

  static findByEmail(email, done) {
    const query = `SELECT * FROM users WHERE email = '${email}';`;

    db.query(query, (error, data) => {
      if (error) {
        console.error(`Erreur : ${error}`);
        return done(error, null);
      }

      const user = data[0];
      console.log(`Utilisateur : ${user}`);
      return done(null, user);
    });
  }

  static findById(id, done) {
    const query = `SELECT * FROM users WHERE id = '${id}';`;

    db.query(query, (error, data) => {
      if (error) {
        console.error(`Erreur : ${error}`);
        return done(error, null);
      }

      const user = data[0];
      console.log(`Utilisateur : ${user}`);
      return done(null, user);
    });
  }

  static async hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  static async validPassword(password, userPassword) {
    return await bcrypt.compare(password, userPassword);
  }
}

module.exports = User;
