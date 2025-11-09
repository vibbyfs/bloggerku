import { axiosClient } from "@/lib/axios";

export type CategoriesType = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export async function getCategories() {
  const { data } = await axiosClient.get<CategoriesType[]>("/categories");
  return data;
}

export async function createCategory(name: string) {
  const { data } = await axiosClient.post(`/categories`, { name });
  return data;
}
