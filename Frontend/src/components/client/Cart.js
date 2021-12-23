import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ProductService from "../../services/product.service";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, Typography } from "@material-ui/core";
import CartAction from "../../actions/cart";
import { Link } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function Cart() {
  const [queryRes, setQueryRes] = useState({});
  const { res, err } = queryRes;
  const screenIsMd = useMediaQuery("(max-width:960px)");
  console.log(screenIsMd);
  const cartState = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const prodIds = cartState.map((item) => item.id);

  const getItemQtyInCartById = (id) => {
    return cartState.filter((cartItem) => id === cartItem.id)[0].qty;
  };
  const getItemPriceById = (id) => {
    if (res) {
      return res.filter((item) => id === item.prod_id)[0].price;
    }
  };

  const calPrice = () => {
    let sum = 0;
    for (let i = 0; i < cartState.length; i++)
      sum =
        sum +
        getItemQtyInCartById(cartState[i].id) *
          parseInt(getItemPriceById(cartState[i].id));
    return sum;
  };

  const addItemQty = (id, qty) => {
    const itemInCartQty = getItemQtyInCartById(id);
    if (itemInCartQty < qty) {
      dispatch(CartAction.addOrUpdateItem(id, itemInCartQty + 1));
    }
  };

  const decreaseItemQty = (id) => {
    const itemInCartQty = getItemQtyInCartById(id);
    if (itemInCartQty > 1) {
      dispatch(CartAction.addOrUpdateItem(id, itemInCartQty - 1));
    }
  };

  useEffect(() => {
    ProductService.getListOfProductsByIds(prodIds).then((res) =>
      setQueryRes(res)
    );
  }, []);

  return (
    <>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        style={{ marginTop: "20px" }}
      >
        <Grid item xs={12} md={8}>
          <Paper>
            {res &&
              res.map((item, index) => (
                <>
                  <hr style={{ margin: "5px" }} />
                  <Grid
                    container
                    style={{
                      display: "flex",
                      alignItems: screenIsMd ? "center" : "inherit",
                    }}
                  >
                    <Grid item xs={12} md={3}>
                      <img
                        src={`http://localhost:5000/public/${item.picture}`}
                        height="150px"
                        width="200px"
                        style={{ padding: "10px" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <div style={{ padding: "10px" }}>
                        <Typography variant="h5">{item.name}</Typography>
                        <div
                          style={{
                            display: "flex",
                            heihgt: "100%",
                            marginTop: "30px",
                          }}
                        >
                          <TextField
                            id="standard-basic"
                            style={{ width: "30px", heihgt: "100%" }}
                            value={getItemQtyInCartById(item.prod_id)}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Button
                              style={{ width: "10px", height: "20px" }}
                              onClick={() => addItemQty(item.prod_id, item.qty)}
                            >
                              +
                            </Button>
                            <Button
                              style={{ width: "10px", height: "20px" }}
                              onClick={() => decreaseItemQty(item.prod_id)}
                            >
                              -
                            </Button>
                          </div>
                        </div>
                        <Typography
                          variant="h6"
                          color="primary"
                          style={{ marginTop: "20px" }}
                        >
                          {(
                            getItemQtyInCartById(item.prod_id) *
                            parseInt(item.price)
                          ).toFixed(2)}
                          $
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </>
              ))}
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          style={{
            display: "flex",
            height: "20vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            style={{
              height: "100%",
              padding: "15px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>Total Price : {calPrice()}$</p>
            <p>Tax:10%</p>
            <Link to="/payment" style={{ textDecoration: "none" }}>
              <Button color="secondary" variant="outlined">
                Procced To payment
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
