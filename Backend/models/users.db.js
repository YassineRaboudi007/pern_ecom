const db = require("../db");

class UserDAO {
  static addUser = async (fields) => {
    const newUser = await db.query(
      "insert into users (firstname,lastname,email,password,phone) values($1,$2,$3,$4,$5) RETURNING *;",
      [...fields]
    );
    return newUser.rows[0];
  };

  static getUserByEmail = async (email) => {
    const user = await db.query("select * from users where email = $1;", [
      email,
    ]);
    return user.rows[0];
  };
}

module.exports = UserDAO;
