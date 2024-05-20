import React, { useState } from "react";
import { Box, makeStyles, Drawer, List, ListItem, ListItemText, Typography, Button } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import ProductList from "../../component/home/ProductList";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import image1 from "../../images/home/1.png";
import image2 from "../../images/home/2.png";
import image3 from "../../images/home/3.png";
import image4 from "../../images/home/4.png";
import image5 from "../../images/home/5.png";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  buttonContainer: {
    marginTop: "20px",
    marginRight: "20px",
  },
  drawer: {
    width: "400px",
  },
  drawerHeader: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
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
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const toggleCartDrawer = () => {
    setShowCart(!showCart);
  };
  
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box className={classes.buttonContainer} display="flex" justifyContent="flex-end" width="100%">
        <Button color="primary" variant="contained" onClick={toggleCartDrawer}>
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
      <ProductList onAddToCart={handleAddToCart} products={items} />
      <Drawer anchor="right" open={showCart} onClose={toggleCartDrawer} classes={{ paper: classes.drawer }}>
        <Typography variant="h6" className={classes.drawerHeader}>
          Shopping Cart
        </Typography>
        <List>
          {cartItems.map((item, index) => (
            <ListItem key={index}>
              <img src ={`/products/${item.imageUrl}`}
              alt={item.name} style={{ height: 50, width: 50, marginRight: 10 }} />
              <ListItemText primary={item.name} secondary={`Price: $${(item.price * item.quantity).toFixed(2)} - Quantity: ${item.quantity}`} />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" style={{ textAlign: 'right', backgroundColor: '#FAD5A5' }}>
          Total: ${total.toFixed(2)}
        </Typography>
      </Drawer>
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
