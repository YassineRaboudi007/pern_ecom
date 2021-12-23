import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Dashboard from "../components/admin/Dashboard/Dashboard";
import FetchTableData from "../components/admin/Table";
import PopupMessage from "../components/PopupMessage";
import ProductActions from "../actions/product";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import MainBar from "../components/admin/Navigation";
import Copyright from "../components/admin/Copyright";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));
export default function AdminRouter() {
  const classes = useStyles();
  let { path } = useRouteMatch();

  return (
    <>
      <div className={classes.root}>
        <MainBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <PopupMessage></PopupMessage>
            <Switch>
              <Route exact path={`${path}/Dashboard`}>
                <Dashboard />
              </Route>
              <Route exact path={`${path}/Products`}>
                <FetchTableData actionObject={ProductActions} />
              </Route>
              <Route exact path={`${path}/Customers`}>
                <FetchTableData></FetchTableData>
              </Route>
              <Route exact path={`${path}/Orders`}>
                <FetchTableData></FetchTableData>
              </Route>
              <Route exact path="*">
                <Dashboard />
              </Route>
            </Switch>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </>
  );
}
