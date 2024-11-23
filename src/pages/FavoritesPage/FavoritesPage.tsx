import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Post } from '../../components/Post/Post';
import { useAppSelector } from '../../store/store';
import { getFavoriteCards } from '../../store/selectors/getFavoriteCards/getFavoriteCards';

const FavoritesPage = () => {
  const favoritePosts = useAppSelector(getFavoriteCards);

  if (favoritePosts.length === 0) {
    return (
      <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5" align="center" color="warning">
          You don't have any favorite posts yet.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ height: 1 }}>
      <Grid container spacing={[2, 4]} mt={4}>
        {favoritePosts.map((post) => (
          <Grid size={{ xs: 12, md: 6 }} key={post.id}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FavoritesPage;
