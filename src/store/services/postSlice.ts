import { IPost, IPostWithProfile } from '../types';
import { apiSlice } from './apiSlice';

type ICreatePost = Omit<IPost, 'id'>;

interface PostFilters {
  filterByName?: string;
}

interface getAllPostProps {
  filters?: PostFilters;
}

export const PostApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query<IPostWithProfile[], getAllPostProps>({
      query: ({ filters }) => {
        const params: Record<string, string> = {
          _expand: 'profile',
        };

        console.log(`query`, filters);

        return {
          url: `posts`,
          params,
        };
      },
      transformResponse(posts: IPostWithProfile[] | null, meta, { filters }): IPostWithProfile[] {
        if (!posts) {
          return [];
        }
        console.log({ posts, filters });
        if (filters?.filterByName) {
          return posts.filter((post) => {
            return post.profile.firstName === filters.filterByName;
          });
        }
        return posts;
      },
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
