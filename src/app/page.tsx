"use client";

import BlogCard from "@/components/publics/BlogCard";
import { BlogType, getPublicBlog } from "./services/blog";
import { useEffect, useState } from "react";
import Sidebar from "@/components/publics/Sidebar";

export default function Dashboard() {
  const [blogs, setBlog] = useState<BlogType[]>([]);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const data = await getPublicBlog();
        setBlog(data);
      } catch (err) {
        console.log("Error fetching data", err);
      }
    }

    fetchBlog();
  }, []);

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 flex flex-col-reverse sm:flex-row gap-6">
        <div className="">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        <div className="">
          <Sidebar />
        </div>
      </div>
    </>
  );
}
