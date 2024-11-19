import { Box, Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ForbiddenPage = () => {
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate(-1);
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 1 }}>
      <Card sx={{ px: 4, py: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography color="error" variant="h4">
          You do not have access to this page!
        </Typography>
        <Button variant="contained" onClick={onGoBack}>
          Go to back
        </Button>
      </Card>
    </Box>
  );
};

export default ForbiddenPage;
