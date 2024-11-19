import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useGetProfileOwnerQuery } from '../../store/services/profileSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getUserAuthData } from '../../store/selectors/getUserAuthData/getUserAuthData';
import { NavLink, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/slices/Auth';

export const AvatarTooltip = () => {
  const userAuth = useAppSelector(getUserAuthData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: profile } = useGetProfileOwnerQuery(userAuth!.id); // будет точно тк мы залогинены

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  if (!profile) return null;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ marginLeft: 1 }}>
      <Tooltip title="Open menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={profile?.firstName} src={profile?.avatar} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem component={NavLink} to={`/profile/${profile?.id}`} onClick={handleCloseUserMenu}>
          <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
        </MenuItem>

        <MenuItem component={NavLink} to={`/favorites`} onClick={handleCloseUserMenu}>
          <Typography sx={{ textAlign: 'center' }}>Favorites</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            dispatch(authActions.logout());
            handleCloseUserMenu();
            navigate('/');
          }}
        >
          <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
