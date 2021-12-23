import * as React from "react";
import {
  Button,
  CssBaseline,
  Box,
  IconButton,
  TextField,
  Typography,
  Container,
  Grid,
  Link,
} from "@material-ui/core";
import useForm from "../../../Hooks/useForm";
import UserService from "../../../services/user.service";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useError from "../../../Hooks/useError";
import { useDispatch } from "react-redux";
import AuthActions from "../../../actions/auth";
import PopupAction from "../../../actions/popup";

const normalInputFields = [
  {
    label: "Firstname",
    name: "firstname",
    type: "text",
    required: true,
  },
  {
    label: "Lastname",
    name: "lastname",
    type: "text",
    required: true,
  },
  {
    label: "Email",
    name: "email",
    type: "text",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "text",
    required: true,
  },
  {
    label: "Phone number",
    name: "phone",
    type: "text",
    required: true,
  },
];

export default function SignUp() {
  const [fields, setFields] = useForm({
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    phone: null,
  });
  const [error, setError] = useError(null);

  const dispatch = useDispatch();

  const validateForm = (field) => {
    let allFIeldsAreGood = true;

    const { firstname, lastname, email, password, phone } = fields;
    setError(null);
    if (!firstname) {
      setError("firstname", "Field is Empty");
      allFIeldsAreGood = false;
    }
    if (!lastname) {
      setError("lastname", "Field is Empty");
      allFIeldsAreGood = false;
    }
    if (!email) {
      setError("email", "Field is Empty");
      allFIeldsAreGood = false;
    }
    if (!password) {
      setError("password", "Field is Empty");
      allFIeldsAreGood = false;
    }

    if (phone && (phone.length !== 8 || isNaN(phone))) {
      setError("phone", "Phone number must be 8 numbers");
      allFIeldsAreGood = false;
    }
    return allFIeldsAreGood;
  };

  const handleChange = (e) => {
    setFields(e);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    UserService.signup(fields)
      .then((token) => {
        dispatch(PopupAction.openPopUp("success", "user Logged In"));
        dispatch(AuthActions.auth(token));
      })
      .catch((err) => {
        if (err.response.data.message.field == "email")
          setError("email", err.response.data.message.message);
      });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "75vh",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IconButton disabled>
          <LockOutlinedIcon color="secondary" />
        </IconButton>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {normalInputFields.map((item, key) => {
              const sm6 = key < 2;
              return (
                <Grid item xs={12} sm={sm6 ? 6 : 12}>
                  <TextField
                    key={key}
                    label={item.label}
                    type={item.type}
                    name={item.name}
                    defaultValue={fields?.[item.name]}
                    error={error?.[item.name] ? true : false}
                    helperText={error?.[item.name]}
                    onChange={(e) => handleChange(e)}
                    required={item.required}
                    fullWidth
                    style={{ margin: "10px 0px" }}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/SignIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
