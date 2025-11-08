"use client";

import TableBlog from "@/components/dashboards/TableBlog";
import { useEffect, useState } from "react";
import { BlogType, getBlog } from "../services/blog";
import { getSavedToken, setAuthToken } from "../services/auth";
import getCategories, { CategoriesType } from "../services/categories";

export default function Dashboard() {
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
        console.log("ERROR FETCH BLOG", err);
      }
    }

    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.log("ERROR FETCH CATEGORIES", err);
      }
    }

    fecthBlog();
    fetchCategories();
  }, []);

  return (
    <>
      <TableBlog blogs={blogs} categories={categories} />
    </>
  );
}
