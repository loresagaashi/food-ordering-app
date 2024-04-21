import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LocalDateTime,
  LocalTime,
  DayOfWeek,
  DateTimeFormatter,
} from "js-joda";

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
  // useEffect(() => {
  //   const saveData = async () => {
  //     try {
  //       await axios.post("http://localhost:8080/storeHours", storeHours);
  //       navigate("/view-storeHours");
  //     } catch (error) {
  //       console.error("Error saving store hour:", error);
  //     }
  //   };

  //   if (dayOfWeek !== "" && startTime !== "" && endTime !== "") {
  //     saveData();
  //   }
  // }, [storeHours]);

  const saveStoreHours = async (e) => {
    e.preventDefault();
    try {
      const startTime = LocalTime.parse(storeHours.startTime);
      const endTime = LocalTime.parse(storeHours.endTime);

      const formattedStartTime = startTime.format(
        DateTimeFormatter.ofPattern("HH:mm"),
      );
      const formattedEndTime = endTime.format(
        DateTimeFormatter.ofPattern("HH:mm"),
      );

      await axios.post("http://localhost:8080/storeHours", {
        ...storeHours,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      });

      navigate("/view-storeHours");
    } catch (error) {
      console.error("Error saving store hour:", error);
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    const start = LocalDateTime.of(0, 1, 1, 0, 0);
    const end = LocalDateTime.of(0, 1, 1, 23, 59);
    let currentTime = start;
    while (currentTime.isBefore(end)) {
      options.push(currentTime);
      currentTime = currentTime.plusHours(1);
    }
    return options;
  };

  const formatTime = (time) => {
    return time.format(DateTimeFormatter.ofPattern("HH:mm"));
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
            <select
              className="form-control"
              name="dayOfWeek"
              id="dayOfWeek"
              required
              value={dayOfWeek}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="">Select day of week</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="startTime">
              Start Time
            </label>
            <select
              className="form-control"
              name="startTime"
              id="startTime"
              required
              value={startTime}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="">Select start time</option>
              {generateTimeOptions().map((time, index) => (
                <option key={index} value={time.toString()}>
                  {formatTime(time)}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="endTime">
              End Time
            </label>
            <select
              className="form-control"
              name="endTime"
              id="endTime"
              required
              value={endTime}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="">Select end time</option>
              {generateTimeOptions().map((time, index) => (
                <option key={index} value={time.toString()}>
                  {formatTime(time)}
                </option>
              ))}
            </select>
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
