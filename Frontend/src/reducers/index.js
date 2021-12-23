import { combineReducers } from "redux";
import popUpReducer from "./Popup";
import productReducer from "./Product";
import cartReducer from "./Cart";
import authReducer from "./Auth";
const allreducers = combineReducers({
  popup: popUpReducer,
  product: productReducer,
  cart: cartReducer,
  auth: authReducer,
});

export default allreducers;
