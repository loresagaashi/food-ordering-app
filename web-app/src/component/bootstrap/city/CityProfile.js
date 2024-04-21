import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CityProfile = () => {
  const { id } = useParams();

  const [city, setCity] = useState({
    name: "",
    address: "",
  });

  useEffect(() => {
    loadCity();
  }, []);

  const loadCity = async () => {
    const result = await axios.get(`http://localhost:8080/cities/city/${id}`);
    setCity(result.data);
  };

  return (
    <section className="shadow" style={{ backgroundColor: "whitesmoke" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-12">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">City Details</h5>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Name</h5>
                  </div>

                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{city.name}</p>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Address</h5>
                  </div>

                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{city.address}</p>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityProfile;
