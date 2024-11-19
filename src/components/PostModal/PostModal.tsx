import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useGetProfileOwnerQuery } from '../../store/services/profileSlice';
import { useAppSelector } from '../../store/store';
import { getUserAuthData } from '../../store/selectors/getUserAuthData/getUserAuthData';
import { useAddPostMutation } from '../../store/services/postSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const URL_DEFAOUT_IMAGE =
  'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=';

export default function PostModal() {
  const authProfile = useAppSelector(getUserAuthData);
  const { data: ownerProfile, isLoading } = useGetProfileOwnerQuery(authProfile!.id); // будет точно тк мы залогинены;

  const [addPost] = useAddPostMutation();
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreatePost = async () => {
    await addPost({
      profileId: ownerProfile!.id,
      commentsIds: [],
      likes: 0,
      body: description,
      img: URL_DEFAOUT_IMAGE,
    });
    setDescription('');
    setOpen(false);
  };

  return (
    <Box>
      <Button onClick={handleOpen} variant="contained">
        Create Post
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Create new Post
            </Typography>
            <Box component="img" src={URL_DEFAOUT_IMAGE} sx={{ height: 200 }} />
            <TextField
              label="Description post"
              placeholder="Text..."
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button variant="contained" onClick={handleCreatePost} disabled={isLoading}>
              Add
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
