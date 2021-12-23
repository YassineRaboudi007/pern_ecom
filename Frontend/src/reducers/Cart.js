import * as actiontype from "../constantes/cart.actions";

const initState = [];

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case actiontype.ADDORUPDATEITEM:
      return [
        ...state.filter((item) => item.id !== action.payload.id),
        action.payload,
      ];
    case actiontype.REMOVEITEM:
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
};

export default cartReducer;
