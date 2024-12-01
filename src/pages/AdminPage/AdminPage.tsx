import { Box, Container, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <Container sx={{ height: 1, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <Box
        sx={{
          width: {
            xs: 1,
            md: 1 / 4,
          },
          padding: 2,
        }}
      >
        <Typography variant="h5">Admin Page! Only for admin</Typography>
        <Link to="/admin/users">Users</Link>
      </Box>
      <Outlet />
    </Container>
  );
};

export default AdminPage;
