import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AddressProfile = () => {
  const { id } = useParams();
  const [address, setAddress] = useState({
    streetName: "",
    city: "",
    postalCode: "",
    instructions: "",
  });

  useEffect(() => {
    loadAddress();
  }, []);

  const loadAddress = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/addresses/address/${id}`,
      );
      setAddress(result.data);
    } catch (error) {
      console.error("Error loading address:", error);
    }
  };

  return (
    <section className="shadow" style={{ backgroundColor: "whitesmoke" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-12">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Address Details</h5>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Street Name</h5>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{address.streetName}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">City</h5>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{address.city}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Postal Code</h5>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{address.postalCode}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Instructions</h5>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{address.instructions}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddressProfile;
