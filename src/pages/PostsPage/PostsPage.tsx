import { Container, Stack } from '@mui/material';
import { Post } from '../../components/Post/Post';
import { Filters } from '../../components/Filters/Filters';
import Grid from '@mui/material/Grid2';

import { SnackbarError } from '../../components/SnackbarError/SnackbarError';
import { useGetAllPostQuery } from '../../store/services/postSlice';
import PostModal from '../../components/PostModal/PostModal';

import { useSearchParams } from 'react-router-dom';
const PostsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  const { data: posts, error } = useGetAllPostQuery({
    filters: {
      filterByName: searchParams.get('name') ?? undefined,
    },
  });

  if (!posts) {
    return;
  }
  return (
    <Container sx={{ height: 1 }}>
      <Stack direction="row" justifyContent="space-between" mt={2}>
        <Filters />
        <PostModal />
      </Stack>

      <Grid container spacing={[2, 4]} mt={4}>
        {posts?.map((post) => (
          <Grid size={{ xs: 12, sm: 6 }} key={post.id}>
            <Post post={post} />
          </Grid>
        ))}
        {error && <SnackbarError message="Error loading posts :(" />}
      </Grid>
    </Container>
  );
};

export default PostsPage;
