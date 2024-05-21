import { useState } from 'react';

export default function useCart() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += product.quantity; 
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: product.quantity }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map(item => 
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map(item => 
      item.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
    );
    setCartItems(updatedCartItems);
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return {
    cartItems,
    handleAddToCart,
    handleRemoveFromCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    total
  };
}
