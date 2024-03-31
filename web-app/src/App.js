import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import AdminsView from "./component/admin/AdminsView";
import Home from "./Home";
import NavBar from "./component/common/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddAdmin from "./component/admin/AddAdmin";

function App() {
  return (
    <main className="App">
      
      <Router>
      <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/view-admins" element={<AdminsView />}></Route>
          <Route exact path="/add-admins" element={<AddAdmin />}></Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
