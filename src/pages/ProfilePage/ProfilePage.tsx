import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetProfileByIdQuery } from '../../store/services/profileSlice';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';

const ProfilePage = () => {
  const { profileId } = useParams();
  const { data: profile } = useGetProfileByIdQuery(profileId);

  console.log({ profileId, profile });
  if (!profile) {
    return null;
  }
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
      <ProfileCard profile={profile} />
    </Box>
  );
};

export default ProfilePage;
