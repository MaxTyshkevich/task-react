import { Box, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useCreateCommentMutation } from '../../../store/services/commentSlice';

export const CommentForm = () => {
  const {} = useCreateCommentMutation();
  const [message, setMessage] = useState('');

  const onChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const onCreateComment = () => {};

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
      <IconButton color="primary" size="large" type="submit">
        <AddCommentIcon />
      </IconButton>
    </Box>
  );
};
