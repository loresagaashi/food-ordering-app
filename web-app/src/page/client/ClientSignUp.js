import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { KeyboardDatePicker, MuiPickersUtilsProvider  } from "@material-ui/pickers";
import { useMutation } from "react-query";
import { QueryKeys } from "../../service/QueryKeys";
import ValidTextField from "../../component/common/ValidTextField";
import useUser from "../../hooks/useUser";
import { red } from "@material-ui/core/colors";
import { CustomerService } from "../../service/CustomerService";
import { UserService } from "../../service/UserService";
import { SelectTableCell } from "../../component/TableCells";
import { CityService } from "../../service/CityService";
import { useEffect } from "react";
import DateFnsUtils from '@date-io/date-fns';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const customerService = new CustomerService();
const cityService = new CityService();

export default function ClientSignUp({ onSuccess, hideSignInLink, isLoading }) {
  // const [cityOptions, setCityOptions] = useState([]);
  // const [fetchError, setError] = useState(null);
  const classes = useStyles();
  let navigate = useNavigate();
  const { setUser } = useUser();

  //   useEffect(() => {
  //     const fetchCities = async () => {
  //         try {
  //             const cityService = new CityService();
  //             const cities = await cityService.getAll();
  //
  //             const cityOptions = cities.map(city => ({ value: city.id, label: city.name }));
  //             setCityOptions(cityOptions);
  //         } catch (error) {
  //             setError(error);
  //         }
  //     };

  //     fetchCities();
  // }, []);

  const [userAccount, setUserAccount] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: new Date(),
    phoneNumber: "",
  });

  // use this to insert data to database
  const {
    mutate: createUser,
    isLoading: signUpLoading,
    error,
  } = useMutation(
    QueryKeys.USER_BY_EMAIL(userAccount.email),
    (user) => customerService.create(user),
    {
      onSuccess: (data) => {
        setUser(data);
        !!onSuccess ? onSuccess(data) : navigate("/client/home");
      },
    },
  );

  function handleSubmit() {
    createUser(userAccount);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Grid container spacing={2} className={classes.form}>
          <Grid item xs={12} sm={6}>
            <ValidTextField
              autoComplete="fname"
              name="firstName"
              variant="standard"
              required
              fullWidth
              id="firstName"
              label="First Name"
              value={userAccount.firstName}
              onChange={(e) =>
                setUserAccount((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              autoFocus
              error={error?.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ValidTextField
              variant="standard"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={userAccount.lastName}
              onChange={(e) =>
                setUserAccount((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              autoComplete="lname"
              error={error?.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <ValidTextField
              variant="standard"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={userAccount.email}
              onChange={(e) =>
                setUserAccount((prev) => ({ ...prev, email: e.target.value }))
              }
              error={error?.email}
            />
          </Grid>
          <Grid item xs={12}>
            <ValidTextField
              variant="standard"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={userAccount.password}
              onChange={(e) =>
                setUserAccount((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              error={error?.password}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <KeyboardDatePicker
              autoOk
              required
              variant="inline"
              inputVariant="standard"
              label="Date of birth"
              format="MM/dd/yyyy"
              value={userAccount.birthDate}
              InputAdornmentProps={{ position: "start" }}
              onChange={(date) =>
                setUserAccount((prev) => ({ ...prev, birthDate: date }))
              }
              error={!!error?.birthDate}
              helperText={error?.birthDate?.message}
              maxDate={new Date(Date.now())}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ValidTextField
              variant="standard"
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              autoComplete="phoneNumber"
              value={userAccount.phoneNumber}
              onChange={(e) =>
                setUserAccount((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <SelectTableCell
              errorRef={error}
              menuItems={cityOptions}
              onChange={(selectedCity) =>
                setUserAccount((prev) => ({ ...prev, city: selectedCity }))
              }
              columnDef={{ title: "City" }} // Sigurohuni që props.columnDef të jetë një objekt i plotë
            />
          </Grid> */}
          {/*<Grid item xs={12}>*/}
          {/*    <FormControlLabel*/}
          {/*        control={<Checkbox value="allowExtraEmails" color="primary"/>}*/}
          {/*        label="I want to receive inspiration, marketing promotions and updates via email."*/}
          {/*    />*/}
          {/*</Grid>*/}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
          disabled={isLoading || signUpLoading}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          {!hideSignInLink && (
            <Grid item>
              <Link variant="body2" component={RouterLink} to="/client/sign-in">
                Already have an account? Sign in
              </Link>
            </Grid>
          )}
        </Grid>
      </div>
    </Container>
    </MuiPickersUtilsProvider>
  );
}
