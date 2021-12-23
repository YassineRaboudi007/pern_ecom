import * as actiontype from "../constantes/product.actions";

const initState = [];

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case actiontype.ADDALLPRODS:
      return [...action.payload];
    case actiontype.ADDONEPRODUCT:
      return [action.payload, ...state];
    case actiontype.EDITPRODUCT:
      return [
        ...state.filter((item) => item.prod_id !== action.payload.prod_id),
        action.payload,
      ];
    case actiontype.REMOVEPRODUCT:
      return state.filter((item) => item.prod_id !== action.payload);
    default:
      return state;
  }
};

export default productReducer;
