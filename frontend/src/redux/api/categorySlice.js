import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

export const categorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: newCategory,
      }),
    }),

    updateCategory: builder.mutation({
      query: ({ categoryId, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: updatedCategory,
      }),
    }),

    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
    }),

    getCategoryList: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}/categories`,
        providesTags: ["Category"],
      }),
    }),

    readCategory: builder.query({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryListQuery,
  useReadCategoryQuery,
} = categorySlice;
