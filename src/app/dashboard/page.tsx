"use client";

import TableBlog from "@/components/dashboards/TableBlog";
import { useEffect, useState } from "react";
import { BlogType, getBlog } from "../services/blog";
import { getSavedToken, setAuthToken } from "../services/auth";

export default function Dashboard() {
  const [blogs, setBlog] = useState<BlogType[]>([]);

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

    fecthBlog();
  }, []);

  return (
    <>
      <TableBlog blogs={blogs} />
    </>
  );
}
