import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { useLoginMutation } from '../../store/services/authSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store/slices/Auth';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getIsRemember } from '../../store/selectors/getUserAuthData/getUserAuthData';

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const isRemember = useAppSelector(getIsRemember);
  const [userLogin, setUserLogin] = useState('');
  const [userPwd, setUserPwd] = useState('');

  console.log(`isRemember`, isRemember);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userLogin || !userPwd) {
      return;
    }

    try {
      await login({ login: userLogin, password: userPwd }).unwrap();
      navigate('/posts', { replace: true });
    } catch (err) {}
  };

  const onChangeLoginInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setUserLogin(e.target.value);

  const onChangePwdInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setUserPwd(e.target.value);

  const onChangeRememberMe = () => {
    dispatch(authActions.changeRemenber());
  };

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 1,
        height: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MuiCard
        variant="outlined"
        sx={{
          px: 3,
          py: 1.5,
          minWidth: 250,
        }}
      >
        <Typography variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
          Sign in
        </Typography>
        {error && (
          <Typography color="error">
            {(error as any)?.data.message ?? 'An unexpected error occurred'}
          </Typography>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="login">Login</FormLabel>
            <TextField
              id="login"
              type="login"
              name="login"
              placeholder="your login"
              value={userLogin}
              onChange={onChangeLoginInput}
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              value={userPwd}
              onChange={onChangePwdInput}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox color="primary" onChange={onChangeRememberMe} checked={isRemember} />
            }
            label="Remember me"
          />

          <Button type="submit" fullWidth variant="contained" disabled={isLoading}>
            Sign in
          </Button>
        </Box>
      </MuiCard>
    </Stack>
  );
};

export default SignInPage;
