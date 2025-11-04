"use client";

import { BlogType, getBlogById } from "@/app/services/blog";
import Button from "@/components/commons/Button";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogType>();

  useEffect(() => {
    async function fetchBlogById() {
      try {
        const data = await getBlogById(id as string);
        setBlog(data);
      } catch (err) {
        console.log("ERROR FETCH DATA BLOG BY ID", err);
      }
    }

    if (id) fetchBlogById();
  }, [id]);

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Image
          src={blog.imgUrl}
          alt="Image Blog"
          width={500}
          height={250}
          className="w-full h-64 object-cover rounded-xl shadow-md"
        />
      </div>

      <div className="text-sm text-gray-500 mb-2 ">
        <span>
          <span className="font-medium text-gray-800">Post at</span>
        </span>
        <span className="mx-2">•</span>
        <span>{formatDate(blog.createdAt)}</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        {blog.title}
      </h1>

      <article className="prose prose-sm sm:prose lg:prose-lg max-w-3xl mx-auto mb-10 px-4 text-justify leading-relaxed tracking-wide font-light prose-a:text-blue-600 prose-headings:text-gray-800">
        {blog.content}
      </article>
      <Link href={`/`}>
        <Button label="Back" />
      </Link>
    </div>
  );
}
