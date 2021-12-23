import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import ButtonModel from "../../admin/ButtonModel";
import { useDispatch } from "react-redux";
import axios from "axios";
import PopupAction from "../../../actions/popup";

export default function TableEditColumn(props) {
  const { item, actionObject } = props;
  const idFieldName = Object.keys(item)[0];
  const dispatch = useDispatch();

  const deleteItem = async () => {
    try {
      const res = await axios.delete("/product/delete", {
        data: { id: item[idFieldName] },
      });
      dispatch(PopupAction.openPopUp("success", "Item Deleted"));
      dispatch(actionObject.remove(item[idFieldName]));
    } catch (e) {
      return dispatch(PopupAction.openPopUp("error", "Operation Failed"));
    }
  };

  return (
    <>
      <TableCell align="right">
        <ButtonModel
          button_text={"Add Item"}
          color="primary"
          buttonType={"Icon"}
          fillForm={true}
          item={item}
        >
          <EditIcon />
        </ButtonModel>

        <IconButton
          aria-label="delete"
          onClick={() => {
            deleteItem();
          }}
          color="secondary"
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </>
  );
}
