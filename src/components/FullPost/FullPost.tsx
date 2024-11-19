import { Box, Card } from '@mui/material';

import { Comments } from '../Comments/Comments';
import React from 'react';

import { Post } from '../Post/Post';
import { useGetPostQuery } from '../../store/services/postSlice';
import { IPost } from '../../store/types';

const settings = ['Change', 'Delete'];

interface FullPostProps {
  post: IPost;
}
export const FullPost = ({ post }: FullPostProps) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isLiked, setIsLiked] = React.useState<boolean>(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        gap: {
          xs: 2,
          md: 4,
        },
        px: 3,
        py: 2,
      }}
    >
      <Post post={post} />
      <Comments PostId={post.id} />
    </Card>
  );
};
