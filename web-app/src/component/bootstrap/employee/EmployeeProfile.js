import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmployeeProfile = () => {
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    firstName: "",
    jobPosition:"",
  });

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    const result = await axios.get(`http://localhost:8080/employers/employee/${id}`);
    setEmployee(result.data);
  };

  return (
    <section className="shadow" style={{ backgroundColor: "whitesmoke" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: 150 }}
                />
                <h5 className="my-3">
                  {`${employee.firstName}`}
                </h5>
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btn btn-outline-primary">
                    Call
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-warning ms-1"
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="card mb-4">
              <div className="card-body">
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">First Name</h5>
                  </div>

                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{employee.firstName}</p>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Last Name</h5>
                  </div>

                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{employee.lastName}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Job Position</h5>
                  </div>

                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{employee.jobPosition}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeProfile;
