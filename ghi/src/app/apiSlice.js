import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
  }),
  endpoints: (builder) => ({
    getBuckets: builder.query({
      query: () => ({
        url: "/buckets",
        credentials: "include",
      }),
      transformResponse: (response) => response,
      providesTags: ["Buckets"],
    }),
    createBucket: builder.mutation({
      query: (body) => ({
        url: "/buckets",
        body,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Buckets"],
    }),
    deleteBucket: builder.mutation({
      query: (bucket_id) => ({
        url: `/buckets/${bucket_id}/`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Buckets"],
    }),
    getHighestRatedFilms: builder.query({
      query: () => "api/films/rank",
      transformResponse: (response) => response,
    }),
    searchFilm: builder.query({
      query: (title) => `/api/films/search/${title}`,
    }),
    getFilmDetails: builder.query({
      query: (id) => `/api/films/${id}`,
    }),
    getAccount: builder.query({
      query: () => ({
        url: `/token`,
        credentials: "include",
      }),
      transformResponse: (response) => (response ? response.account : null),
      providesTags: ["Account"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/token",
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Account"],
    }),
    login: builder.mutation({
      query: ({ username, password }) => {
        const body = new FormData();
        body.append("username", username);
        body.append("password", password);
        return {
          url: `/token`,
          method: `POST`,
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["Account"],
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: `/api/accounts`,
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Account"],
    }),
    bucketfilms: builder.query({
      query: (bucket_id) => ({
        url: `/buckets/${bucket_id}/films`,
        credentials: "include",
      }),
      transformResponse: (response) => response,
      providesTags: ["Buckets"],
    }),
    updateBucket: builder.mutation({
    query: ({ bucket_id, name }) => ({
      url: `/buckets/${bucket_id}`,
      method: "PUT",
      body: { name }, // Send the updated name in the request body
      credentials: "include",
    }),
    invalidatesTags: ["Buckets"],
    }),
    addFilmToBucket: builder.mutation({
    query: ({ bucket_id, film_id }) => {
      const url = `/buckets/${bucket_id}/films/${film_id}`;
      return {
        url,
        method: "POST",
        credentials: "include",
      };
    },
    invalidatesTags: ["Buckets"],
  }),
    deleteFilmFromBucket: builder.mutation({
      query: ({ bucket_id, film_id }) => ({
        url: `/buckets/${bucket_id}/films/${film_id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Buckets"],
    }),
  }),
});

export const {
    useSignupMutation,
    useGetBucketsQuery,
    useCreateBucketMutation,
    useDeleteBucketMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetHighestRatedFilmsQuery,
    useSearchFilmQuery,
    useGetFilmDetailsQuery,
    useGetAccountQuery,
    useBucketfilmsQuery,
    useUpdateBucketMutation,
    useAddFilmToBucketMutation,
    useDeleteFilmFromBucketMutation,
} = movieApi;
