import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const AddProduct = () => {

   let navigate = useNavigate();
   const[product, setProducts] = useState({
         name : '',
         description : '',
         price : '',
         category : '',
         bonusPoints : ''
   })

   const{name, description, price, category, bonusPoints} = product;

   const handleInputChange = (e) => {
      setProducts({...product, [e.target.name] : e.target.value});
   };

   const saveProduct = async (e) => {
      e.preventDefault();
      try{
         await axios.post("http://localhost:8080/products", product);
         navigate("/view-products");
      }catch (error) {
         console.error("Error saving product:", error);
       }
   };

   return (
      <div className="col-sm-8 py-2 px-5 offset-2 shadow">
         <h2 className="mb-4">Add Product</h2>
         <form onSubmit={(e) => saveProduct(e)}>
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
               <label className="input-group-text" htmlFor="description">
                  Description
               </label>
               <input 
                  className="form-control col-sm-6" 
                  type="text" 
                  name="description" 
                  id="description" 
                  required 
                  value={description}
                  onChange={(e) =>handleInputChange(e)}
               />
            </div>

            <div className="input-group mb-5">
               <label className="input-group-text" htmlFor="price">
                  Price
               </label>
               <input 
                  className="form-control col-sm-6" 
                  type="text" 
                  name="price" 
                  id="price" 
                  required 
                  value={price}
                  onChange={(e) =>handleInputChange(e)}
               />
            </div>

            <div className="input-group mb-5">
               <label className="input-group-text" htmlFor="category">
                  Category
               </label>
               <input 
                  className="form-control col-sm-6" 
                  type="text" 
                  name="category" 
                  id="category" 
                  required 
                  value={category}
                  onChange={(e) =>handleInputChange(e)}
               />
            </div>

            <div className="input-group mb-5">
               <label className="input-group-text" htmlFor="bonusPoints">
                  Bonus Points
               </label>
               <input 
                  className="form-control col-sm-6" 
                  type="number" 
                  name="bonusPoints" 
                  id="bonusPoints" 
                  required 
                  value={bonusPoints}
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
                        to={"/view-products"}
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
  
export default AddProduct;
