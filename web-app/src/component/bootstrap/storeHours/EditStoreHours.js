import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditStoreHours = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [storeHours, setStoreHours] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
  });

  const { dayOfWeek, startTime, endTime } = storeHours;

  useEffect(() => {
    loadStoreHours();
  }, []);

  const loadStoreHours = async () => {
    const result = await axios.get(
      `http://localhost:8080/storeHours/storeHour/${id}`,
    );
    setStoreHours(result.data);
  };

  const handleInputChange = (e) => {
    setStoreHours({ ...storeHours, [e.target.name]: e.target.value });
  };

  const updateStoreHours = async (e) => {
    try {
      e.preventDefault();
      await axios.put(
        `http://localhost:8080/storeHours/update/${id}`,
        storeHours,
      );
      navigate("/view-storeHours");
    } catch (error) {
      console.error("Error saving store hours:", error);
    }
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5 mb-3">Edit Store Hours</h2>
      <form onSubmit={(e) => updateStoreHours(e)}>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="dayOfWeek">
            Day of Week
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="dayOfWeek"
            id="dayOfWeek"
            required
            value={dayOfWeek}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="startTime">
            Start time
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="startTime"
            id="startTime"
            required
            value={startTime}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="endTime">
            End time
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="endTime"
            id="endTime"
            required
            value={endTime}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="row mb-5">
          <div className="col-sm-2">
            <button type="submit" className="btn btn-outline-success btn-lg">
              Save
            </button>
          </div>

          <div className="col-sm-2">
            <Link
              to={"/view-storeHours"}
              type="submit"
              className="btn btn-outline-warning btn-lg"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditStoreHours;
