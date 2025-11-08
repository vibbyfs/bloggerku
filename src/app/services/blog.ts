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

export async function getPublicBlog() {
  const { data } = await axiosClient.get<BlogType[]>("/pub/posts");
  return data;
}

export async function getPublicBlogById(id: string) {
  const { data } = await axiosClient.get<BlogType>(`/pub/posts/${id}`);
  return data;
}

export async function getBlog() {
  const { data } = await axiosClient.get("/posts");
  return data;
}

export async function getBlogById(id: string) {
  const { data } = await axiosClient.get(`/posts/${id}`);
  return data;
}

export async function putBlog(id: string, payload: Partial<BlogType>) {
  const { data } = await axiosClient.put(`/posts/${id}`, payload);
  return data;
}

export async function createBlog(payload: Partial<BlogType>) {
  const { data } = await axiosClient.post("/posts", payload);
  return data;
}
