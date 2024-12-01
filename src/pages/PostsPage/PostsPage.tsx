import { Button, Container, Stack, Typography } from '@mui/material';
import { Post } from '../../components/Post/Post';
import { Filters } from '../../components/Filters/Filters';
import Grid from '@mui/material/Grid2';

import { SnackbarError } from '../../components/SnackbarError/SnackbarError';
import { useGetAllPostQuery } from '../../store/services/postSlice';
import PostModal from '../../components/PostModal/PostModal';

import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { motion } from 'motion/react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { filterPostsActions } from '../../store/slices/Filters';
import { useInView } from 'react-intersection-observer';

const MotionTypography = motion(
  forwardRef<HTMLDivElement, React.ComponentProps<typeof Typography>>((props, ref) => (
    <Typography ref={ref} {...props} />
  )),
);
const PostsPage = () => {
  const filterByName = useAppSelector((state: RootState) => state.filterPosts.filterByName);
  const page = useAppSelector((state: RootState) => state.filterPosts.page);
  const dispatch = useAppDispatch();
  const { ref, inView } = useInView({
    threshold: 1.0,
    triggerOnce: true,
  });

  const {
    data: posts,
    error,
    isError,
    isFetching,
  } = useGetAllPostQuery({
    filters: {
      filterByName: filterByName === 'All' ? undefined : filterByName,
    },
    page: String(page),
  });

  useEffect(() => {
    console.log({ inView, isFetching, isError });
    if (inView && !isFetching && !isError) {
      // simple db
      if (page <= 5) {
        dispatch(filterPostsActions.nextPage());
      }
    }
  }, [inView, isFetching, isError]);

  if (!posts) {
    return;
  }
  return (
    <Container sx={{ height: 1 }}>
      <MotionTypography initial={{ x: -50 }} whileInView={{ x: 0 }} variant="h4">
        Posts
      </MotionTypography>
      <Button onClick={() => dispatch(filterPostsActions.nextPage())}>post dowload</Button>
      <Stack direction="row" justifyContent="space-between" mt={2}>
        <Filters />
        <PostModal />
      </Stack>

      <Grid container spacing={[2, 4]} mt={4}>
        {!!posts.length ? (
          <>
            {posts?.map((post) => (
              <Grid size={{ xs: 12, sm: 6 }} key={post.id}>
                <Post post={post} />
              </Grid>
            ))}
            <div ref={ref} style={{ height: '20px', backgroundColor: 'transparent' }} />
          </>
        ) : (
          <Typography>No posts</Typography>
        )}
        {error && <SnackbarError message="Error loading posts :(" />}
        {isFetching && <Typography>Loading more...</Typography>}
      </Grid>
    </Container>
  );
};

export default PostsPage;
