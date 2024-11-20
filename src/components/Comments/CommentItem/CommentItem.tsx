import { Avatar, Box, Card, Typography } from '@mui/material';
import { ICommenttWithProfile } from '../../../store/types';

interface CommentItemProps {
  comment: ICommenttWithProfile;
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  const avatarAlt = `${comment.profile.firstName}-${comment.profile.id}`;
  const profileName = `${comment.profile.firstName} ${comment.profile.lastName}`;
  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar alt={avatarAlt} src={comment.profile.avatar} />
        <Typography variant="subtitle2">{profileName}</Typography>
      </Box>
      <Typography variant="body1">{comment.body}</Typography>
    </Card>
  );
};
