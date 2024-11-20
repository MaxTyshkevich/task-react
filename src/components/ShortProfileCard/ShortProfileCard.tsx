import { Avatar, Card, Stack, Typography } from '@mui/material';
import { IProfile } from '../../store/types';

interface ShortProfileCardProps {
  profile: IProfile;
}
export const ShortProfileCard = ({ profile }: ShortProfileCardProps) => {
  const name = `${profile.firstName} ${profile.lastName}`;
  return (
    <Card sx={{ px: 2, py: 1 }}>
      <Stack direction={'row'} gap={1} alignItems={'center'}>
        <Avatar src={profile.avatar} alt={profile.firstName} />
        <Typography>{name}</Typography>
      </Stack>
    </Card>
  );
};
