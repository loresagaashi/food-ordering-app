import { Backdrop, Button, Fade, Grid, Modal, Typography, makeStyles } from "@material-ui/core";
import { useState } from "react";
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
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
    padding: theme.spacing(2, 4, 3),
    borderRadius: '20px',
  },
  productName: {
    marginBottom: '25px' , 
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    fontFamily: "'Roboto Slab', serif",
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
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

function OfferPopUp({ offer, handleClose, handleAddToCart }) {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);

  const popupWidth = 700;
  const popupHeight = 500;

  const onAddToCart = () => {
    const itemToAdd = {
      id: offer.id,
      name: offer.name,
      price: offer.price,
      imageUrl: offer.imageUrl,
      bonusPoints: offer.bonusPoints,
      quantity: quantity,
    };

    console.log("Offer added to cart:", itemToAdd);
    handleAddToCart(itemToAdd);
    handleClose();
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
          <div style={{ display: 'flex', alignItems: 'center', height: '85%' }}>
            <div style={{ flex: '1' }}>
              <img
              src={`../../../products/${offer.imageUrl}`}
              alt={offer.name}
                width={300}
                height={150}
                style={{ marginRight: '20px' }}
              />
            </div>
            <div style={{ flex: '2', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" id="transition-modal-title" className={classes.productName}>
                {offer.name}
              </Typography>
              <Typography variant="body1" id="transition-modal-description" style={{ marginBottom: '20px' }}>
                {offer.description}
              </Typography>
              <Typography variant="body1" style={{ marginRight: 12, color: '#FFAC1C', fontWeight: 'bold' }}>
                Price: {offer.price} $
              </Typography>
              <Typography variant="body1" style={{ marginBottom: '5px', marginRight: 12, color: 'green' }}>
                Bonus points: {offer.bonusPoints}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                Products in this offer:
              </Typography>
              {offer.products.map((product, index) => (
                <div key={index}>
                  <Typography variant="body1" style={{ marginRight: 12 }}>
                    {product.name} - {product.price} $
                  </Typography>
                </div>
              ))}
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
                <Button onClick={() => onAddToCart()} style={{ padding: '4px 13px', background: '#FFAC1C', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontSize: '12px'}}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

export default OfferPopUp;