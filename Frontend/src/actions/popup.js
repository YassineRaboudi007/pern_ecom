import * as actiontype from "../constantes/popup.actions";

class PopupAction {
  static openPopUp = (severity = null, msg = null) => {
    return {
      type: actiontype.OPENPOPUP,
      payload: {
        severity,
        msg,
      },
    };
  };

  static closePopUp = () => {
    return {
      type: actiontype.CLOSEPOPUP,
    };
  };
}

export default PopupAction;
