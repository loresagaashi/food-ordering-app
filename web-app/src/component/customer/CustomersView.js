import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../common/Search";
import FavoriteProducts from "./FavoriteProducts";

const CustomersView = () => {
  const [customers, setCustomers] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const result = await axios.get("http://localhost:8080/customers", {
      validateStatus: () => {
        return true;
      },
    });
    if (result.status === 302) {
      setCustomers(result.data);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/customers/delete/${id}`);
    loadCustomers();
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
            <th>Email</th>
            <th>Password</th>
            <th>Birth Date</th>
            <th>Phone Number</th>
            <th>Favorite Products</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {customers
            .filter((c) => c.firstName.toLowerCase().includes(search))

            .map((customer, index) => (
              <tr key={customer.id}>
                <th scope="row" key={index}>
                  {customer.id}
                </th>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.email}</td>
                <td>{customer.password}</td>
                <td>{customer.birthDate}</td>
                <td>{customer.phoneNumber}</td>
                <td className="mx-2">
                  <Link
                    to={`/favorite-products/${customer.id}`}
                    className="btn btn-success"
                  >
                    View Favorites
                  </Link>
                </td>

                <td className="mx-2">
                  <Link
                    to={`/customer-profile/${customer.id}`}
                    className="btn btn-info"
                  >
                    View
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={`/edit-customer/${customer.id}`}
                    className="btn btn-warning"
                  >
                    Update
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(customer.id)}
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

export default CustomersView;
