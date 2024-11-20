import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FullPost } from '../../components/FullPost/FullPost';
import { useGetPostQuery } from '../../store/services/postSlice';

const PostDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: post } = useGetPostQuery(id as string);

  if (!post) {
    return (
      <Typography variant="body1" color="error" align="center" mt={4}>
        Not found post!
      </Typography>
    );
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

        '& > *': {
          flexGrow: 1,
        },
      }}
    >
      <FullPost post={post} />
    </Box>
  );
};

export default PostDetailsPage;
