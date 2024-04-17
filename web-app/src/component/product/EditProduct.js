import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {

  let navigate = useNavigate();

  const { id } = useParams();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    bonusPoints: "",
  });

  const{name, description, price, category, bonusPoints} = product;

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const result = await axios.get(
      `http://localhost:8080/products/product/${id}`
    );
    setProduct(result.data);
  };

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const updateProduct = async (e) => {
    try {
      e.preventDefault();
      await axios.put(`http://localhost:8080/products/update/${id}`, product);
      navigate("/view-products");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
       try {
          const response = await axios.get("http://localhost:8080/categories");
          console.log("Response:", response.data); 
          setCategories(response.data); 
       } catch (error) {
          console.error("Error fetching categories:", error.message);
       }
    };
    fetchCategories();
 }, []);

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5 mb-3">Edit Product</h2>
      <form onSubmit={(e) => updateProduct(e)}>
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
            onChange={(e) => handleInputChange(e)}
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
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
           <label className="input-group-text" htmlFor="category">
              Category
           </label>
           <select
              className="form-control col-sm-6"
              name="category"
              id="category"
              value={product.category.name}
              onChange={(e) => handleInputChange(e)}
           >
              <option value="">Select category</option>
              {categories.map((cat) => (
                 <option key={cat.id} value={cat.name}>
                    {cat.name}
                 </option>
              ))}
           </select>
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="bonusPoints">
            Bonus Points
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="bonusPoints"
            id="bonusPoints"
            required
            value={bonusPoints}
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
              to={"/view-products"}
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

export default EditProduct;
