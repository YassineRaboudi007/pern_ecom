import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import StoreIcon from "@material-ui/icons/Store";
import { Link } from "react-router-dom";

const primaryListItems = [
  {
    icon: <DashboardIcon />,
    text: "Dashboard",
  },
  {
    icon: <StoreIcon />,
    text: "Products",
  },
  {
    icon: <PeopleIcon />,
    text: "Customers",
  },
  {
    icon: <ShoppingCartIcon />,
    text: "Orders",
  },
];

export default function ListItems(props) {
  return (
    <div>
      {primaryListItems.map((item) => (
        <Link to={`/admin/${item.text}`}>
          <ListItem button>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        </Link>
      ))}
    </div>
  );
}
