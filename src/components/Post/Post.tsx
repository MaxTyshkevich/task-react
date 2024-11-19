import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import React from 'react';
import { IPostWithProfile } from '../../store/types';
import { PostHeader } from './PostHeader/PostHeader';
import { NavLink } from 'react-router-dom';
import { favoriteActions } from '../../store/slices/Favorite';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getFavoriteCards } from '../../store/selectors/getFavoriteCards/getFavoriteCards';
import { getUserAuthData } from '../../store/selectors/getUserAuthData/getUserAuthData';

interface PostProps {
  post: IPostWithProfile;
}

export const Post = ({ post }: PostProps) => {
  const dispatch = useAppDispatch();
  const favoriteCards = useAppSelector(getFavoriteCards);
  const isFavorite = Boolean(favoriteCards.find((card) => card.id === post.id));
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [isDiliked, setIsDiliked] = React.useState<boolean>(false);

  const handleFavorite = () => {
    dispatch(favoriteActions.toggleFavorite(post));
  };

  return (
    <Card>
      <PostHeader profile={post.profile} postId={post.id} />
      <NavLink to={`/post/${post.id}`}>
        <CardMedia component="img" height="194" image={post.img} alt="Paella dish" />
      </NavLink>

      <CardContent>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {post.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={() => setIsLiked(!isLiked)}>
          <FavoriteIcon
            sx={(...props) => {
              return {
                color: isLiked ? 'red' : 'grey',
              };
            }}
          />
        </IconButton>

        <IconButton aria-label="dislike" onClick={() => setIsDiliked(!isDiliked)}>
          <ThumbDownIcon
            sx={(...props) => {
              return {
                color: isDiliked ? 'red' : 'grey',
              };
            }}
          />
        </IconButton>

        <IconButton aria-label="favorite" sx={{ ml: 'auto' }} onClick={handleFavorite}>
          <BookmarksIcon color={isFavorite ? 'primary' : 'inherit'} />
        </IconButton>
      </CardActions>
    </Card>
  );
};
