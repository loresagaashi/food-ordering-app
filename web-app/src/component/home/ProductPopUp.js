import React, { useState } from "react";
import { makeStyles, Paper, Tab, Tabs, Grid, Typography, Modal, Backdrop, Fade } from "@material-ui/core";
import { useQuery } from "react-query";
import { QueryKeys } from "../../service/QueryKeys";

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
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={product.modal}
        open={true}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={true}>
          <div className={product.modalContent}>
            <Typography variant="h4" id="transition-modal-title">
              {product.name}
            </Typography>
            <Typography variant="body1" id="transition-modal-description">
              {product.description}
            </Typography>
            <Typography variant="body1">
              Price: {product.price} $
            </Typography>
            <Typography variant="body1">
              Bonus points: {product.bonusPoints}
            </Typography>
            {/* Add more product information here */}
          </div>
        </Fade>
      </Modal>
    );
  }