import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditCity = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [city, setCity] = useState({
    name: "",
    address: "",
  });

  const { name, address } = city;

  useEffect(() => {
    loadCity();
  }, []);

  const loadCity = async () => {
    const result = await axios.get(`http://localhost:8080/cities/city/${id}`);
    setCity(result.data);
  };

  const handleInputChange = (e) => {
    setCity({ ...city, [e.target.name]: e.target.value });
  };

  const updateCity = async (e) => {
    try {
      e.preventDefault();
      await axios.put(`http://localhost:8080/city/update/${id}`, city);
      navigate("/view-cities");
    } catch (error) {
      console.error("Error saving city:", error);
    }
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5 mb-3">Edit City</h2>
      <form onSubmit={(e) => updateCity(e)}>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="name">
            Name
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="name"
            id="name"
            required
            value={name}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="address">
            Address
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="address"
            id="address"
            required
            value={address}
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
              to={"/view-cities"}
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

export default EditCity;
