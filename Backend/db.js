const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "yassine",
  host: "localhost",
  port: 5432,
  database: "pern_ecomm",
});

module.exports = {
  query: (text, params = []) => pool.query(text, params),
};
