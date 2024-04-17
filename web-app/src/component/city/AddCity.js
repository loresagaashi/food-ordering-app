import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const AddCity = () => {

   let navigate = useNavigate();

   const[city, setCities] = useState({
         name : '',
         address : ''
   });

   const{name, address} = city;

   const handleInputChange = (e) => {
      setCities({...city, [e.target.name] : e.target.value});
   };

   const saveCity = async (e) => {
      e.preventDefault();
      try{
         await axios.post("http://localhost:8080/cities", city);
         navigate("/view-cities");
      }catch (error) {
         console.error("Error saving city:", error);
      }
   };   

   return (
      <div className="col-sm-8 py-2 px-5 offset-2 shadow">
         <h2 className="mb-4">Add City</h2>
         <form onSubmit={(e) => saveCity(e)}>
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
                  onChange={(e) =>handleInputChange(e)}
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
                  onChange={(e) =>handleInputChange(e)}
               />
            </div>

            <div className="row mb-5">
                  <div className="col-sm-2">
                     <button
                        type="submit"
                        className="btn btn-outline-success btn-lg">
                        Save
                     </button>
                  </div>
   
                  <div className="col-sm-2">
                     <Link
                        to={"/view-cities"}
                        type="submit"
                        className="btn btn-outline-warning btn-lg">
                        Cancel
                     </Link>
                  </div>
            </div>
         </form>
      </div>
   );
};
  
export default AddCity;
