import { Container, Stack } from '@mui/material';
import { Post } from '../../components/Post/Post';
import { Filters } from '../../components/Filters/Filters';
import Grid from '@mui/material/Grid2';

import { SnackbarError } from '../../components/SnackbarError/SnackbarError';
import { useGetAllPostQuery } from '../../store/services/postSlice';
import PostModal from '../../components/PostModal/PostModal';
const PostsPage = () => {
  const { data: posts, error } = useGetAllPostQuery(null);

  return (
    <Container>
      <Stack direction={'row'} justifyContent={'space-between'} mt={2}>
        <Filters />
        <PostModal />
      </Stack>

      <Grid container spacing={[2, 4]} mt={4}>
        {posts?.map((post) => (
          <Grid size={{ xs: 12, md: 6 }} key={post.id}>
            <Post post={post} />
          </Grid>
        ))}
        {error && <SnackbarError message={'Ошибка при загрузке постов :('} />}
      </Grid>
    </Container>
  );
};

export default PostsPage;
