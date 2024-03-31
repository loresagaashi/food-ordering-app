import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminsView = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    const result = await axios.get("http://localhost:8080/admins", {
      validateStatus: () => {
        return true;
      }
    }
    );
    if (result.status === 302) {
      setAdmins(result.data);
    }
  };

  return (
    <section>
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Birth Date</th>
            <th>Phone Number</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {admins.map((admin, index) => (
            <tr key={admin.id}>
              <th scope="row" key={index}>
                {index + 1}
              </th>
              <td>{admin.firstName}</td>
              <td>{admin.lastName}</td>
              <td>{admin.email}</td>
              <td>{admin.birthDate}</td>
              <td>{admin.phoneNumber}</td>
              <td className="mx-2">
                <button className="btn btn-info">
                View
                </button>
                </td>
              <td className="mx-2">
              <button className="btn btn-warning">
                Update
                </button>
                </td>
              <td className="mx-2">
              <button className="btn btn-danger">
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

export default AdminsView;
