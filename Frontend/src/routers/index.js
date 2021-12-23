import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminRouter from "./AdminRouter";
import ClientRouter from "./ClientRouter";
export default function Admin() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <AdminRouter />
        </Route>
        <Route path="/">
          <ClientRouter />
        </Route>
      </Switch>
    </Router>
  );
}
