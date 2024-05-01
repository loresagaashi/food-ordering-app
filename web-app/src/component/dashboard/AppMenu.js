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
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import WorkIcon from '@material-ui/icons/Work';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';

const appMenuItems = [
  {
    name: "Dashboard",
    Icon: DashboardIcon,
    link: "/admin/dashboard",
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
    name: "Employees",
    Icon: RecentActorsIcon,
    link: "/admin/employees",
  },
  {
    name: "Job Positions",
    Icon: WorkIcon,
    link: "/admin/job/positions",
  },
  {
    name: "Products",
    Icon: FastfoodIcon,
    link: "/admin/products",
  },
  {
    name: "Offers",
    Icon: RestaurantMenuIcon,
    link: "/admin/offers",
  },
  {
    name: "Categories",
    Icon: CategoryIcon,
    link: "/admin/categories",
  },
  {
    name: "Cities",
    Icon: LocationCityIcon,
    link: "/admin/city",
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
