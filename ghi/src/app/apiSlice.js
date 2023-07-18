import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST
    }),
    endpoints: (builder) => ({
        getBuckets: builder.query({
            query: () => ({
                url: '/buckets',
                credentials: 'include'
            }),
            transformResponse: (response) => response.buckets,
            providesTags: ['Buckets']
        }),
        createBucket: builder.mutation({
            query: (body) => ({
                url: '/buckets',
                body,
                method: 'POST',
                credentials: 'include'
            }),
            invalidatesTags: ['Buckets']
        }),
        deleteBucket: builder.mutation({
            query: (bucket_id) => ({
                url: `/buckets/${bucket_id}`,
                method: 'DELETE',
                credentials: 'include'
            }),
            invalidatesTags: ['Buckets']
        }),
        getHighestRatedFilms: builder.query({
            query: () => 'api/films/rank',
            transformResponse: (response) => response.films
        }),
        searchFilm: builder.query({
            query: (title) => `/api/films/search/${title}`
        }),
        getFilmDetails: builder.query({
            query: (id) => `/api/films/${id}`
        }),
        getAccount: builder.query({
            query: () => ({
                url: `/token`,
                credentials: 'include'
            }),
            transformResponse: (response) => response ? response.account : null,
            providesTags: ['Account']
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/token',
                method: 'DELETE',
                credentials: 'include'
            }),
            invalidatesTags: ['Account']
        }),
        login: builder.mutation({
            query: ({username, password}) => {
                const body = new FormData();
                body.append('username', username)
                body.append('password', password)
                return {
                    url: `/token`,
                    method: `POST`,
                    body,
                    credentials: 'include'
                }
            },
            invalidatesTags: ['Account']
        }),
        signup: builder.mutation({
            query: (body) => ({
                url: `/api/accounts`,
                method: 'POST',
                body,
                credentials: 'include'
            }),
            invalidatesTags: ['Account']
        })
    })
})

export const {
    useSignupMutation,
    useCreateBucketMutation,
    useDeleteBucketMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetHighestRatedFilmsQuery,
    useSearchFilmQuery,
    useGetFilmDetailsQuery,
    useGetAccountQuery
} = movieApi;
