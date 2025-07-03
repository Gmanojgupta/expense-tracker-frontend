// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { RootState } from "../store/store";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { useAppDispatch } from "../store/hooks";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (user && token) {
    // Redirect based on role
    return <Navigate to={user.role === "ADMIN" ? "/dashboard" : "/expenses"} />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       await dispatch(loginUser({ email, password })).unwrap();
      // On success, redirect:
      navigate(user.role === "ADMIN" ? "/dashboard" : "/expenses");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" mt={1} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Sign In
          </Button>
          <Box mt={2}>
            <Link href="/register" variant="body2">
              Don't have an account? Register
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
