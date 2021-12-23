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

export default function SignIn() {
  const [fields, setFields] = useForm({ email: "", password: "", phone: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    UserService.signin(fields);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "75vh",
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setFields(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setFields(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone"
            type="Phone"
            id="Phone"
            onChange={(e) => setFields(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
