import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddCustomer = () => {
  let navigate = useNavigate();
  const [customer, setCustomers] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: "",
    phoneNumber: "",
  });

  const { firstName, lastName, email, password, birthDate, phoneNumber } =
    customer;

  const handleInputChange = (e) => {
    setCustomers({ ...customer, [e.target.name]: e.target.value });
  };

  const saveCustomer = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:8080/admins", customer);
      navigate("/view-customers");
    } catch (error) {
      console.error("Error saving admin:", error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="col-sm-6 shadow p-5" style={{ marginTop: 0 }}>
        <h2 className="mb-4">Add Customer</h2>
        <form onSubmit={(e) => saveCustomer(e)}>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="firstName">
              First Name
            </label>
            <input
              className="form-control"
              type="text"
              name="firstName"
              id="firstName"
              required
              value={firstName}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="form-control"
              type="text"
              name="lastName"
              id="lastName"
              required
              value={lastName}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="email">
              Email
            </label>
            <input
              className="form-control"
              type="text"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="password">
              Password
            </label>
            <input
              className="form-control"
              type="text"
              name="password"
              id="password"
              required
              value={password}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="birthDate">
              Birth Date
            </label>
            <input
              className="form-control"
              type="text"
              name="birthDate"
              id="birthDate"
              required
              value={birthDate}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              className="form-control"
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              required
              value={phoneNumber}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-outline-success me-2">
              Save
            </button>
            <Link
              to={"/view-customers"}
              type="submit"
              className="btn btn-outline-warning"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
