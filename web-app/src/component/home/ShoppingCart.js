import React, { useState } from 'react';
import { makeStyles, Drawer, List, ListItem, ListItemText, Typography, IconButton, Snackbar, Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AlertDialog from '../AlertDialog';
import MuiAlert from '@material-ui/lab/Alert';
import OrderDetails from './OrderDetails';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '400px',
  },
  drawerHeader: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productInfo: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
  },
  quantityText: {
    margin: '0 10px',
    fontWeight: 'bold',
  },
  orderButton: {
    margin: '20px auto',
    width: '45%',
    height: '60px',
    float: 'right',
    fontSize: '20px',
    fontFamily: 'Georgia, serif',
    backgroundColor: '#FFAC1C',
    color: 'white',
    '&:hover': {
      backgroundColor: '#CD7F32',
    },
  },
  orderDetails: {
    textAlign: 'center', 
    fontFamily: "'Roboto Slab', serif",
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  },
}));

export default function ShoppingCart({
  cartItems,
  showCart,
  toggleCartDrawer,
  total,
  handleRemoveFromCart,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  user
}) {
  const classes = useStyles();
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [deletedProductName, setDeletedProductName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderLines, setOrderLines] = useState([]);
  const [showEmptyCartWarning, setShowEmptyCartWarning] = useState(false);

  const handleDelete = async (productId, productName) => {
    try {
      await handleRemoveFromCart(productId);
      setDeletedProductName(productName);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error during deletion:', error);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSuccess(false);
  };

  const handleOrder = () => {
    if (cartItems.length === 0) {
      setShowEmptyCartWarning(true);
      return;
    }
    const orderDetailsData = {
       total: total.toFixed(2),
       status: 'Pending',
       dateTime: new Date().toLocaleString(),
    };
    const orderLinesData = cartItems.map(item => ({
       product: { name: item.name },
       quantity: item.quantity,
       price: item.price,
       amount: (item.price * item.quantity).toFixed(2),
    }));
    setOrderDetails(orderDetailsData);
    setOrderLines(orderLinesData);
    setShowOrderDetails(true);
  };

  return (
    <>
    <Drawer
      anchor="right"
      open={showCart}
      onClose={toggleCartDrawer}
      classes={{ paper: classes.drawer }}
    >
      <Typography variant="h6" className={classes.drawerHeader}>
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          style={{ margin: '20px', fontStyle: 'italic' }}
        >
          No items in the cart
        </Typography>
      ) : (
        <List>
          {cartItems.map((item, index) => (
            <ListItem key={index} className={classes.listItem}>
              <div className={classes.productInfo}>
                <img
                  src={`/products/${item.imageUrl}`}
                  alt={item.name}
                  style={{ height: 50, width: 80, marginRight: 10 }}
                />
                <ListItemText
                  primary={<b>{item.name}</b>}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textPrimary">
                        {`Price (each): ${item.price.toFixed(2)}$`}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="textPrimary">
                        {`Total: ${(item.price * item.quantity).toFixed(2)}$`}
                      </Typography>
                    </>
                  }
                  style={{ display: 'inline' }}
                />
              </div>
              <div className={classes.quantityControls}>
                <IconButton
                  onClick={() => handleDecreaseQuantity(item.id)}
                  aria-label="decrease"
                >
                  <RemoveIcon />
                </IconButton>
                <Typography className={classes.quantityText}>
                  {item.quantity}
                </Typography>
                <IconButton
                  onClick={() => handleIncreaseQuantity(item.id)}
                  aria-label="increase"
                >
                  <AddIcon />
                </IconButton>
              </div>
              <IconButton
                onClick={() => handleDelete(item.id, item.name)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
      <Typography variant="h6" style={{ textAlign: 'center', backgroundColor: '#FFF5EE' }}>
        <b>Total:</b> {total.toFixed(2)}$
      </Typography>
      <Button variant="contained" color="primary" className={classes.orderButton} onClick={handleOrder}>
        <b>Order</b>
      </Button>
      <Snackbar 
        open={showSuccess} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="success"
        >
          {`${deletedProductName} successfully removed from cart!`}
        </MuiAlert>
      </Snackbar>
      <Snackbar
          open={showEmptyCartWarning}
          autoHideDuration={4000}
          onClose={() => setShowEmptyCartWarning(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setShowEmptyCartWarning(false)}
            severity="warning"
          >
            Your shopping cart is empty! Add items to place an order.
          </MuiAlert>
        </Snackbar>
      <AlertDialog
        open={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        onConfirmDelete={handleDelete}
      />
    </Drawer>

    <Dialog open={showOrderDetails} onClose={() => setShowOrderDetails(false)} maxWidth="md" fullWidth>
      <DialogTitle className={classes.orderDetails}>
          <b>Order Details</b>
      </DialogTitle>
      <DialogContent>
        <OrderDetails 
          total={total.toFixed(2)}$
          orderDetails={orderDetails}
          orderLines={orderLines}
          user={user}
        />
      </DialogContent>
    </Dialog>
  </>
  );
}
