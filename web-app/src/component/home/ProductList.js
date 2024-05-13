import { Backdrop, Fade, makeStyles, Modal, Paper, Tab, Tabs, Button } from "@material-ui/core";
import { useQuery } from "react-query";
import { QueryKeys } from "../../service/QueryKeys";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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

function ProductPopup({ product, handleClose }) {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1); 

  const popupWidth = 700;
  const popupHeight = 450;

  const handleAddToCart = () => {
    console.log("Product added to cart:", product);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={true}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={true}>
        <div className={classes.modalContent} style={{ width: popupWidth, height: popupHeight }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', marginTop: '7px'}}>
              &#10006;
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <div style={{ flex: '1' }}>
              <img
                src={`../../../products/${product.imageUrl}`}
                alt={product.name}
                width={300}
                height={150}
                style={{ marginRight: '20px' }}
              />
            </div>
            <div style={{ flex: '2', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" id="transition-modal-title" style={{ marginBottom: '20px' , fontWeight: 'bold'}}>
                {product.name}
              </Typography>
              <Typography variant="body1" id="transition-modal-description" style={{ marginBottom: '20px' }}>
                {product.description}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: '10px', marginRight: 12, color: '#FFAC1C', fontWeight: 'bold' }}>
                Price: {product.price} $
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
                <Button variant="outlined" onClick={handleDecreaseQuantity} style={{ marginRight: 10, width: 30, height: 30 }}>
                  -
                </Button>
                <Typography variant="body1" style={{ marginRight: 10, fontWeight: 'bold' }}>
                  {quantity}
                </Typography>
                <Button variant="outlined" onClick={handleIncreaseQuantity} style={{ width: 30, height: 30, marginRight: 15 }}>
                  +
                </Button>
                <button onClick={() => handleAddToCart()} style={{ padding: '8px 16px', background: '#FFAC1C', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px'}}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

export default function ProductList({}) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { data: categories } = useQuery(QueryKeys.CATEGORIES);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const theme = useTheme();
  function handleChange(event, newValue) {
    setValue(newValue);
  }
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  return (
    <Paper className={classes.root}>
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
              {category?.products?.map((product) => {
                return (
                  <Grid
                    key={product?.id}
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
                        alt={"product"}
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
                          <Typography>{product?.name}</Typography>
                          <Typography style={{ fontWeight: "bold" }}>
                            {product?.price} $
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </TabPanel>
        ))}
      </div>
      {selectedProduct && (
        <ProductPopup
          product={selectedProduct}
          handleClose={handleClosePopup}
          classes={classes}
        />
      )}
    </Paper>
  );
}
