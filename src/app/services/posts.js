import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    listPosts: builder.query({
      query: (page = 1) => `posts?page=${page}`,
    }),
  }),
})

export const { useListPostsQuery } = api