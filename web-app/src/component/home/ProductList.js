import { Backdrop, Fade, makeStyles, Modal, Paper, Tab, Tabs } from "@material-ui/core";
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

  const popupWidth = 700;
  const popupHeight = 700;

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
              <Typography variant="h4" id="transition-modal-title" style={{ marginBottom: '10px' }}>
                {product.name}
              </Typography>
              <Typography variant="body1" id="transition-modal-description" style={{ marginBottom: '10px' }}>
                {product.description}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: '10px' }}>
                Price: {product.price} €
              </Typography>
              {/* more product info */}
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
                            {product?.price} €
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
