import React from "react";

import CategoryIcon from "@material-ui/icons/Category";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import PersonIcon from "@material-ui/icons/Person";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import AppMenuItem from "./AppMenuItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import LocationCityIcon from '@material-ui/icons/LocationCity';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const appMenuItems = [
  {
    name: "Dashboard",
    Icon: DashboardIcon,
    link: "/admin/dashboard",
  },
  {
    name: "Categories",
    Icon: CategoryIcon,
    link: "/admin/categories",
  },
  {
    name: "Products",
    Icon: FastfoodIcon,
    link: "/admin/products",
  },
  {
    name: "Admins",
    Icon: SupervisorAccountIcon,
    link: "/admin/admins",
  },
  {
    name: "Customers",
    Icon: PersonIcon,
    link: "/admin/customers",
  },
  {
    name: "City",
    Icon: LocationCityIcon,
    link: "/admin/city",
  },
  {
    name: "Employee",
    Icon: PersonIcon,
    link: "/admin/employee",
  },
  

];

export default function AppMenu({}) {
  const theme = useTheme();
  const navigate = useNavigate();

  function handleLogOut() {
    navigate("/client/home", { replace: true });
  }

  return (
    <SimpleBar
      style={{
        height: `calc(100% - ${theme.toolbarHeight}px)`,
        overflowX: "hidden",
      }}
    >
      <List component="nav">
        {appMenuItems.map((item, index) => (
          <AppMenuItem {...item} key={index} />
        ))}
        <ListItem key={-1} onClick={handleLogOut} button>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText>Log out</ListItemText>
        </ListItem>
      </List>
    </SimpleBar>
  );
}
