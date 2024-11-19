import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, Outlet } from 'react-router-dom';
import { Box, Button, Container, Stack } from '@mui/material';
import { AvatarTooltip } from '../../components/AvatarTooltip/AvatarTooltip';
import TransitionsModal from '../../components/PostModal/PostModal';
import { useAppSelector } from '../../store/store';
import { getUserAuthData } from '../../store/selectors/getUserAuthData/getUserAuthData';

const LINKS = [
  { text: 'Posts', path: '/posts' },
  { text: 'Users', path: '/users' },
];

export const Layout = () => {
  // проверка авторизован ли пользователь

  const isAuth = useAppSelector(getUserAuthData);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: isAuth ? 'space-between' : 'flex-end' }}>
          {isAuth ? (
            <>
              <Stack direction={'row'} gap={2}>
                {LINKS.map(({ text, path }) => (
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

      <Container component="main" sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <Outlet />
      </Container>
      <Box component="footer" sx={{ p: 2, bgcolor: 'primary.main' }}>
        <Typography align="center" color="primary.contrastText">
          Testing work 2024
        </Typography>
      </Box>
    </Box>
  );
};
