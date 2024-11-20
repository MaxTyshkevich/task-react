import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate, useRouteError } from 'react-router-dom';

const NotFoundPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate(-1);
  };

  const errorMessage =
    (error as { statusText?: string; message?: string })?.statusText ||
    (error as { statusText?: string; message?: string })?.message ||
    'Unknown error';
  return (
    <Container sx={{ width: 1, height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Typography color="error" variant="h4">
          Oops!
        </Typography>
        <Typography variant="subtitle1">Sorry, an unexpected error has occurred.</Typography>
        <Typography variant="body1">{errorMessage}</Typography>
        <Button variant="contained" onClick={onGoBack}>
          Go to back
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
