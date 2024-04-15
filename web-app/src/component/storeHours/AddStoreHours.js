import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddStoreHours = () => {
  let navigate = useNavigate();
  const [storeHours, setStoreHours] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
  });

  const { dayOfWeek, startTime, endTime } = storeHours;

  const handleInputChange = (e) => {
    setStoreHours({ ...storeHours, [e.target.name]: e.target.value });
  };

  const saveStoreHours = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:8080/storeHours", storeHours);
      navigate("/view-storeHours");
    } catch (error) {
      console.error("Error saving store hour:", error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center
align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="col-sm-6 shadow p-5" style={{ marginTop: 0 }}>
        <h2 className="mb-4">Add Store Hours</h2>
        <form onSubmit={(e) => saveStoreHours(e)}>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="dayOfWeek">
              Day of Week
            </label>
            <input
              className="form-control"
              type="text"
              name="dayOfWeek"
              id="dayOfWeek"
              required
              value={dayOfWeek}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="startTime">
              Start Time
            </label>
            <input
              className="form-control"
              type="text"
              name="startTime"
              id="startTime"
              required
              value={startTime}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="endTime">
              End Time
            </label>
            <input
              className="form-control"
              type="text"
              name="endTime"
              id="endTime"
              required
              value={endTime}
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-outline-success me-2">
              Save
            </button>
            <Link
              to={"/view-storeHours"}
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

export default AddStoreHours;
