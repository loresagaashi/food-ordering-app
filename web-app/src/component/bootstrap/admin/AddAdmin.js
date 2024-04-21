import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddAdmin = () => {
  let navigate = useNavigate();
  const [admin, setAdmins] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: "",
    phoneNumber: "",
  });

  const { firstName, lastName, email, password, birthDate, phoneNumber } =
    admin;

  const handleInputChange = (e) => {
    setAdmins({ ...admin, [e.target.name]: e.target.value });
  };

  const saveAdmin = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:8080/admins", admin);
      navigate("/view-admins");
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
        <h2 className="mb-4">Add Admin</h2>
        <form onSubmit={(e) => saveAdmin(e)}>
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
              to={"/view-admins"}
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

export default AddAdmin;
