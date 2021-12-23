import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import ProductService from "../../../services/product.service";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function ProductList() {
  const [data, setData] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    ProductService.getProducts().then((query) => setData(query.res.data));
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Products
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {!data &&
              cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <SkeletonCard />
                </Grid>
              ))}
            {data &&
              data.map((prod) => (
                <Grid item key={prod.prod_id} xs={12} sm={6} md={4}>
                  <ProductCard productInfo={prod} />
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
