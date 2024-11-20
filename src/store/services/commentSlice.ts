import { IComment, ICommenttWithProfile } from '../types';
import { apiSlice } from './apiSlice';

type ICreateComment = Omit<IComment, 'id'>;

export const CommentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query<ICommenttWithProfile[], string>({
      query: (id) => ({
        url: `comments`,
        params: {
          postId: id,
          _expand: 'profile',
        },
      }),
      providesTags: ['Comment'],
    }),

    createComment: builder.mutation<IComment, ICreateComment>({
      // добавить типы
      query: (newComment) => ({
        url: `comments`,
        method: 'POST',
        body: newComment,
      }),
      invalidatesTags: ['Post', 'Comment'],
    }),
  }),
});

export const { useCreateCommentMutation, useGetCommentsByPostIdQuery } = CommentApiSlice;
