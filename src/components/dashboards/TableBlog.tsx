import { FilePenLine, ImageUp, Trash2 } from "lucide-react";
import Link from "next/link";

export default function TableBlog() {
  return (
    <div className="relative bg-white rounded-md shadow-md max-h-[80vh] overflow-x-auto max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold p-5">Blog Table</h1>
      <table className="min-w-full text-sm text-left text-gray-700 px-4">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs sticky top-0 z-10">
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
          <tr className="border-b hover:bg-gray-50 transition-colors">
            <td className="px-5 py-2"></td>
            <td className="px-2 py-2"></td>
            <td className="px-2 py-2 font-semibold"></td>
            <td className="px-2 py-1 max-w-[400px] line-clamp-2 text-justify text-sm"></td>
            <td className="px-2 py-2"></td>
            <td className="px-2 py-2"></td>
            <td className="px-2 py-2">
              <div className="flex justify-center gap-1">
                <Link href={`/posts/edit`}>
                  <button>
                    <FilePenLine size={17} />
                  </button>
                </Link>
                <Link href={`/posts/upload-image`}>
                  <button>
                    <ImageUp size={17} />
                  </button>
                </Link>
                <button>
                  <Trash2 size={17} />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
