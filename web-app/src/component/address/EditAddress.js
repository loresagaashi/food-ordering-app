import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link,useNavigate,useParams } from "react-router-dom";

const EditAddress = () => { 

  let navigate = useNavigate();
  const{id}=useParams();

  const[address,setAddresses]=useState({
      streetName:"",
      city:"",
      postalCode:"",
      instructions:""
  });
  
  const{streetName,city,postalCode,instructions}=address;

  useEffect(() =>{
    loadAddresses();
}, []);  

const loadAddresses = async()=>{
    try {
        const result = await axios.get(`http://localhost:8080/addresses/address/${id}`);
        setAddresses(result.data);
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

  const handleInputChange = (e)=>{
      setAddresses({...address, [e.target.name] : e.target.value})
  };

  const updateAddress = async (e) => {
      e.preventDefault();
      await axios.put(`http://localhost:8080/addresses/updates/${id}`, address);
      navigate("/view-address");
  };

return (
  <div className="col-sm-8 py-2 px-5 offset-2 shadow">
    <h2 className="mt-5">Edit Address</h2>
  <form onSubmit={(e)=>updateAddress(e)}>
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
}

export default EditAddress