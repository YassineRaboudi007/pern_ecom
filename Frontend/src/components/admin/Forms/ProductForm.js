import React, { useState } from "react";
//MUI imports
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
//Icons
import SendIcon from "@material-ui/icons/Send";
import ImageIcon from "@material-ui/icons/Image";
//Form hook
import useForm from "../../../Hooks/useForm";
import useError from "../../../Hooks/useError";
//Redux imports
import { useDispatch } from "react-redux";
import PopupAction from "../../../actions/popup";
import axios from "axios";

import ProductService from "../../../services/product.service";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  margin: {
    margin: theme.spacing(1),
  },

  input: {
    display: "none",
  },
}));

export default function ProductForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { prod, actionObject } = props;
  //Margin for text fields
  const inputMarginX = 10;
  const inputMarginY = 15;
  //Form hook
  const [error, setError] = useError(null);
  const [file, setFile] = useState(null);
  const [fields, setFields] = useForm({
    name: prod?.name,
    qty: prod?.qty,
    price: prod?.price,
    desc: prod?.description,
  });

  const validateForm = () => {
    const { name, qty, price, desc } = fields;
    let allFIeldsAreGood = true;
    if (!name) {
      setError("name", "Field is Empty");
      allFIeldsAreGood = false;
    }
    if (!qty) {
      setError("qty", "Field is Empty");
      allFIeldsAreGood = false;
    }
    if (!price) {
      setError("price", "Field is Empty");
      allFIeldsAreGood = false;
    }
    if (!desc) {
      setError("desc", "Field is Empty");
      allFIeldsAreGood = false;
    }
    if (isNaN(qty)) {
      setError("qty", "This is not a number");
      allFIeldsAreGood = false;
    }
    if (isNaN(price)) {
      setError("price", "This is not a number");
      allFIeldsAreGood = false;
    }
    return allFIeldsAreGood;
  };

  //Submit
  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) setError(null);
    const formData = new FormData();
    formData.append("name", fields.name);
    formData.append("qty", fields.qty);
    formData.append("price", fields.price);
    formData.append("description", fields.desc);
    formData.append("image", file);

    if (!prod) {
      ProductService.addProduct(formData)
        .then((res) => {
          dispatch(actionObject.addOne(res.data));
        })
        .catch((e) => console.error(e));
    } else {
      axios.patch();
    }

    dispatch(PopupAction.openPopUp("success", "ayy"));
    setTimeout(function () {
      dispatch(PopupAction.closePopUp());
    }, 3000);
  };

  const normalInputFields = [
    {
      label: "Item name",
      name: "name",
      type: "text",
      required: true,
    },
    {
      label: "Item price",
      name: "price",
      type: "text",
      required: true,
    },
    {
      label: "Item quantity",
      name: "qty",
      type: "number",
      required: true,
    },
  ];

  return (
    <>
      <form
        className={classes.root}
        noValidate
        onSubmit={onSubmit}
        encType="multipart/form-data"
      >
        <Container>
          {normalInputFields.map((item, key) => (
            <TextField
              key={key}
              label={item.label}
              variant="outlined"
              type={item.type}
              name={item.name}
              defaultValue={fields?.[item.name]}
              error={error?.[item.name] ? true : false}
              helperText={error?.[item.name]}
              onChange={(e) => setFields(e)}
              required={item.required}
              fullWidth
              style={{ margin: `${inputMarginX}px ${inputMarginY}px ` }}
            />
          ))}

          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={10}
            name="desc"
            defaultValue={fields?.desc}
            error={error?.desc ? true : false}
            helperText={error?.desc}
            onChange={(e) => setFields(e)}
            variant="outlined"
            fullWidth
            style={{ margin: `${inputMarginX}px ${inputMarginY}px ` }}
          />
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<ImageIcon />}
              style={{ margin: `${inputMarginX}px ${inputMarginY}px ` }}
            >
              Upload Image
            </Button>
          </label>
        </Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            component="button"
            startIcon={<SendIcon />}
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </>
  );
}
