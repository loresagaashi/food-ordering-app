import React from "react";

const FavoriteProductsPage = ({ match }) => {
  const { customerId } = match.params;

  return (
    <div>
      <h2>Favorite Products for Customer ID: {customerId}</h2>
      {/* Display favorite products */}
    </div>
  );
};

export default FavoriteProductsPage;
