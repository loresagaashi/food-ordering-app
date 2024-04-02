import React, {useEffect, useState} from "react";
import axios from "axios";

const ProductsView = () => {
    const [products, setProducts] = useState([]);

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

    return (
        <section>
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
              {products.map((product,index) => (
                <tr key = {product.id}>
                  <th scope="row" key={index}>
                      {index+1}
                  </th>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.bonusPoints}</td>

                  <td className="mx-2">
                      <button className="btn btn-info">
                          View
                      </button>
                  </td>

                   <td className="mx-2">
                       <button className="btn btn-warning">
                           Update
                       </button>
                   </td>

                   <td className="mx-2">
                       <button className="btn btn-danger">
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