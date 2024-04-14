import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import AdminsView from "./component/admin/AdminsView";
import Home from "./Home";
import NavBar from "./component/common/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddAdmin from "./component/admin/AddAdmin";
import EditAdmin from "./component/admin/EditAdmin";
import AdminProfile from "./component/admin/AdminProfile";

import AddCustomer from "./component/customer/AddCustomer";
import EditCustomer from "./component/customer/EditCustomer";
import CustomersView from "./component/customer/CustomersView";
import CustomerProfile from "./component/customer/CustomerProfile";

import AddProduct from "./component/product/AddProduct";
import ProductsView from "./component/product/ProductsView";
import EditProduct from "./component/product/EditProduct";
import ProductProfile from "./component/product/ProductProfile";

import AddressView from "./component/address/AddressView";
import AddAddress from "./component/address/AddAddress";
import EditAddress from "./component/address/EditAddress";
import AddressProfile from "./component/address/AddressProfile";

import StoreHoursViews from "./component/storeHours/StoreHoursViews";
import AddStoreHours from "./component/storeHours/AddStoreHours";
import EditStoreHours from "./component/storeHours/EditStoreHours";

import AddCategory from "./component/category/AddCategory";
import CategoriesView from "./component/category/CategoriesView";
import EditCategory from "./component/category/EditCategory";
import CategoryProfile from "./component/category/CategoryProfile";

function App() {
  return (
    <main className="App">
      
      <Router>
      <NavBar />
        <Routes>
          {/* Admin */}
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/view-admins" element={<AdminsView />}></Route>
          <Route exact path="/add-admins" element={<AddAdmin />}></Route>
          <Route exact path="/edit-admin/:id" element={<EditAdmin />}></Route>
          <Route exact path="/admin-profile/:id" element={<AdminProfile />}></Route>

          {/* Customer */}
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/view-customers" element={<CustomersView />}></Route>
          <Route exact path="/add-customers" element={<AddCustomer />}></Route>
          <Route exact path="/edit-customer/:id" element={<EditCustomer />}></Route>
          <Route exact path="/customer-profile/:id" element={<CustomerProfile />}></Route>
          
          {/* Product */}
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/view-products" element={<ProductsView />}></Route>
          <Route exact path="/add-products" element={<AddProduct />}></Route>
          <Route exact path="/edit-product/:id" element={<EditProduct />}></Route>
          <Route exact path="/product-profile/:id" element={<ProductProfile />}></Route>

          {/* Category */}
          <Route path="/view-categories" element={<CategoriesView />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/edit-category/:id" element={<EditCategory />} />
          <Route path="/category-profile/:id" element={<CategoryProfile />} />

          {/* Address */}
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/view-address" element={<AddressView />}></Route>
          <Route exact path="/add-address" element={<AddAddress />}></Route>
          <Route exact path="/edit-address/:id" element={<EditAddress />}></Route>
          <Route exact path="/address-profile/:id" element={<AddressProfile />}></Route>

          {/* Store Hours */}
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/view-storeHours" element={<StoreHoursViews />}></Route>
          <Route exact path="/add-storeHours" element={<AddStoreHours />}></Route>
          <Route exact path="/edit-storeHours/:id" element={<EditStoreHours />}></Route>
          {/* <Route exact path="/storeHours-profile/:id" element={<StoreHoursProfile />}></Route> */}
        </Routes>
      </Router>
    </main>
  );
}

export default App;
