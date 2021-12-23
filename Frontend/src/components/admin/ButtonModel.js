import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ProductForm from "./Forms/ProductForm";
import IconButton from "@material-ui/core/IconButton";

export default function ButtonModel(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { button_text, buttonType, color, fillForm, item, actionObject } =
    props;

  return (
    <>
      {buttonType === "button" ? (
        <Button
          startIcon={props.children}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          {button_text}
        </Button>
      ) : (
        <IconButton
          aria-label="delete"
          onClick={() => {
            handleClickOpen();
          }}
          color={color}
        >
          {props.children}
        </IconButton>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Form</DialogTitle>
        <DialogContent>
          <ProductForm
            fillForm={fillForm}
            prod={item}
            actionObject={actionObject}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
