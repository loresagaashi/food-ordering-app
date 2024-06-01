import React from 'react';
import { CircularProgress } from '@material-ui/core';
import OrderList from './OrderList'; // Assume this component lists orders

function OrderTab({
  index,
  value,
  rangeRef,
  data,
  user,
  setUser,
  isLoading,
  onMoveClick,
  onEditClick,
  onDeleteClick,
  handleSearch,
  onSubmitOrder
}) {
  if (value !== index) {
    return null;
  }

  const handleOrderSubmit = (orderDetails) => {
    onSubmitOrder(orderDetails);
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <OrderList
          orders={data}
          onMoveClick={onMoveClick}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onOrderSubmit={handleOrderSubmit} // Pass the handleOrderSubmit function
        />
      )}
    </div>
  );
}

export default OrderTab;
