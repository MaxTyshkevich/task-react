import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';
import React from 'react';

interface SnackbarErrorProps {
  message: string;
}

export const SnackbarError = ({ message }: SnackbarErrorProps) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
