import * as actiontype from "../constantes/product.actions";

class ProductActions {
  static addAll = (products = null) => {
    return {
      type: actiontype.ADDALLPRODS,
      payload: products,
    };
  };
  static addOne = (product) => {
    return {
      type: actiontype.ADDONEPRODUCT,
      payload: product,
    };
  };
  static edit = (product) => {
    return {
      type: actiontype.EDITPRODUCT,
      payload: product,
    };
  };
  static remove = (prod_id) => {
    return {
      type: actiontype.REMOVEPRODUCT,
      payload: prod_id,
    };
  };
}

export default ProductActions;
