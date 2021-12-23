import * as actiontype from "../constantes/popup.actions";

const popUpReducer = (state = false, action) => {
  switch (action.type) {
    case actiontype.OPENPOPUP:
      return {
        isOpen: true,
        severity: action.payload.severity,
        msg: action.payload.msg,
      };
    case actiontype.CLOSEPOPUP:
      return {
        isOpen: false,
      };
    default:
      return state;
  }
};

export default popUpReducer;
