import { Box } from '@mui/material';
import { Comments } from '../Comments/Comments';
import { Post } from '../Post/Post';
import { IPostWithProfile } from '../../store/types';

interface FullPostProps {
  post: IPostWithProfile;
}
export const FullPost = ({ post }: FullPostProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        justifyContent: 'center',
        gap: 2,
        px: 3,
        py: 2,
      }}
    >
      <Post post={post} />
      <Comments PostId={post.id} />
    </Box>
  );
};
