"use client";

import BlogCard from "@/components/publics/BlogCard";
import { BlogType, getBlog } from "./services/blog";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [blogs, setBlog] = useState<BlogType[]>([]);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const data = await getBlog();
        setBlog(data);
        console.log(data);
      } catch (err) {
        console.log("Error fetching data", err);
      }
    }

    fetchBlog();
  }, []);

  return (
    <>
      <div className="max-w-4xl mx-auto p-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
}
