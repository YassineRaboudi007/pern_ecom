import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableContent from "./TableContent";
import { useSelector } from "react-redux";
import TablePagination from "@material-ui/core/TablePagination";
import SearchAndAddBar from "./SearchAndAddBar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

export default function MainTable({ actionObject }) {
  const classes = useStyles();
  const productState = useSelector((state) => state.product);
  var responseFieldNames = [];

  if (productState.length > 0) {
    responseFieldNames = Object.keys(productState[0]);
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  if (productState.length === 0) {
    return (
      <>
        <SearchAndAddBar actionObject={actionObject} showSearch={false} />
        <Alert severity="warning">No Items</Alert>
      </>
    );
  }

  return (
    <>
      <SearchAndAddBar actionObject={actionObject} showSearch={true} />
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableContent
            responsData={productState}
            responseFieldNames={responseFieldNames}
            page={page}
            rowsPerPage={rowsPerPage}
            actionObject={actionObject}
          />
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={productState.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  );
}
