import React, { useState } from "react";
import { Box, makeStyles, Button, Typography } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import ProductList from "../../component/home/ProductList";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import image1 from "../../images/home/1.png";
import image2 from "../../images/home/2.png";
import image3 from "../../images/home/3.png";
import image4 from "../../images/home/4.png";
import image5 from "../../images/home/5.png";
import ShoppingCart from "../../component/home/ShoppingCart";
import useCart from "../../component/home/useCart";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  buttonContainer: {
    marginTop: "20px",
    marginRight: "20px",
  },
  cartButton: {
    display: "flex",
    alignItems: "center",
  },
  totalPrice: {
    marginLeft: theme.spacing(1),
    color: theme.palette.common.white,
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const {
    cartItems,
    handleAddToCart,
    handleRemoveFromCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    total,
  } = useCart();
  const [showCart, setShowCart] = useState(false);

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

  const toggleCartDrawer = () => {
    setShowCart(!showCart);
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box className={classes.buttonContainer} display="flex" justifyContent="flex-end" width="100%">
        <Button color="primary" variant="contained" onClick={toggleCartDrawer} className={classes.cartButton}>
          <ShoppingCartIcon />
          <Typography variant="body1" className={classes.totalPrice}>
            {total.toFixed(2)}$
          </Typography>
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
      <ShoppingCart
        cartItems={cartItems}
        showCart={showCart}
        toggleCartDrawer={toggleCartDrawer}
        total={total}
        handleRemoveFromCart={handleRemoveFromCart} 
        handleIncreaseQuantity={handleIncreaseQuantity} 
        handleDecreaseQuantity={handleDecreaseQuantity}
      />
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
