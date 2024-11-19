import { Avatar, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';

import { IProfile } from '../../store/types';
import { useState } from 'react';
import { useAppSelector } from '../../store/store';
import { getUserAuthData } from '../../store/selectors/getUserAuthData/getUserAuthData';
import { useUpdateProfileMutation } from '../../store/services/profileSlice';

interface ProfileCardProps {
  profile: IProfile;
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  const authData = useAppSelector(getUserAuthData);
  const [updateProfile] = useUpdateProfileMutation();

  const canEdit = authData?.id === profile?.userId;
  const [readonly, setReadonly] = useState(true);

  const [firstName, setFirstName] = useState(profile?.firstName);
  const [lastName, setLastName] = useState(profile?.lastName);
  const [age, setAge] = useState(String(profile.age));

  const onHandleEdit = () => setReadonly(false);
  const onHandleCancelEdit = () => {
    setReadonly(true);
    setFirstName(profile.firstName);
    setLastName(profile?.lastName);
    setAge(String(profile.age));
  };
  const onHandleSave = () => {
    updateProfile({
      id: profile.id,
      firstName,
      lastName,
      age: parseInt(age, 10),
    });
    setReadonly(true);
  };

  return (
    <Card sx={{ px: 3, py: 2 }}>
      <Typography variant="h4">Profile</Typography>
      <Stack>
        {canEdit && (
          <Stack direction={'row'} gap={2} justifyContent={'flex-end'}>
            {readonly ? (
              <Button variant="contained" onClick={onHandleEdit}>
                Edit
              </Button>
            ) : (
              <Stack direction={'row'} gap={2}>
                <Button variant="contained" color="warning" onClick={onHandleCancelEdit}>
                  Cancel
                </Button>
                <Button variant="contained" color="success" onClick={onHandleSave}>
                  Save
                </Button>
              </Stack>
            )}
          </Stack>
        )}
      </Stack>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}
        component="form"
      >
        <Avatar src={profile.avatar} sx={{ width: 100, height: 100 }} />
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={readonly}
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={readonly}
        />
        <TextField
          label="Age"
          value={age}
          onChange={(e) => setAge(String(e.target.value))}
          disabled={readonly}
        />
      </CardContent>
    </Card>
  );
};

/*    <Card>
    <TextField value={firstName} onChange={(e) => setFirstName(e.target.value) } />
    <TextField value={profile.lastName} />
    <TextField value={profile.email} />
    <TextField value={profile.avatar} />
  
   </Card> */
