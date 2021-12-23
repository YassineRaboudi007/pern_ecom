const db = require("../db.js");

class ProductDAO {
  static addProduct = async (name, qty, price, description, picture) => {
    const newProduct = await db.query(
      "insert into products (name, qty, price, description, picture) values($1,$2,$3,$4,$5) RETURNING *",
      [name, qty, price, description, picture]
    );
    return newProduct.rows[0];
  };

  static getAllProducts = async () => {
    const products = await db.query("select * from products");
    return products.rows;
  };

  static getProductById = async (id) => {
    const prod = await db.query("select * from products where prod_id = $1;", [
      id,
    ]);
    return prod.rows[0];
  };

  static deleteProduct = async (id) => {
    const prod = await db.query("delete from products where prod_id = $1;", [
      id,
    ]);
    return prod;
  };

  static getProdByIds = async (prodIds) => {
    let res = [];
    for (let i = 0; i < prodIds.length; i++) {
      const prod = await db.query(
        "select * from products where prod_id = $1;",
        [prodIds[i]]
      );
      res.push(prod.rows[0]);
    }

    return res;
  };

  static updateProduct = async ({ prod_id, name, qty, price, description }) => {
    const updatedProd = await db.query(
      "update products set name = $1,qty=$2,price=$3,description=$4 where prod_id=$5 returning *",
      [name, qty, price, description, prod_id]
    );
    return updatedProd.rows[0];
  };
}

module.exports = ProductDAO;
