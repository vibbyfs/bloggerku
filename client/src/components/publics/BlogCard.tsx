import Image from "next/image";

import { BlogType } from "@/app/services/blog";
import Button from "../commons/Button";
import Link from "next/link";
import { CategoriesType } from "@/app/services/categories";

type Props = {
  id?: string;
  blog: BlogType;
  categoryName: string;
};

export default function BlogCard({ blog, categoryName }: Props) {
  return (
    <>
      <article className="border-b pb-6 border-gray-400 mt-5">
        <div className="flex justify-between gap-6 items-center">
          <div className="w-50% mx-auto space-y-2">
            <p className="text-xs text-gray-500">
              Category by <span className="font-medium">{categoryName}</span>
            </p>

            <h2 className="text-xl font-bold text-black">{blog.title}</h2>

            <p className="text-sm text-gray-600 px-1 py-1 max-w-[500px] text-justify line-clamp-2 overflow-hidden">
              {blog.content}
            </p>
            <Link href={`/blogs/${blog.id}`}>
              <Button label="See Detail" />
            </Link>
          </div>

          <div className="">
            <Image
              src={blog.imgUrl}
              alt="Post thumbnail"
              width={100}
              height={50}
              className="w-46 h-28 object-cover rounded-md"
            />
          </div>
        </div>
      </article>
    </>
  );
}
