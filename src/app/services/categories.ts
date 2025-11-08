import { axiosClient } from "@/lib/axios";

export type categoriesType = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export default async function getCategories() {
  const { data } = await axiosClient.get("/categories");
  return data;
}
