import React, {useEffect, useState} from "react";
import axios from "axios";
import Search from "../common/Search";
import {Link} from "react-router-dom";

const ProductsView = () => {
    const [products, setProducts] = useState([]);
    
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const result = await axios.get("http://localhost:8080/products", {
            validateStatus: () => {
                return true;
            }
        });
        if(result.status === 302){
            setProducts(result.data);
        }
    };

    const handleDelete = async(id) => {
        await axios.delete(`http://localhost:8080/products/delete/${id}`);
        loadProducts();
    }

    return (
        <section>
          <Search search = {search}
          setSearch = {setSearch}/>
          <table className="table table-bordered table-hover shadow">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Bonus Points</th>
                <th colSpan="3">Actions</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {products.filter((pr) =>
              pr.name.toLowerCase().includes(search))
              .map((product,index) => (
                <tr key = {product.id}>
                  <th scope="row" key={index}>
                      {product.id}
                  </th>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.category.name}</td>
                  <td>{product.bonusPoints}</td>

                  <td className="mx-2">
                    <Link 
                      to = {`/product-profile/${product.id}`}
                      className="btn btn-info">
                      View
                    </Link>
                  </td>

                   <td className="mx-2">
                    <Link 
                      to = {`/edit-product/${product.id}`}
                      className="btn btn-warning">
                      Update
                    </Link>
                   </td>

                   <td className="mx-2">
                     <button className="btn btn-danger"
                     onClick={() => handleDelete(product.id)}>
                      Delete
                     </button>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
    );
};

export default ProductsView;