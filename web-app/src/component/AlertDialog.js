import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import ErrorOutlineSharpIcon from '@material-ui/icons/ErrorOutlineSharp'; // Import the icon

const useStyles = makeStyles((theme) => ({
  alertIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  alertIcon: {
    color: 'red',
    fontSize: 90,
  },

  dialogActions: {
    justifyContent: 'space-evenly',
  },

  cancelButton: {
    '&:hover': {
      backgroundColor: '#B03A2E',
    },
    backgroundColor: '#E9967A', 
    color: 'white',
  },

  confirmButton: {
    '&:hover': {
      backgroundColor: '#388E3C',
    },
    backgroundColor: '#17B169', 
    color: 'white',
  },

}));

export default function AlertDialog({ open, onClose, onConfirmDelete }) {
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirmDelete(); 
    onClose();
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm" 
        fullWidth={false} 
        PaperProps={{ 
          style: {
            width: 400,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <div className={classes.alertIconContainer}>
            <ErrorOutlineSharpIcon className={classes.alertIcon} />
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center' }}>
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={handleClose} color="primary" variant="outlined" className={classes.cancelButton}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="outlined" className={classes.confirmButton} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
