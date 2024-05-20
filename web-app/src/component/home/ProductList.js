import React, { useState } from "react";
import { makeStyles, Paper, Tab, Tabs, Snackbar, Grid, Typography } from "@material-ui/core";
import { useQuery } from "react-query";
import { QueryKeys } from "../../service/QueryKeys";
import MuiAlert from '@material-ui/lab/Alert';
import ProductPopUp from "./ProductPopUp";
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      container
      spacing={2}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ margin: 0, width: "100%" }}
      {...other}
    >
      {value === index && children}
    </Grid>
  );
}

export default function ProductList({ products, onAddToCart }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { data: categories } = useQuery(QueryKeys.CATEGORIES);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const theme = useTheme();

  const [showSuccess, setShowSuccess] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (itemToAdd) => {
    setSnackbarMessage(`Item ${itemToAdd.name} successfully added to cart!`);
    setShowSuccess(true);
    onAddToCart(itemToAdd); 
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSuccess(false);
  };

  return (
    <div className={classes.root}>
      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {categories?.map((category, index) => (
            <Tab key={index} label={category.name} />
          ))}
        </Tabs>
        <div>
          {categories?.map((category, index) => (
            <TabPanel key={index} value={value} index={index}>
              <Grid
                container
                spacing={2}
                style={{ marginTop: "80px", marginBottom: "40px" }}
              >
                {category?.products?.map((product) => (
                  <Grid
                    key={product.id}
                    item
                    xs={4}
                    style={{
                      marginBottom: "60px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    onClick={() => handleProductClick(product)}
                  >
                    
                    <div
                      style={{
                        textAlign: "center",
                        position: "relative",
                        width: "100%",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={`../../../products/${product.imageUrl}`}
                        alt={product.name}
                        width={"250px"}
                        height={"150px"}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "115%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        <div>
                          <Typography>{product.name}</Typography>
                          <Typography style={{ fontWeight: "bold" }}>
                            {product.price} $
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          ))}
        </div>
        {selectedProduct && (
          <ProductPopUp
            product={selectedProduct}
            handleClose={handleClosePopup}
            handleAddToCart={handleAddToCart}
            classes={classes}
          />
        )}
        <Snackbar
          open={showSuccess}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity="success"
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Paper>
    </div>
  );
  
}
