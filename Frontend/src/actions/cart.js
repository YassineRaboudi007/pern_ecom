import * as actiontype from "../constantes/cart.actions";

class CartAction {
  static addOrUpdateItem = (id, qty) => {
    return {
      type: actiontype.ADDORUPDATEITEM,
      payload: {
        id: parseInt(id),
        qty,
      },
    };
  };

  static removeItem = (id) => {
    return {
      type: actiontype.REMOVEITEM,
      payload: {
        id: parseInt(id),
      },
    };
  };
}

export default CartAction;
