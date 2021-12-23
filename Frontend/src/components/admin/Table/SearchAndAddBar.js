import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//Icons
import AddIcon from "@material-ui/icons/Add";
//Components
import ButtonModel from "../../admin/ButtonModel";

const useStyles = makeStyles((theme) => ({
  topofTable: {
    margin: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    padding: theme.spacing(2),
  },
}));

export default function SearchAndAddBar({ actionObject, showSearch }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.topofTable}>
        {showSearch && (
          <TextField
            id="outlined-helperText"
            label="Search Items"
            variant="outlined"
            style={{ width: "60%" }}
          />
        )}

        <ButtonModel
          button_text={"Add Item"}
          buttonType={"button"}
          actionObject={actionObject}
        >
          <AddIcon />
        </ButtonModel>
      </div>
    </>
  );
}
