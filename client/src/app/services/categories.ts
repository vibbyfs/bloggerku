import { axiosClient } from "@/lib/axios";

export type CategoriesType = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export async function getPublicCategories() {
  const { data } = await axiosClient.get<CategoriesType[]>("/pub/categories");
  return data;
}

export async function getCategories() {
  const { data } = await axiosClient.get<CategoriesType[]>("/categories");
  return data;
}

export async function createCategory(name: string) {
  const { data } = await axiosClient.post(`/categories`, { name });
  return data;
}

export async function deleteCategory(id: number | string) {
  const { data } = await axiosClient.delete(`/categories/${id}`);
  return data;
}
