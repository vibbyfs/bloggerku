"use client";

import TableBlog from "@/components/dashboards/TableBlog";
import { useEffect, useState } from "react";
import { BlogType, getBlog } from "../services/blog";
import { getSavedToken } from "../services/auth";

export default function Dashboard() {
  const [blogs, setBlog] = useState<BlogType[]>([]);

  useEffect(() => {
    async function fecthBlog() {
      try {
        const data = await getBlog();
        getSavedToken();
        setBlog(data);
      } catch (err) {
        console.log("ERROR FETCH BLOG", err);
      }
    }

    fecthBlog();
  }, []);

  return (
    <>
      <TableBlog blogs={blogs} />
    </>
  );
}
