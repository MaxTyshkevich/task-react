import { Container, Stack, Typography } from '@mui/material';
import { useGetAllProfileQuery } from '../../store/services/profileSlice';
import { ShortProfileCard } from '../../components/ShortProfileCard/ShortProfileCard';

const UsersPage = () => {
  const { data: profiles } = useGetAllProfileQuery(undefined);
  return (
    <Container sx={{ height: 1 }}>
      <Typography variant="h4">User:</Typography>
      <Stack mt={2} spacing={2}>
        {profiles?.map((profile) => <ShortProfileCard key={profile.id} profile={profile} />)}
      </Stack>
    </Container>
  );
};

export default UsersPage;
