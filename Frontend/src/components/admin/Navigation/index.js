import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export default function MainBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {/*App Bar on top */}
      <CssBaseline />
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      {/*Side Bar drawer*/}
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
    </div>
  );
}
