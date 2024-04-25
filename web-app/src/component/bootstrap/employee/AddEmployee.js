import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddEmployee = () => {
  let navigate = useNavigate();
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    jobPosition:""
  });

  const { firstName,lastName, jobPosition } =
    employee;

  const handleInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const saveEmployee = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:8080/employers", employee);
      navigate("/view-employers");
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="col-sm-6 shadow p-5" style={{ marginTop: 0 }}>
        <h2 className="mb-4">Add Employee</h2>
        <form onSubmit={(e) => saveEmployee(e)}>
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
            <label className="input-group-text" htmlFor="jobPosition">
              Job Position
            </label>
            <input
              className="form-control"
              type="text"
              name="jobPosition"
              id="jobPosition"
              required
              value={jobPosition}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-outline-success me-2">
              Save
            </button>
            <Link
              to={"/view-employers"}
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

export default AddEmployee;
