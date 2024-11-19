import { Avatar, CardHeader, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { NavLink } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { IProfile } from '../../../store/types';
import { useDeletePostMutation } from '../../../store/services/postSlice';
import { useAppSelector } from '../../../store/store';
import { getUserAuthData } from '../../../store/selectors/getUserAuthData/getUserAuthData';

interface PostHeaderProps {
  profile: IProfile;
  postId: string;
}

export const PostHeader = ({ profile, postId }: PostHeaderProps) => {
  const authData = useAppSelector(getUserAuthData);
  const [deletePost] = useDeletePostMutation();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const canDelete = authData?.id === profile?.userId;
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const name = `${profile.firstName} ${profile.lastName}`;

  const settings = useMemo(() => {
    const settings = [
      {
        text: 'Change',
        onClick: () => handleCloseUserMenu(),
      },
      {
        text: 'Delete',
        onClick: async () => {
          await deletePost(postId);
          handleCloseUserMenu();
        },
      },
    ];

    return settings.map((setting) => (
      <MenuItem key={setting.text} onClick={setting.onClick}>
        <Typography sx={{ textAlign: 'center' }}>{setting.text}</Typography>
      </MenuItem>
    ));
  }, []);
  return (
    <CardHeader
      avatar={
        <Avatar
          aria-label="recipe"
          src={profile.avatar}
          component={NavLink}
          to={`/profile/${profile.id}`}
        />
      }
      action={
        canDelete && (
          <>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} aria-label="settings">
                <MoreVertIcon />
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
              {settings}
            </Menu>
          </>
        )
      }
      title={name}
    />
  );
};
