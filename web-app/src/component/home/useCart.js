import { useState, useEffect } from 'react';

export default function useCart() {
  const [cartItems, setCartItems] = useState(() => {
    // Retrieve the initial state from local storage if it exists
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    // Save the cart items to local storage whenever they change
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

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

  const deleteItemsFromCart = () => {
    setCartItems([])
  }

  return {
    cartItems,
    handleAddToCart,
    handleRemoveFromCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    deleteItemsFromCart,
    total
  };
}