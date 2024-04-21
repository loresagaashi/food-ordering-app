import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
// import AdminsView from "./component/admin/AdminsView";
// import Home from "./Home";
// import { Routes, Route } from "react-router-dom";
// import AddAdmin from "./component/admin/AddAdmin";
// import EditAdmin from "./component/admin/EditAdmin";
// import AdminProfile from "./component/admin/AdminProfile";
//
// import AddCustomer from "./component/customer/AddCustomer";
// import EditCustomer from "./component/customer/EditCustomer";
// import CustomersView from "./component/customer/CustomersView";
// import CustomerProfile from "./component/customer/CustomerProfile";
//
// import AddProduct from "./component/product/AddProduct";
// import ProductsView from "./component/product/ProductsView";
// import EditProduct from "./component/product/EditProduct";
// import ProductProfile from "./component/product/ProductProfile";
//
// import AddressView from "./component/address/AddressView";
// import AddAddress from "./component/address/AddAddress";
// import EditAddress from "./component/address/EditAddress";
// import AddressProfile from "./component/address/AddressProfile";
//
// import StoreHoursViews from "./component/storeHours/StoreHoursViews";
// import AddStoreHours from "./component/storeHours/AddStoreHours";
// import EditStoreHours from "./component/storeHours/EditStoreHours";
//
// import AddCategory from "./component/category/AddCategory";
// import CategoriesView from "./component/category/CategoriesView";
// import EditCategory from "./component/category/EditCategory";
// import CategoryProfile from "./component/category/CategoryProfile";
// import StoreHoursProfile from "./component/storeHours/StoreHoursProfile";
//
// import CitiesView from "./component/city/CitiesView";
// import AddCity from "./component/city/AddCity";
// import EditCity from "./component/city/EditCity";
// import CityProfile from "./component/city/CityProfile";
import { useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { queryClient, setQueryDefaults } from "./service/QueryClient";
import { QueryClientProvider } from "react-query";
import UserContext from "./context/UserContext";
import AppRoutes from "./routes/Routes";
import { Routes } from "react-router-dom";

const customTheme = {
  overrides: {
    MuiTableRow: {
      head: {
        background:
          "linear-gradient(90deg, rgba(191,16,0,1) 0%, rgba(209,9,9,1) 28%, rgba(227,99,35,1) 58%, rgba(255,250,37,1) 100%)",
        color: "white",
      },
    },
    MuiTableSortLabel: {
      root: {
        color: "yellow",
        fontSize: "1.2em",
        "&:hover": {
          color: "#424242 !important",
        },
        "&.MuiTableSortLabel-active": {
          color: "#121212",
        },
        "& *": {
          color: "#2f2f2f !important",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#DB0007",
      mainGradient:
        "linear-gradient(90deg, rgba(191,16,0,1) 0%, rgba(209,9,9,1) 28%, rgba(227,99,35,1) 58%, rgba(255,250,37,1) 100%)",
    },
    secondary: {
      main: "#FFBC0D",
    },
    text: {
      dark: "#121212",
    },
    type: "light",
  },
  toolbarHeight: 50,
};

setQueryDefaults();

function App() {
  const [theme, setTheme] = useState(customTheme);
  const [user, setUser] = useState();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={createTheme(theme)}>
          <CssBaseline />
          <Routes>{AppRoutes}</Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}

export default App;
