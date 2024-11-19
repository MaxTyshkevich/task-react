import { Box, Typography } from '@mui/material';

const WelcomPage = () => {
  return (
    <Box
      sx={{
        width: 1,
        minHeight: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h2" color="primary" align="center">
        Welcom!
      </Typography>
    </Box>
  );
};

export default WelcomPage;
