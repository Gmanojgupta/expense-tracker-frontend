import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { registerUser } from '../store/authSlice';
import { RootState } from '../store/store';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
} from '@mui/material';
import { useAppDispatch } from '../store/hooks';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  if (user && token) {
    return <Navigate to={user.role === 'ADMIN' ? '/dashboard' : '/expenses'} />;
  }

  const validateFields = () => {
    const errors: { [key: string]: string } = {};

    if (!name) errors.name = 'Name is required';
    else if (/\d/.test(name)) errors.name = 'Name cannot contain numbers';

    if (!email) errors.email = 'Email is required';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) errors.password = 'Password is required';

    if (!confirm) errors.confirm = 'Please confirm your password';
    else if (password !== confirm) errors.confirm = 'Passwords do not match';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    setError(null);

    try {
       await dispatch(
        registerUser({ name, email, password, confirmPassword: confirm })
      ).unwrap();
      navigate('/expenses');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" mt={1} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!fieldErrors.name}
            helperText={fieldErrors.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!fieldErrors.password}
            helperText={fieldErrors.password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            error={!!fieldErrors.confirm}
            helperText={fieldErrors.confirm}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>
          <Box mt={2}>
            <Link href="/login" variant="body2">
              Already have an account? Login
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
