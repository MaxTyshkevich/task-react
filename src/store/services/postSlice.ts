import { IPost, IPostWithProfile } from '../types';
import { apiSlice } from './apiSlice';

type ICreatePost = Omit<IPost, 'id'>;

export const PostApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query<IPostWithProfile[], null>({
      query: () => ({
        url: `posts`,
        params: {
          _expand: 'profile',
        },
      }),
      providesTags: ['Post'],
    }),
    getPost: builder.query<IPostWithProfile, string>({
      query: (id) => ({
        url: `posts/${id}`,
        params: {
          _expand: 'profile',
        },
      }),
      providesTags: ['Post'],
    }),

    addPost: builder.mutation<IPost, ICreatePost>({
      query: (newPost) => ({
        url: `posts`,
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Post'],
    }),

    deletePost: builder.mutation<IPost, string>({
      query: (postId) => ({
        url: `posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const { useGetAllPostQuery, useGetPostQuery, useAddPostMutation, useDeletePostMutation } =
  PostApiSlice;
