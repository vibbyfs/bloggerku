"use client";

import TableBlog from "@/components/dashboards/TableBlog";
import { useEffect, useState } from "react";
import { BlogType, deleteBlog, getBlog } from "../services/blog";
import { getSavedToken, setAuthToken } from "../services/auth";
import { CategoriesType, getCategories } from "../services/categories";
import { useParams } from "next/navigation";
import { showError, showSuccess } from "@/lib/toast";

export default function Dashboard() {
  const { id } = useParams();
  const [blogs, setBlog] = useState<BlogType[]>([]);
  const [categories, setCategories] = useState<CategoriesType[]>([]);

  useEffect(() => {
    async function fecthBlog() {
      try {
        const token = getSavedToken();
        if (token) setAuthToken(token);

        const data = await getBlog();
        setBlog(data);
      } catch (err) {
        showError(err);
      }
    }

    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        showError(err);
      }
    }

    fecthBlog();
    fetchCategories();
  }, []);

  async function handleDeleteBlog(id: string | number) {
    try {
      await deleteBlog(id as string);
      showSuccess("Blog deleted successfully!");

      const remainingBlog = blogs.filter((blog) => blog.id !== id);

      setBlog(remainingBlog);
    } catch (err) {
      showError(err);
    }
  }

  return (
    <>
      <TableBlog
        blogs={blogs}
        categories={categories}
        onDelete={handleDeleteBlog}
      />
    </>
  );
}
