import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ecommers-mern-backend.onrender.com' }),
    tagTypes: ['User', 'Users', 'Products', 'Product'],
    endpoints: () => ({})
})