import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../common/Search";

const AddressView = () => {
  const [addresses, setAddresses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const result = await axios.get("http://localhost:8080/addresses");
      if (result.status === 200) {
        setAddresses(result.data);
      }
    } catch (error) {
      console.error("Error loading addresses:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this address?");
    if(confirmed){
        try{
            await axios.delete(`http://localhost:8080/addresses/delete/${id}`);
            loadAddresses();
        }catch(error){
            console.error("Error deleting address:", error);
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
            <th>Street Name</th>
            <th>City</th>
            <th>Postal Code</th>
            <th>Instructions</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {addresses
            .filter((address) =>
              address.streetName.toLowerCase().includes(search)
            )
            .map((address, index) => (
              <tr key={index}>
                <td>{address.id}</td>
                <td>{address.streetName}</td>
                <td>{address.city}</td>
                <td>{address.postalCode}</td>
                <td>{address.instructions}</td>
                <td className="mx-2">
                  <Link
                    to={`/address-profile/${address.id}`}
                    className="btn btn-info"
                  >
                    View
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={`/edit-address/${address.id}`}
                    className="btn btn-warning"
                  >
                    Update
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(address.id)}
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

export default AddressView;
