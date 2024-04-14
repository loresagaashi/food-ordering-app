import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

const AddAddresses = () => {
    let navigate = useNavigate();
    const[address,setAddresses]=useState({
        streetName:"",
        city:"",
        postalCode:"",
        instructions:""
    });
    const{streetName,city,postalCode,instructions}=address;

    const handleInputChange = (e)=>{
        setAddresses({...address, [e.target.name] : e.target.value})
    };

    const saveAddress = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/addresses", address);
            navigate("/view-address");
        } catch (error) {
            if (!error.response) {
                // Network error occurred
                console.error('Network error:', error);
              } else {
                // The server responded with a status other than 200 range
                console.error('Error response:', error.response);
              }
        }
       
    };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
     <h2 className="mt-5">Add Address</h2>
    <form onSubmit={(e)=>saveAddress(e)}>
        <div className="input-group mb-5">
            <label className="input-group-text" htmlFor="streetName">Street Name</label>
            <input className="form-control col-sm-6" 
                type="text"
                name="streetName" 
                id="streetName" 
                required 
                value={streetName}
                onChange={(e) => handleInputChange(e)}/>
        </div>

        <div className="input-group mb-5">
            <label className="input-group-text" htmlFor="city">City</label>
            <input className="form-control col-sm-6" 
                type="text"
                name="city" 
                id="city" 
                required 
                value={city}
                onChange={(e) => handleInputChange(e)}/>
        </div>

        <div className="input-group mb-5">
            <label className="input-group-text" htmlFor="postalCode">Postal Code</label>
                <input className="form-control col-sm-6" 
                    type="text"
                    name="postalCode" 
                    id="postalCode" 
                    required 
                    value={postalCode}
                    onChange={(e) => handleInputChange(e)}/>
        </div>

        <div className="input-group mb-5">
            <label className="input-group-text" htmlFor="instructions">Instructions</label>
            <input className="form-control col-sm-6" 
                    type="text"
                    name="instructions" 
                    id="instructions" 
                    required 
                    value={instructions}
                    onChange={(e) => handleInputChange(e)}/>
        </div>

        <div className="d-flex justify-content-center">
            <button
                type="submit"
                className="btn btn-outline-success me-2">
                Save
            </button>
            <Link
                to={"/view-address"}
                type="submit"
                className="btn btn-outline-warning">
                Cancel
            </Link>
         </div>
        </form>
    </div>
  );
};

export default AddAddresses