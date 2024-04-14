import React from "react";
import { Link } from "react-router-dom";

const FavoriteProducts = ({ customerId, favoriteProducts }) => { // Accept customerId prop
  return (
    <div>
      <ul>
        {favoriteProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <Link to={`/favorite-products/${customerId}`}>View All Favorite Products</Link> 
    </div>
  );
};

export default FavoriteProducts;
