import { Navigate, Route } from "react-router-dom";
import AdminSignIn from "../page/admin/AdminSignIn";
import ClientSignIn from "../page/client/ClientSignIn";
import AdminLayout from "../page/admin/AdminLayout";
import ClientLayout from "../page/client/ClientLayout";

const AppRoutes = [
  // Client routes
  <Route
    key={1}
    path="/"
    exact
    element={<Navigate replace to={"/client/home"} />}
  />,
  <Route key={2} path="/client/home" element={<ClientLayout />} />,
  // Admin routes
  <Route key={11} path="/admin/*" element={<AdminLayout />} />,
  // // Other routes
  <Route key={11} path="/admin/sign-in" element={<AdminSignIn />} />,
  <Route key={11} path="/client/sign-in" element={<ClientSignIn />} />,
];

export default AppRoutes;
