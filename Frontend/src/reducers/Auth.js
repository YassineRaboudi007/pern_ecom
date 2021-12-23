import * as actiontype from "../constantes/auth.actions";

const initState = {
  isAuth: false,
  token: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actiontype.AUTH:
      return {
        isAuth: true,
        token: action.payload,
      };
    case actiontype.LOGOUT:
      return initState;
    default:
      return state;
  }
};

export default authReducer;
