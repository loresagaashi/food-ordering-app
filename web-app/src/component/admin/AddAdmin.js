import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const AddAdmin = () => {


    let navigate = useNavigate();
    const[admin, setAdmins] = useState({
        firstName : '',
        lastName : '',
        email : '',
        birthDate : '',
        phoneNumber : ''
    })

    const{firstName, lastName, email, birthDate, phoneNumber} = admin;

    const handleInputChange = (e) => {
        setAdmins({...admin, [e.target.name] : e.target.value});
    };

    const saveAdmin = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:8080/admins", admin);
          navigate("/view-admins");
        } catch (error) {
          console.error("Error saving admin:", error);
        }
      };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
        
      <form onSubmit={(e) => saveAdmin(e)}>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="firstName">
            First Name
          </label>
          <input 
            className="form-control col-sm-6" 
            type="text" 
            name="firstName" 
            id="firstName" 
            required value={firstName}
            onChange={(e) =>handleInputChange(e)}
          />
          
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="lastName">
            Last Name
          </label>
          <input 
            className="form-control col-sm-6" 
            type="text" 
            name="lastName" 
            id="lastName" 
            required 
            value={lastName}
            onChange={(e) =>handleInputChange(e)}
          />
          
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="email">
            Email
          </label>
          <input 
            className="form-control col-sm-6" 
            type="text" 
            name="email" 
            id="email" 
            required 
            value={email}
            onChange={(e) =>handleInputChange(e)}
          />
          
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="birthDate">
            Birth Date
          </label>
          <input 
            className="form-control col-sm-6" 
            type="text" 
            name="birthDate" 
            id="birthDate" 
            required 
            value={birthDate}
            onChange={(e) =>handleInputChange(e)}
            />
          
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input 
            className="form-control col-sm-6" 
            type="text" 
            name="phoneNumber" 
            id="phoneNumber" 
            required 
            value={phoneNumber}
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
							to={"/view-admins"}
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

export default AddAdmin;
