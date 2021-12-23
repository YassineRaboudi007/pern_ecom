import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Badge } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxHeight: "10vh",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const cartState = useSelector((state) => state.cart);
  let { path, url } = useRouteMatch();
  console.log(url);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Store
            </Link>
          </Typography>
          <Link to="/cart" style={{ color: "inherit", textDecoration: "none" }}>
            <IconButton color="inherit">
              <Badge badgeContent={cartState.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
          <Link to="/SignIn" style={{ textDecoration: "none" }}>
            <Button style={{ color: "white" }}>Sign In</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
