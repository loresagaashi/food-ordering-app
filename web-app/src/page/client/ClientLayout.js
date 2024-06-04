import {
  AppBar,
  Button,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink, useNavigate  } from "react-router-dom";
import HomePage from "./HomePage";
import useUser from "../../hooks/useUser";
import useCart from "../../component/home/useCart";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    background: theme.palette.primary.main,
    color: "BLACK",
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
    fontFamily: "monospace",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
    textDecoration: "none",
    margin: theme.spacing(1),
  },
  link: {
    color: theme.palette.secondary.main,
    margin: theme.spacing(1, 1.5),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      textDecoration: "none",
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  smallAvatar: {
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(5),
    height: theme.spacing(5),
    color: "white",
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function ClientLayout() {
  const classes = useStyles();
  const { user, setUser } = useUser();
  const {deleteItemsFromCart} = useCart();
  const navigate = useNavigate();


  function handleLogOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("lines");
    deleteItemsFromCart();
    setUser(null);
    navigate("/client/home");
  }

  return (
    <>
      <AppBar position={"static"} elevation={0} className={classes.appBar}>
        <Typography
          variant="h6"
          noWrap
          className={classes.toolbarTitle}
          component={RouterLink}
          to={"/client/home"}
        >
          McDonalds
        </Typography>
        <nav>
          <Link
            variant="button"
            to="/client/home"
            component={RouterLink}
            className={classes.link}
          >
            Home
          </Link>
        </nav>
        {user && (
          <nav>
            <Link
              variant="button"
              to="/client/profile"
              component={RouterLink}
              className={classes.link}
            >
              Profile
            </Link>
          </nav>
        )}
        {user ? (
          <Button
            color="primary"
            variant="contained"
            className={classes.link}
            component={RouterLink}
            onClick={() => handleLogOut()}
          >
            Log out
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            className={classes.link}
            component={RouterLink}
            to={"/client/sign-in"}
          >
            Sign In
          </Button>
        )}
      </AppBar>
      <HomePage />
    </>
  );
}