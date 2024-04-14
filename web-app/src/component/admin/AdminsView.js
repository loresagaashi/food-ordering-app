import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Search from "../common/Search";

const AdminsView = () => {
  const [admins, setAdmins] = useState([]);

  const[search,setSearch] = useState("");

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

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this admin?");
    if(confirmed){
        try{
            await axios.delete(`http://localhost:8080/admins/delete/${id}`);
            loadAdmins();
        }catch(error){
            console.error("Error deleting admin:", error);
        }
    }
  };

  return (
    <section>
      <Search search={search}
      setSearch={setSearch} />
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Birth Date</th>
            <th>Phone Number</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {admins.filter((ad) => 
          ad.firstName.toLowerCase().includes(search)
            )
          
          .map((admin, index) => (
            <tr key={admin.id}>
              <th scope="row" key={index}>
                {admin.id}
              </th>
              <td>{admin.firstName}</td>
              <td>{admin.lastName}</td>
              <td>{admin.email}</td>
              <td>{admin.password}</td>
              <td>{admin.birthDate}</td>
              <td>{admin.phoneNumber}</td>
              <td className="mx-2">
                <Link 
                to={`/admin-profile/${admin.id}`}
                className="btn btn-info">
                View
                </Link>
                </td>
              <td className="mx-2">
              <Link 
              to={`/edit-admin/${admin.id}`}
              className="btn btn-warning">
                Update
                </Link>
                </td>
              <td className="mx-2">
              <button 
              className="btn btn-danger"
              onClick={()=> handleDelete(admin.id)}>
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
