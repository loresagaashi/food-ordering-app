import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "../common/Search";
import { Link } from "react-router-dom";

const StoreHoursViews = () => {
  const [storeHourses, setStoreHours] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadStoreHours();
  }, []);

  const loadStoreHours = async () => {
    const result = await axios.get("http://localhost:8080/storeHours", {
      validateStatus: () => {
        return true;
      },
    });
    if (result.status === 302) {
      setStoreHours(result.data);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this store hour?",
    );
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/storeHours/delete/${id}`);
        loadStoreHours();
      } catch (error) {
        console.error("Error deleting store hour:", error);
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
            <th>Day of Week</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {storeHourses
            .filter(
              (sh) =>
                sh.dayOfWeek.toLowerCase().includes(search) ||
                sh.startTime.toLowerCase().includes(search) ||
                sh.endTime.toLowerCase().includes(search),
            )
            .map((storeHours, index) => (
              <tr key={storeHours.id}>
                <th scope="row">{storeHours.id}</th>
                <td>{storeHours.dayOfWeek}</td>
                <td>{storeHours.startTime}</td>
                <td>{storeHours.endTime}</td>
                <td className="mx-2">
                  <Link
                    to={`/storeHours-profile/${storeHours.id}`}
                    className="btn btn-info"
                  >
                    View
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={`/edit-storeHours/${storeHours.id}`}
                    className="btn btn-warning"
                  >
                    Update
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(storeHours.id)}
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

export default StoreHoursViews;
