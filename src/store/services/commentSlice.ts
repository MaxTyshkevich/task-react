import { IComment, IPost } from '../types';
import { apiSlice } from './apiSlice';

export const CommentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query<IComment[], string>({
      query: (id) => ({
        url: `comments`,
        params: {
          postId: id,
          _embed: 'profile',
        },
      }),
    }),

    createComment: builder.mutation<IComment[], any>({
      // добавить типы
      query: (id) => ({
        url: `comments`,
        method: 'POST',
        params: {
          postId: id,
          _embed: 'profile',
        },
      }),
    }),
  }),
});

export const { useCreateCommentMutation, useGetCommentsByPostIdQuery } = CommentApiSlice;
