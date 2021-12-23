import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function ProductCard(props) {
  const { productInfo } = props;
  const classes = useStyles();
  const { prod_id: id, picture, name, price, description } = productInfo;

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={`http://localhost:5000/public/${picture}`}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography>{description}</Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            color="secondary"
          >
            {price}$
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" variant="contained">
            Buy Now
          </Button>
          <Link to={`/product/${id}`}>
            <Button
              size="small"
              color="primary"
              style={{ textDecoration: "none" }}
            >
              View
            </Button>
          </Link>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}
