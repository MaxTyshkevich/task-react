import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink, Outlet } from 'react-router-dom';
import { Box, Button, Container, Stack } from '@mui/material';
import { AvatarTooltip } from '../../components/AvatarTooltip/AvatarTooltip';

import { useAppSelector } from '../../store/store';
import { getUserAuthData } from '../../store/selectors/getUserAuthData/getUserAuthData';
import { UserRole } from '../../store/types';
import { useMemo } from 'react';

const LINKS = [{ text: 'Posts', path: '/posts' }];

export const Layout = () => {
  // проверка авторизован ли пользователь

  const isAuth = useAppSelector(getUserAuthData);
  const isAdmin = isAuth?.roles.includes(UserRole.ADMIN);

  const navigationLinks = useMemo(() => {
    return isAdmin ? [...LINKS, { text: 'Admin', path: '/admin' }] : LINKS;
  }, [isAdmin]);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: isAuth ? 'space-between' : 'flex-end' }}>
          {isAuth ? (
            <>
              <Stack direction={'row'} gap={2}>
                {navigationLinks.map(({ text, path }) => (
                  <Button component={NavLink} to={path} key={text} variant="text" color="inherit">
                    {text}
                  </Button>
                ))}
              </Stack>
              <AvatarTooltip />
            </>
          ) : (
            <Button component={NavLink} to="/sign-in" variant="text" color="inherit">
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }} component="main">
        <Outlet />
      </Box>

      <Box component="footer" sx={{ p: 2, bgcolor: 'primary.main' }}>
        <Typography align="center" color="primary.contrastText">
          Testing work 2024
        </Typography>
      </Box>
    </Box>
  );
};
