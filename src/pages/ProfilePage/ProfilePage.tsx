import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetProfileByIdQuery } from '../../store/services/profileSlice';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';

const ProfilePage = () => {
  const { profileId } = useParams();
  const { data: profile } = useGetProfileByIdQuery(profileId as string);

  if (!profile) {
    return (
      <Typography variant="body1" color="error" align="center" mt={4}>
        Not found profile!
      </Typography>
    );
  }
  return (
    <Container
      sx={{
        width: 1,
        minHeight: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ProfileCard profile={profile} />
    </Container>
  );
};

export default ProfilePage;
