import { Box, Stack, Typography } from '@mui/material';
import { useGetAllProfileQuery } from '../../store/services/profileSlice';
import { ShortProfileCard } from '../../components/ShortProfileCard/ShortProfileCard';

const UsersPage = () => {
  const { data: profiles } = useGetAllProfileQuery(undefined);
  return (
    <Box>
      <Typography variant="h4">User:</Typography>
      <Stack mt={2} spacing={2}>
        {profiles?.map((profile) => <ShortProfileCard key={profile.id} profile={profile} />)}
      </Stack>
    </Box>
  );
};

export default UsersPage;
