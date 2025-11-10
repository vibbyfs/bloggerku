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

export async function getPublicBlog(search?: string) {
  const url =
    search && search.trim() !== ""
      ? `/pub/posts?search=${encodeURIComponent(search)}`
      : "/pub/posts";
  const { data } = await axiosClient.get<BlogType[]>(url);
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

export async function uploadImage(id: string, file: File) {
  const formData = new FormData();
  formData.append("coverImage", file);

  const { data } = await axiosClient.patch(`/posts/${id}/cover-url`, formData);
  return data;
}

export async function deleteBlog(id: string) {
  const { data } = await axiosClient.delete(`/posts/${id}`);
  return data;
}
