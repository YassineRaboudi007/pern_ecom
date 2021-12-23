import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableEditColumn from "./TableEditColumn";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tableHead: {
    backgroundColor: theme.palette.secondary.light,
  },
}));
export default function TableContent(props) {
  const classes = useStyles();
  const { responsData, responseFieldNames, page, rowsPerPage, actionObject } =
    props;
  return (
    <>
      <TableHead className={classes.tableHead}>
        <TableRow>
          {responseFieldNames.map((item, key) => {
            return key ? (
              <TableCell key={key} align="right">
                {item.toUpperCase()}
              </TableCell>
            ) : (
              <TableCell key={key}>{item.toUpperCase()}</TableCell>
            );
          })}
          <TableCell align="right">Edit</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {responsData &&
          responseFieldNames &&
          responsData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, key) => {
              return (
                <TableRow key={item[responseFieldNames[0]]}>
                  {responseFieldNames.map((field, key) => {
                    return field === "picture" ? (
                      <TableCell align="right" key={key}>
                        <img
                          src={`http://localhost:5000/public/${item[field]}`}
                          height="70px"
                          width="100px"
                          alt="product"
                        />
                      </TableCell>
                    ) : (
                      <TableCell align="right" key={key}>
                        {item[field]}
                      </TableCell>
                    );
                  })}
                  <TableEditColumn item={item} actionObject={actionObject} />
                </TableRow>
              );
            })}
      </TableBody>
    </>
  );
}
