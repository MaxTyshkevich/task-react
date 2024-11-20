import { Box } from '@mui/material';
import { CommentForm } from './CommentForm/CommentForm';
import { CommentList } from './CommentList/CommentList';
import { useGetCommentsByPostIdQuery } from '../../store/services/commentSlice';

interface CommentsProps {
  PostId: string;
}

export const Comments = ({ PostId }: CommentsProps) => {
  const { data: comments } = useGetCommentsByPostIdQuery(PostId);

  console.log({ comments });
  return (
    <Box sx={{ overflowY: 'auto' }}>
      <CommentForm PostId={PostId} />
      {comments && <CommentList comments={comments} />}
    </Box>
  );
};
