import React from "react";
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fdfdff",
  },
  pageHeader: {
    padding: theme.spacing(1),
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  pageIcon: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    color: "#3c44b1",
  },
  pageTitle: {
    paddingLeft: theme.spacing(2),
  },
}));

export default function AdminPageHeader(props) {
  const { title, icon } = props;
  const classes = useStyles();
  return (
    <div>
      <Paper square className={classes.root}>
        <div className={classes.pageHeader}>
          <div className={classes.pageIcon}>{icon}</div>
          <div className={classes.pageTitle}>
            <h3>{title}</h3>
          </div>
        </div>
      </Paper>
    </div>
  );
}
