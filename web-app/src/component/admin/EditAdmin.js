import React, { useEffect } from 'react'
import { useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const EditAdmin = () => {

    let navigate = useNavigate();

    const{id} = useParams();
    const[admin, setAdmin] = useState({
        firstName : '',
        lastName : '',
        email : '',
        password : '',
        birthDate : '',
        phoneNumber : ''
    })

    const{firstName, lastName, email, password, birthDate, phoneNumber} = admin;

    useEffect(() => {
        loadAddress();
      }, []);
    
      const loadAddress = async () => {
        const result = await axios.get(`http://localhost:8080/admins/admin/${id}`,);
        setAdmin(result.data);
      };

    const handleInputChange = (e) => {
        setAdmin({...admin, [e.target.name] : e.target.value,});
    };

    const updateAdmin = async (e) => {
        try {
          e.preventDefault();
          await axios.put(`http://localhost:8080/admins/update/${id}`, admin);
          navigate("/view-admins");
        } catch (error) {
          console.error("Error saving admin:", error);
        }
      };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
        <h2 className="mt-5 mb-3">Edit Admin</h2>
      <form onSubmit={(e) => updateAdmin(e)}>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="firstName">
            First Name
          </label>
          <input 
            className="form-control col-sm-6" 
            type="text" 
            name="firstName" 
            id="firstName" 
            required 
            value={firstName}
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
          <label className="input-group-text" htmlFor="password">
            Password
          </label>
          <input 
            className="form-control col-sm-6" 
            type="text" 
            name="password" 
            id="password" 
            required 
            value={password}
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
}

export default EditAdmin
