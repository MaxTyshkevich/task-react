import { Box, IconButton, TextField } from '@mui/material';
import React, { memo, useState } from 'react';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useCreateCommentMutation } from '../../../store/services/commentSlice';
import { useAppSelector } from '../../../store/store';
import { getUserAuthData } from '../../../store/selectors/getUserAuthData/getUserAuthData';
import { useGetProfileOwnerQuery } from '../../../store/services/profileSlice';

interface CommentFormProps {
  PostId: string;
}
export const CommentForm = memo(({ PostId }: CommentFormProps) => {
  const authProfile = useAppSelector(getUserAuthData);
  const { data: ownerProfile } = useGetProfileOwnerQuery(authProfile!.id);

  const [createComment, { isLoading }] = useCreateCommentMutation();
  const [message, setMessage] = useState('');

  const onChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const onCreateComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createComment({
      postId: PostId,
      profileId: ownerProfile!.id,
      body: message,
    });
    setMessage('');
  };

  return (
    <Box sx={{ display: 'flex' }} component="form" onSubmit={onCreateComment}>
      <TextField
        label="Multiline Placeholder"
        placeholder="Placeholder"
        multiline
        fullWidth
        rows={2}
        value={message}
        onChange={onChangeMessage}
      />
      <IconButton color="primary" size="large" type="submit" disabled={isLoading}>
        <AddCommentIcon />
      </IconButton>
    </Box>
  );
});
