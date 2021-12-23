import * as actiontype from "../constantes/auth.actions";

class AuthActions {
  static auth = (token) => {
    return {
      type: actiontype.AUTH,
      payload: token,
    };
  };

  static logout = () => {
    return {
      type: actiontype.LOGOUT,
    };
  };
}

export default AuthActions;
