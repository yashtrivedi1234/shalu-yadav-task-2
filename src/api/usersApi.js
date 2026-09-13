import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// RTK Query API — only one mutation for this beginner project
export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  endpoints: (builder) => ({
    // POST /users
    addUser: builder.mutation({
      query: (user) => ({
        url: "users",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useAddUserMutation } = usersApi;
