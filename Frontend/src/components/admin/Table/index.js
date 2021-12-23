import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import useFetch from "../../../Hooks/useFetch";
import { useDispatch } from "react-redux";
import MainTable from "./MainTable";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
}));

export default function FetchTableData({ actionObject }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [res, err] = useFetch("/products");
  console.log("res", res);

  if (res.isLoaded) {
    dispatch(actionObject.addAll(res.data));
  }

  return (
    <div>
      {res.isLoaded && (
        <Paper className={classes.container}>
          <MainTable actionObject={actionObject} />
        </Paper>
      )}
    </div>
  );
}
