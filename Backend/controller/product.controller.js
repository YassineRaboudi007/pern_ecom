const ProductDAO = require("../models/products.db");
const imageUpload = require("../helpers/fileUpload");
const { ErrorHandler } = require("../helpers/ErrorHandler");
const upload = require("../helpers/fileUpload").single("image");
const fs = require("fs");

class ProductController {
  static getAllProducts = async (req, res, next) => {
    try {
      res.json(await ProductDAO.getAllProducts());
    } catch (err) {
      next(new ErrorHandler(err.statusCode, err.message));
    }
  };

  static getProdById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const prod = await ProductDAO.getProductById(id);
      if (!prod) next(new ErrorHandler(404, "Product Not Found"));
      res.json(await ProductDAO.getProductById(id));
    } catch (err) {
      next(new ErrorHandler(err.statusCode, err.message));
    }
  };

  static getListByIds = async (req, res, next) => {
    try {
      const { ids } = req.query;

      res.json(await ProductDAO.getProdByIds(ids));
    } catch (err) {
      next(new ErrorHandler(err.statusCode, err.message));
    }
  };

  static addProduct = async (req, res, next) => {
    upload(req, res, async (err) => {
      if (err) {
        next(new ErrorHandler(err.statusCode, err.message));
      }

      const { name, qty, price, description } = req.body;
      if (!name || !qty || !description || !price) {
        next(new ErrorHandler(406, "Field is empty"));
      }
      if (isNaN(parseInt(qty)) || isNaN(parseFloat(price))) {
        next(new ErrorHandler(406, "Price and Qty must be numbers"));
      }
      try {
        res.send(
          await ProductDAO.addProduct(
            name,
            parseInt(qty),
            parseFloat(price),
            description,
            req.file.filename
          )
        );
      } catch (err) {
        next(new ErrorHandler(err.statusCode, err.message));
      }
    });
  };

  static deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.body;
      const prod = await ProductDAO.getProductById(id);
      console.log(prod);
      console.log("--------------------------------");
      if (!prod) next(new ErrorHandler(404, "Product Not Found"));
      fs.unlink(`${__dirname}/../public/${prod.picture}`, (err) =>
        console.error(err)
      );
      res.json(await ProductDAO.deleteProduct(id));
    } catch (err) {
      next(new ErrorHandler(err.statusCode, err.message));
    }
  };

  static updateProdById = async (req, res, next) => {
    try {
      const { prod_id: id } = req.body;
      //Check if product exists
      const prod = await ProductDAO.getProductById(id);
      res.send(prod);
      if (!prod) next(new ErrorHandler(404, "Product Not Found"));

      //Check if fields are fielled
      const { name, qty, price, description } = req.body;
      if (!name || !qty || !description || !price) {
        next(new ErrorHandler(406, "Field is empty"));
      }
      //update if image is not sent
      if (!req.body.image) {
        return res.json(await ProductDAO.updateProduct(req.body));
      }

      await ProductDAO.deleteProduct(id);
      await ProductController.addProduct(req, res, next);
    } catch (err) {
      next(new ErrorHandler(err.statusCode, err.message));
    }
  };
}

module.exports = ProductController;
