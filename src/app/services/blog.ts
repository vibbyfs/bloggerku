import { axiosClient } from "@/lib/axios";

export type BlogType = {
  id: string;
  title: string;
  content: string;
  imgUrl: string;
  categoryId: string;
  AuthorId: string;
  updatedAt: string;
  createdAt: string;
};

export async function getBlog() {
  const { data } = await axiosClient.get<BlogType[]>("/pub/posts");
  return data;
}

export async function getBlogById(id: string) {
  const { data } = await axiosClient.get<BlogType>(`/pub/posts/${id}`);
  return data;
}
