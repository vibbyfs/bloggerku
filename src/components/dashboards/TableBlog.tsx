import { BlogType } from "@/app/services/blog";
import { formatDate } from "@/utils/formatDate";
import { FilePenLine, ImageUp, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CategoriesType } from "@/app/services/categories";
import Button from "../commons/Button";

type Props = {
  blogs: BlogType[];
  categories: CategoriesType[];
  onDelete: (id: string) => void;
};

export default function TableBlog({ blogs, categories, onDelete }: Props) {
  return (
    <div className="relative bg-white rounded-md shadow-md max-h-[90vh] overflow-x-auto max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold p-5">Blog Table</h1>
        <Link href="/dashboard/add-blog">
          <Button label="New Blog" />
        </Link>
      </div>
      <table className="min-w-full text-sm text-left text-gray-700 px-4">
        <thead className="bg-black text-white uppercase text-xs sticky top-0 z-10">
          <tr>
            <th className="px-5 py-5 border-b">No</th>
            <th className="px-1 py-5 border-b w-[60px]">Image</th>
            <th className="px-1 py-5 border-b min-w-[140px]">Title</th>
            <th className="px-1 py-5 border-b min-w-[180px]">Content</th>
            <th className="px-1 py-5 border-b min-w-[100px]">Category</th>
            <th className="px-1 py-5 border-b min-w-[140px]">Created At</th>
            <th className="px-1 py-5 border-b min-w-[120px] text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, i) => {
            const category = categories.find((c) => c.id === blog.categoryId);
            return (
              <tr
                key={blog.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-5 py-2">{1 + i}</td>
                <td className="px-2 py-2">
                  {blog.imgUrl ? (
                    <div className="w-24 h-16 relative">
                      <Image
                        src={blog.imgUrl}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 640px) 96px, 96px"
                        className="object-cover rounded"
                      />
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500">No image</span>
                  )}
                </td>
                <td className="px-2 py-2 font-semibold">{blog.title}</td>
                <td className="px-2 py-1 max-w-[400px] line-clamp-2 text-justify text-sm">
                  {blog.content}
                </td>
                <td className="px-2 py-2">{category?.name ?? "Unknown"}</td>
                <td className="px-2 py-2">{formatDate(blog.createdAt)}</td>
                <td className="px-2 py-2">
                  <div className="flex justify-center gap-1">
                    <Link href={`/dashboard/${blog.id}/edit-blog`}>
                      <Button>
                        <FilePenLine size={17} />
                      </Button>
                    </Link>
                    <Link href={`/dashboard/upload-image/${blog.id}`}>
                      <Button>
                        <ImageUp size={17} />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => onDelete(blog.id)}
                      className="hover:bg-rose-600"
                    >
                      <Trash2 size={17} />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
