import React, { useState } from "react";
import { Button, Box, makeStyles, Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import ProductList from "../../component/home/ProductList";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import image1 from "../../images/home/1.png";
import image2 from "../../images/home/2.png";
import image3 from "../../images/home/3.png";
import image4 from "../../images/home/4.png";
import image5 from "../../images/home/5.png";
import ProductPopup from "../../component/home/ProductPopUp";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  buttonContainer: {
    marginTop: "20px",
    marginRight: "20px"
  },
  drawer: {
    width: "400px",
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const items = [
    {
      image: image2,
    },
    {
      image: image1,
    },
    {
      image: image4,
    },
    {
      image: image3,
    },
    {
      image: image5,
    },
  ];

  const handleAddToCart = (product) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);
  
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1; 
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product }]);
    }
  };

  const toggleCartDrawer = () => {
    setShowCart(!showCart);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        className={classes.buttonContainer}
        display="flex"
        justifyContent="flex-end"
        width="100%"
      >
        <Button
          color="primary"
          variant="contained"
          onClick={toggleCartDrawer}
        >
          <ShoppingCartIcon />
        </Button>
      </Box>
      <Box style={{ margin: "60px", borderRadius: "20px", width: "80%" }}>
        <Carousel>
          {items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>
      </Box>
      <ProductList onAddToCart={handleAddToCart} cartItems={cartItems} setCartItems={setCartItems} products={items}/>
      <Drawer
        anchor="right"
        open={showCart}
        onClose={toggleCartDrawer}
        classes={{ paper: classes.drawer }}
      >
        <List>
          {cartItems.map((item, index) => (
            <ListItem key={index}>
            <img src={item.image} alt={item.name} style={{ height: 50, width: 50, marginRight: 10 }} />
            <ListItemText primary={item.name} secondary={`Price: $${item.price} - Quantity: ${item.quantity}`} />
          </ListItem>
          ))}
        </List>
      </Drawer>
      {selectedProduct && (
        <ProductPopup
          product={selectedProduct}
          handleAddToCart={handleAddToCart} 
        />
      )}
    </Box>
  );
}

function Item(props) {
  return (
    <img
      src={props.item.image}
      alt={props.item.name}
      style={{ height: "60vh", width: "100%", borderRadius: "20px" }}
    />
  );
}
