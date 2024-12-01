import { IPost, IPostWithProfile } from '../types';
import { apiSlice } from './apiSlice';

type ICreatePost = Omit<IPost, 'id'>;

interface PostFilters {
  filterByName?: string;
}

interface getAllPostProps {
  filters?: PostFilters;
  page: string;
}

export const PostApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query<IPostWithProfile[], getAllPostProps>({
      query: ({ filters, page }) => {
        const params: Record<string, string> = {
          _expand: 'profile',
          _limit: '2',
          _page: page,
        };

        if (filters?.filterByName) {
          params.profileId = filters.filterByName === 'Max' ? '1' : '2';
        }

        return {
          url: `posts`,
          params,
        };
      },

      serializeQueryArgs: ({ queryArgs }) => {
        const { filters } = queryArgs; // Учитываем только фильтры, игнорируем page
        return filters || {};
      },

      merge: (currentCache, newItems) => {
        const uniquePosts = newItems.filter(
          (newPost) => !currentCache.some((cachedPost) => cachedPost.id === newPost.id),
        );

        currentCache.push(...uniquePosts);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post' as const, id: 'LIST' },
            ]
          : [{ type: 'Post' as const, id: 'LIST' }],

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
    }),
    getPost: builder.query<IPostWithProfile, string>({
      query: (id) => ({
        url: `posts/${id}`,
        params: {
          _expand: 'profile',
        },
      }),
      providesTags: () => [{ type: 'Post' as const, id: 'LIST' }],
    }),

    addPost: builder.mutation<IPost, ICreatePost>({
      query: (newPost) => ({
        url: `posts`,
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: [{ type: 'Post' as const, id: 'LIST' }],
    }),

    deletePost: builder.mutation<IPost, string>({
      query: (postId) => ({
        url: `posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Post' as const, id }],
    }),
  }),
});

export const { useGetAllPostQuery, useGetPostQuery, useAddPostMutation, useDeletePostMutation } =
  PostApiSlice;
