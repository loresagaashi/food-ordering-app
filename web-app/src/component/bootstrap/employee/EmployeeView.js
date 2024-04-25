import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../common/Search";

const EmployeeView= () => {
  const [employers, setEmployers] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadEmployers();
  }, []);

  const loadEmployers = async () => {
    const result = await axios.get("http://localhost:8080/employers", {
      validateStatus: () => {
        return true;
      },
    });
    if (result.status === 302) {
      setEmployers(result.data);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/employers/delete/${id}`);
        loadEmployers();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <section>
      <Search search={search} setSearch={setSearch} />
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Job Position</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {employers
            .filter((ad) => ad.firstName.toLowerCase().includes(search))

            .map((employee, index) => (
              <tr key={employee.id}>
                <th scope="row" key={index}>
                  {employee.id}
                </th>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.jobPosition}</td>
                <td className="mx-2">
                  <Link
                    to={`/employee-profile/${employee.id}`}
                    className="btn btn-info"
                  >
                    View
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={`/edit-employee/${employee.id}`}
                    className="btn btn-warning"
                  >
                    Update
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default EmployeeView;
