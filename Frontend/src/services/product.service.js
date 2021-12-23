import API from "../api/axios.config";

class ProductService {
  static getProducts = async () => {
    try {
      const res = await API.get("/products");
      return { res, err: null };
    } catch (err) {
      return { res: null, err };
    }
  };

  static getListOfProductsByIds = async (ids) => {
    try {
      const res = await API.get("/products/ListOfProdsByIds", {
        params: {
          ids,
        },
      });
      const { data } = res;
      return { res: data, err: null };
    } catch (err) {
      return { res: null, err };
    }
  };

  static getProdById = async (id) => {
    try {
      const res = await API.get(`/products/${id}`);
      const { data } = res;
      return { res: data, err: null };
    } catch (err) {
      return { res: null, err };
    }
  };

  static deleteProduct = async (id) => {
    try {
      const res = await API.delete("/products/delete", {
        data: { id },
      });
      return { res, err: null };
    } catch (err) {
      return { res: null, err };
    }
  };

  static updateProduct = async (productData) => {
    try {
      const res = await API.put("/products/update", {
        data: { data: productData },
      });
      return { res, err: null };
    } catch (err) {
      return { res: null, err };
    }
  };

  static addProduct = async (formData) => {
    try {
      const queryRes = await API.post("/products/Add", formData);
      return queryRes;
    } catch (err) {
      throw err;
    }
  };
}

export default ProductService;
