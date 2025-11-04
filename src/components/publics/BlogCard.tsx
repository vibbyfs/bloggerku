import Image from "next/image";

import { BlogType } from "@/app/services/blog";
import Button from "../commons/Button";
import Link from "next/link";

type Props = {
  id?: string;
  blog: BlogType;
};

export default function BlogCard({ blog }: Props) {
  return (
    <>
      <article className="flex justify-between items-start gap-6 border-b pb-6 border-gray-400 mt-10">
        <div className=" space-y-4">
          <p className="text-xs text-gray-500">
            Category by <span className="font-medium">{blog.categoryId}</span>
          </p>

          <h2 className="text-xl font-bold text-black">{blog.title}</h2>

          <p className="text-sm text-gray-600 px-1 py-1 max-w-[500px] text-justify line-clamp-2 overflow-hidden">
            {blog.content}
          </p>
          <Link href={`blogs/${blog.id}`}>
            <Button label="See Detail" />
          </Link>
        </div>

        <div className="">
          <Image
            src={blog.imgUrl}
            alt="Post thumbnail"
            width={36}
            height={28}
            className="w-36 h-28 object-cover rounded-md"
          />
        </div>
      </article>
    </>
  );
}
