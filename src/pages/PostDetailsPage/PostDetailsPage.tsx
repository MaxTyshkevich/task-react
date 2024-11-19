import { Box, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { FullPost } from '../../components/FullPost/FullPost';
import { useGetPostQuery } from '../../store/services/postSlice';

const PostDetailsPage = () => {
  const { id } = useParams();

  if (!id) {
    return null;
  }
  const { data: post } = useGetPostQuery(id);

  if (!post) {
    return <Typography>Not found</Typography>;
  }
  return (
    <Box
      sx={{
        padding: 2,
        width: 1,
        minHeight: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FullPost post={post} />
    </Box>
  );
};

export default PostDetailsPage;
