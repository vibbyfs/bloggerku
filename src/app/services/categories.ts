import { axiosClient } from "@/lib/axios";

export type CategoriesType = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export default async function getCategories() {
  const { data } = await axiosClient.get<CategoriesType[]>("/categories");
  return data;
}
