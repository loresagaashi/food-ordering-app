import React, { useEffect, useState } from 'react';
import { makeStyles, Typography, List, ListItem, ListItemText, RadioGroup, Radio, FormControlLabel, TextareaAutosize, MenuItem, Select, InputLabel, FormControl, TextField, Button } from '@material-ui/core';
import axios from 'axios'; 
import { useQuery } from "react-query";
import { QueryKeys } from "../../service/QueryKeys";

const useStyles = makeStyles((theme) => ({
   container: {
     display: 'flex',
     justifyContent: 'space-between',
     padding: theme.spacing(2),
   },
   section: {
     width: '48%',
     padding: theme.spacing(2),
     border: '1px solid #ccc',
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
}));

const OrderDetails = ({ orderDetails, orderLines, total }) => {
  const classes = useStyles();
  const [cities, setCities] = useState([]); 
  const [selectedCity, setSelectedCity] = useState('');
  const { data: cityData } = useQuery(QueryKeys.CITY); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddres] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const fetchCities = async () => {
    try {
      const response = await axios.get('/city'); 
      setCities(response.data); 
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.section}>
         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
         />

         <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
         />

         <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
         />

         <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddres(e.target.value)}
            fullWidth
         />

         <FormControl className={classes.formControl}>
           <InputLabel id="city-select-label">Select City</InputLabel>
            <Select
               labelId="city-select-label"
               id="city-select"
               value={selectedCity}
               onChange={(event) => setSelectedCity(event.target.value)}
               >
               {cityData && cityData.map((city, index) => ( 
                  <MenuItem key={index} value={city.id}>
                     {city.name}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
         <TextareaAutosize
            aria-label="order-notes"
            minRows={3}
            placeholder="Enter notes here"
            value={orderDetails.notes}
            style={{ marginTop: '15px' }} 
         />
         <RadioGroup aria-label="payment-type" name="payment-type" value={orderDetails.paymentType} className={classes.radioGroup}>
            <FormControlLabel value="CASH" control={<Radio />} label="Cash" className={classes.formControlLabel} />
            <FormControlLabel value="CARD" control={<Radio />} label="Card" className={classes.formControlLabel} />
         </RadioGroup>
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
         
         <Typography variant="body1" style={{textAlign: 'right', fontWeight: 'bold'}}>
            Total: {total}$
         </Typography>
      </div>
   </div>
  );
};

export default OrderDetails;
