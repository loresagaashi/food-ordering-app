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
import AddProduct from "./component/product/AddProduct";
import ProductsView from "./component/product/ProductsView";
import AddCustomer from "./component/customer/AddCustomer";
import EditCustomer from "./component/customer/EditCustomer";
import CustomersView from "./component/customer/CustomersView";
import CustomerProfile from "./component/customer/CustomerProfile";

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
        </Routes>
      </Router>
    </main>
  );
}

export default App;
