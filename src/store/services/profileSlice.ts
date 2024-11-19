import { IComment, IPost, IProfile } from '../types';
import { apiSlice } from './apiSlice';

type UpdateProfile = Partial<Omit<IProfile, 'id'>> & { id: string };

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfileById: builder.query<IProfile, string>({
      query: (profileId) => ({
        url: `profiles/${profileId}`,
      }),

      providesTags: ['Profile'],
    }),
    getProfileOwner: builder.query<IProfile, string>({
      query: (userId) => ({
        url: `profiles`,
        params: {
          userId,
        },
      }),
      transformResponse: (response: IProfile[]) => response[0],
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<IProfile, UpdateProfile>({
      query: ({ id, ...update }: UpdateProfile) => ({
        url: `profiles/${id}`,
        method: 'PATCH',
        body: update,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useGetProfileByIdQuery, useGetProfileOwnerQuery, useUpdateProfileMutation } =
  profileApiSlice;
