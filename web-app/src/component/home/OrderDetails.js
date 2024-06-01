import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, Typography, List, ListItem, ListItemText, RadioGroup, Radio, FormControlLabel, TextareaAutosize, MenuItem, Select, InputLabel, FormControl, TextField, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios'; 
import { useMutation, useQuery } from "react-query";
import { QueryKeys } from "../../service/QueryKeys";
import useUser from '../../hooks/useUser';
import {useNavigate} from "react-router-dom";
import UserAccountDialog from './UserAccountDialog';
import { OrderDetailService } from '../../service/OrderDetailService';
const useStyles = makeStyles((theme) => ({
   container: {
     display: 'flex',
     justifyContent: 'space-between',
     padding: theme.spacing(2),
   },
   section: {
     width: '48%',
     padding: theme.spacing(2),
     border: `2px solid ${theme.palette.primary.main}`,
     borderRadius: '4px',
     backgroundColor: '#f9f9f9',
   },
   radioGroup: {
     display: 'flex',
     flexDirection: 'row',
   },
   formControlLabel: {
     marginRight: theme.spacing(15),
   },
   formControl: {
     width: '100%',
   },
   header: {
     display: 'flex',
     justifyContent: 'space-between',
     color: 'Black',
     marginBottom: theme.spacing(2),
   },
   input: {
     marginBottom: theme.spacing(2),
   },
   buttonContainer: {
     display: 'flex',
     justifyContent: 'center',
     marginTop: theme.spacing(2),
   },
   button: {
     backgroundColor: theme.palette.secondary.main,
     color: '#fff',
     '&:hover': {
       backgroundColor: theme.palette.secondary.dark,
     },
   },
   notes: {
     marginTop: theme.spacing(2),
     padding: theme.spacing(1),
     border: `1px solid ${theme.palette.secondary.main}`,
     borderRadius: '4px',
   },
   total: {
     textAlign: 'right',
     fontWeight: 'bold',
     color: theme.palette.secondary.main,
     marginTop: theme.spacing(2),
   },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const fetchCities = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/city/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
  }
};

const orderDetailService = new OrderDetailService();

export default function OrderDetails ({ orderDetails, orderLines,total }) {

  const initialOrderLines = JSON.parse(localStorage.getItem("lines")) || [];

  const classes = useStyles();
  const {user} = useUser();
<<<<<<< HEAD
  const dateTime = useRef();
  const [selectedCity, setSelectedCity] = useState('');
  const { data: cities } = useQuery(QueryKeys.CITY, fetchCities()); 
=======
  const [city, setCity] = useState('');
  const { data: cities } = useQuery(QueryKeys.CITY, fetchCities); 
>>>>>>> 3c9df06a939770afe13da9932a0d840101933d6e
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [ setOrderLines] = useState(initialOrderLines);
  const navigate = useNavigate();
  const {mutateAsync: createOrder, isLoading} = useMutation(orderDetails => orderDetailService.createOrder(orderDetails));

  useEffect(() => {
    localStorage.setItem("lines", JSON.stringify(orderLines));
    if (user) {
      setFirstName(user.user.firstName); 
      setEmail(user.user.email); 
      setPhoneNumber(user.user.phoneNumber);
      setCity(user.user.city.name);
    }
  }, [user]);  
  
  function handleFinish() {
    if(!user) {
      setOpen(true);
      return;
    }
    return saveOrder(user);
  }

  function saveOrder(customer) {
    const order = {
      status: "PENDING",
      dateTime: dateTime.current,
      total: total,
      lines: orderLines,
      customer: customer
    }
    return createOrder("Order: ", order)
    .then(saveOrder => {
      console.log("SavedOrdeR: ", saveOrder);
      localStorage.removeItem("orderLines");
      navigate('./client/home', saveOrder);
    });
  }
  const handleSubmit = () => {
<<<<<<< HEAD
    if (firstName && email && address && phoneNumber && selectedCity && paymentType) {
      const orderData = {
        firstName,
        email,
        address,
        phoneNumber,
        city: selectedCity,
        notes,
        paymentType,
        orderDetails,
        orderLines,
        total,
        user: {
          id: user.user.id,
          name: user.user.firstName,
          email: user.user.email,
        },
      };
  
  
=======
    if (firstName && email && address && phoneNumber && city && paymentType) {
>>>>>>> 3c9df06a939770afe13da9932a0d840101933d6e
      setMessage('Order submitted successfully!');
      setOpen(true);
      setError(false);
  
      setFirstName('');
      setEmail('');
      setAddress('');
      setPhoneNumber('');
      setCity('');
      setNotes('');
      setPaymentType(''); 
  

    } else {
      setMessage('Please fill in all the fields.');
      setOpen(true);
      setError(true);
    }
  };
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.section}>
         <div className={classes.header}>
            <Typography variant="h6">
               Customer Details
            </Typography>
            <div style={{ textAlign: 'right' }}>
               <Typography variant="body1">
                  {orderDetails.dateTime}
                  <br />
                  Status: {orderDetails.status}
               </Typography>
            </div>
         </div>

         <TextField
            label="Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            className={classes.input}
         />

         <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            className={classes.input}
         />

         <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            className={classes.input}
         />

         <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            className={classes.input}
         />

         <FormControl className={classes.formControl}>
           <InputLabel id="city-select-label">Select City</InputLabel>
           <Select
              labelId="city-select-label"
              id="city-select"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            >
              {cities && cities.map((city) => (
                <MenuItem key={city.id} value={city.name}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
         </FormControl>
         
         <TextareaAutosize
    aria-label="order-notes"
    minRows={3}
    placeholder="Enter notes here"
    style={{ marginTop: '10px' }}
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
  />
  <Typography variant="body2" color="textSecondary">
    Like: Add pickles for extra flavor!
  </Typography>
         
         <Typography variant="body1" style={{ marginTop: '16px' }}>
            Choose payment method
         </Typography>
         <RadioGroup
            aria-label="payment-type"
            name="payment-type"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className={classes.radioGroup}
         >
            <FormControlLabel value="CASH" control={<Radio />} label="Cash" className={classes.formControlLabel} />
            <FormControlLabel value="CARD" control={<Radio />} label="Card" className={classes.formControlLabel} />
         </RadioGroup>
         
         <div className={classes.buttonContainer}>
           <Button className={classes.button} onClick={handleSubmit} >
             Submit
           </Button>
         </div>
      </div>

      <div className={classes.section}>
         <Typography variant="h6">Order Lines</Typography>
         <List>
          {orderLines.map((line, index) => (
            <React.Fragment key={index}>
              <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItemText
                   primary={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{line.product.name}</span>
                        <span>{`${line.quantity} x ${line.price}$`}</span>
                      </div>
                   }
                   primaryTypographyProps={{ variant: 'body1' }}
                   secondary={`${line.amount}$`}
                   secondaryTypographyProps={{ variant: 'body1', align: 'right' }}
                />
              </ListItem>
              <hr />
            </React.Fragment>
          ))}
         </List>
         
         <Typography variant="body1" className={classes.total}>
            Total: {total}$
         </Typography>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error ? "error" : "success"}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

