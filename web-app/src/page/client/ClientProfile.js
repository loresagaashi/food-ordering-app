import React, { useState } from 'react';
import {
  CircularProgress,
  Paper,
  Avatar,
  Typography,
  Grid,
  IconButton,
  TextField,
  Button,
  MenuItem,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import useUser from '../../hooks/useUser';
import useCities from '../../hooks/useCities';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import MuiAppBar from '../../component/MuiAppBar';

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    padding: theme.spacing(5),
  },
  card: {
    borderRadius: '1rem',
    width: '100%',
    maxWidth: '800px',
    padding: theme.spacing(3),
  },
  avatarSection: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: '1rem',
    borderBottomLeftRadius: '1rem',
    padding: theme.spacing(2),
  },
  userImage: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(2),
  },
  userDetails: {
    padding: theme.spacing(2),
  },
  userInfo: {
    marginBottom: theme.spacing(2),
  },
  editIconContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  editIcon: {
    marginLeft: theme.spacing(1),
  },
}));

const ClientProfile = () => {
  const classes = useStyles();
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const { cities, loading, error } = useCities();
  const [editedSuccessfully, setEditedSuccessfully] = useState(false);
  const [editFailed, setEditFailed] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const updatedUser = {
      ...user,
      user: {
        ...user.user,
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        phoneNumber: event.target.phoneNumber.value,
        city: { name: event.target.city.value },
        birthDate: event.target.birthDate.value,
      }
    };
    try {
      await setUser(updatedUser);
      setIsEditing(false);
      setEditedSuccessfully(true);
    } catch (error) {
      setEditFailed(true);
    }
  };

  if (!user) {
    return (
      <div className={classes.profileContainer}>
        <CircularProgress />
      </div>
    );
  }

  const handleSnackbarClose = () => {
    setEditedSuccessfully(false);
    setEditFailed(false);
  };

  const renderUserInfo = () => (
    <>
      <Grid container spacing={2} className={classes.userInfo}>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Email</Typography>
          <Typography variant="body2">{user.user.email}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Phone</Typography>
          <Typography variant="body2">{user.user.phoneNumber}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">City</Typography>
          <Typography variant="body2">{user.user.city.name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Birth Date</Typography>
          <Typography variant="body2">{user.user.birthDate}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Bonus Points</Typography>
          <Typography variant="body2">{user.user.bonusPoints}</Typography>
        </Grid>
        <Grid>
          <Button variant="outlined" color="secondary" style={{marginTop: '16px'}}>
            View my orders
          </Button>
        </Grid>
      </Grid>
    </>
  );

  const renderEditForm = () => (
    <form onSubmit={handleSave}>
      <TextField
        fullWidth
        name="firstName"
        label="First Name"
        defaultValue={user.user.firstName}
        variant="outlined"
        margin="dense"
      />
      <TextField
        fullWidth
        name="lastName"
        label="Last Name"
        defaultValue={user.user.lastName}
        variant="outlined"
        margin="dense"
      />
      <TextField
        fullWidth
        name="email"
        label="Email"
        defaultValue={user.user.email}
        variant="outlined"
        margin="dense"
      />
      <TextField
        fullWidth
        name="phoneNumber"
        label="Phone"
        defaultValue={user.user.phoneNumber}
        variant="outlined"
        margin="dense"
      />
      <TextField
        select
        fullWidth
        name="city"
        label="City"
        defaultValue={user.user.city.name}
        variant="outlined"
        margin="dense"
      >
        {cities.map((city) => (
          <MenuItem key={city.id} value={city.name}>
            {city.name}
          </MenuItem>
        ))}
      </TextField>
      <KeyboardDatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        format="MM/dd/yyyy"
        margin="dense"
        id="birthDate"
        label="Birth Date"
        value={user.user.birthDate}
        onChange={(date) => {
          const updatedUser = { ...user };
          updatedUser.user.birthDate = date;
          setUser(updatedUser);
        }}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
        <Button type="submit" variant="contained" color="primary" style={{ marginRight: '8px' }}>
          Save
        </Button>
        <Button type="button" variant="contained" onClick={handleEditClick}>
          Cancel
        </Button>
      </div>
    </form>
  );

  return (
    <>
      <MuiAppBar/>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <section className={classes.profileContainer}>
          <Paper elevation={3} className={classes.card}>
            <Grid container>
              <Grid item xs={12} md={4} className={classes.avatarSection}>
                <Avatar src="/user/user.jpg" alt="User" className={classes.userImage} />
                <Typography variant="h6">{user.user.firstName} {user.user.lastName}</Typography>
              </Grid>
              <Grid item xs={12} md={8} className={classes.userDetails}>
                <div className={classes.editIconContainer}>
                  <Typography variant="h5"><b>User Profile</b></Typography>
                  <IconButton className={classes.editIcon} onClick={handleEditClick}>
                  <EditIcon />
                  </IconButton>
                </div>
                <hr />
                {isEditing ? renderEditForm() : renderUserInfo()}
              </Grid>
            </Grid>
          </Paper>
          <Snackbar open={editedSuccessfully} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
              Data updated successfully!
            </MuiAlert>
          </Snackbar>
          <Snackbar open={editFailed} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
              Failed to update data. Please try again.
            </MuiAlert>
          </Snackbar>
        </section>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default ClientProfile;

