import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";

import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router-dom";
import ProductService from "../../services/product.service";
import { Typography, Button, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import CartAction from "../../actions/cart";
import PopupAction from "../../actions/popup";
import LoadingSpinner from "../LoadingSpinner";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function ProductDetialles() {
  let { id } = useParams();
  const [queryRes, setQueryRes] = useState({});
  const { res, err } = queryRes;
  const [qty, SetQty] = useState(1);
  const dispatch = useDispatch();

  const matches = useMediaQuery("(max-width:500px)");
  console.log(matches);
  useEffect(() => {
    ProductService.getProdById(id).then((res) => setQueryRes(res));
  }, []);

  const AddToCart = () => {
    dispatch(CartAction.addOrUpdateItem(id, qty));
    dispatch(PopupAction.openPopUp("success", "Item Added to cart"));
  };

  if (!res) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ display: "flex" }}>
      <Container maxWidth="xl" style={{ marginTop: "40px" }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <img
              src={`http://localhost:5000/public/${res.picture}`}
              height="90%"
              width="90%"
            />
          </Grid>
          <Grid item xs={12} md={6} style={{ margin: "auto" }}>
            <Typography variant="h2" color="secondary">
              {res.name}
            </Typography>
            <Typography>{res.description}</Typography>
            <hr style={{ marginRight: "30%" }} />

            <Typography
              variant="h4"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              {parseInt(res.price).toFixed(2)}$
            </Typography>
            <div style={{ display: "flex", heihgt: "100%", marginTop: "30px" }}>
              <TextField
                id="standard-basic"
                style={{ width: "30px", heihgt: "100%" }}
                value={qty}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Button
                  style={{ width: "10px", height: "20px" }}
                  onClick={() => {
                    if (qty < res.qty) SetQty(qty + 1);
                  }}
                >
                  +
                </Button>
                <Button
                  style={{ width: "10px", height: "20px" }}
                  onClick={() => {
                    if (qty > 1) SetQty(qty - 1);
                  }}
                >
                  -
                </Button>
              </div>
            </div>
            <Typography color="primary" style={{ marginTop: "20px" }}>
              {res.qty} Items in stock
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginTop: "30px" }}
              onClick={AddToCart}
            >
              Add To Cart
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
