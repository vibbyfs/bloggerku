"use client";

import Link from "next/link";
import Button from "../commons/Button";
import { FormEvent, useEffect, useState } from "react";
import { getBlogById, putBlog } from "@/app/services/blog";
import { useParams, useRouter } from "next/navigation";
import getCategories, { categoriesType } from "@/app/services/categories";

export default function FormEditBlog() {
  const { id } = useParams();
  const router = useRouter();
  const [categories, setCategories] = useState<categoriesType[]>();
  const [form, setForm] = useState({
    title: "",
    content: "",
    imgUrl: "",
    categoryId: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await putBlog(id as string, form);

      setForm({
        title: "",
        content: "",
        imgUrl: "",
        categoryId: "",
      });

      router.push("/dashboard");
    } catch (err) {
      console.log("ERROR HANDLE SUBMIT EDIT BLOG", err);
    }
  }

  useEffect(() => {
    async function fetchBlogById() {
      const data = await getBlogById(id as string);

      setForm({
        title: data.title,
        content: data.content,
        imgUrl: data.imgUrl,
        categoryId: data.categoryId,
      });
    }

    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
    }

    fetchBlogById();
    fetchCategories();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white border border-gray-300 shadow-md rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Form Edit Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="form-input w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
              placeholder="your title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="form-textarea w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200 resize-none"
              placeholder="your content"
              rows={5}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={form.imgUrl}
              onChange={(e) => setForm({ ...form, imgUrl: e.target.value })}
              className="form-input w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
              placeholder="https://your-image-url.jpg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>

            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-200"
            >
              <option value="" disabled>
                All Categories
              </option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <Button label="Submit" type="submit" className="w-full" />
        </form>

        <div className="mt-3">
          <Link href="/dashboard">
            <Button label="Back" type="submit" className="w-full" />
          </Link>
        </div>
      </div>
    </div>
  );
}
