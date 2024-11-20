import { ICommenttWithProfile } from '../../../store/types';
import { Stack } from '@mui/material';
import { CommentItem } from '../CommentItem/CommentItem';

interface CommentListProps {
  comments: ICommenttWithProfile[];
}
export const CommentList = ({ comments }: CommentListProps) => {
  return (
    <Stack spacing={2}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </Stack>
  );
};
