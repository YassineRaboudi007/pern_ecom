import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ProductList from "../components/client/ProductList";
import PopupMessage from "../components/PopupMessage";
import ClientFooter from "../components/client/ClientFooter";
import Navbar from "../components/client/Navbar";
import ProductDetialles from "../components/client/ProductDetialles";
import SignIn from "../components/client/Auth/Signin";
import SignUp from "../components/client/Auth/Signup";
import Cart from "../components/client/Cart";

export default function ClientRouter() {
  let { path, url } = useRouteMatch();
  return (
    <>
      <PopupMessage></PopupMessage>
      <Navbar />
      <Switch>
        <Route path={`${path}/cart`}>
          <Cart />
        </Route>
        <Route path="/product/:id">
          <ProductDetialles />
        </Route>
        <Route path={`/SignIn`}>
          <SignIn />
        </Route>
        <Route path="/SignUp">
          <SignUp />
        </Route>

        <Route path="*">
          <ProductList />
        </Route>
      </Switch>
      <ClientFooter />
    </>
  );
}
