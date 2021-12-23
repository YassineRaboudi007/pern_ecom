const UserDAO = require("../models/users.db");
const { ErrorHandler } = require("../helpers/ErrorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
  static signup = async (req, res, next) => {
    try {
      const { firstname, lastname, email, phone, password } = req.body;
      const oldUser = await UserDAO.getUserByEmail(email);
      if (oldUser)
        next(
          new ErrorHandler(400, {
            field: "email",
            message: "Email already taken",
          })
        );
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserDAO.addUser([
        firstname,
        lastname,
        email,
        hashedPassword,
        phone,
      ]);
      const token = jwt.sign({ user: newUser }, "lebron is the goat", {
        expiresIn: "1h",
      });
      if (newUser) res.status(201).json({ token });
      next();
    } catch (err) {
      next(new ErrorHandler(err.statusCode, err.message));
    }
  };
}

module.exports = UserController;
