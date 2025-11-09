import { FilePenLine, Trash2 } from "lucide-react";
import Link from "next/link";
import Button from "../commons/Button";
import { CategoriesType } from "@/app/services/categories";
import { formatDate } from "@/utils/formatDate";

type Props = {
  categories: CategoriesType[];
};

export default function TableCategories({ categories }: Props) {
  return (
    <div className="relative bg-white rounded-md shadow-md max-h-[90vh] overflow-x-auto max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold p-5">Blog Table</h1>
        <Link href="/dashboard/add-category">
          <Button label="New Categories" />
        </Link>
      </div>
      <table className="min-w-full text-sm text-left text-gray-700 px-4">
        <thead className="bg-black text-white uppercase text-xs sticky top-0 z-10">
          <tr>
            <th className="px-5 py-5 border-b">No</th>
            <th className="px-1 py-5 border-b w-[100px]">Name</th>
            <th className="px-1 py-5 border-b min-w-[140px]">Created At</th>
            <th className="px-1 py-5 border-b min-w-[100px]">Updated At</th>
            <th className="px-1 py-5 border-b min-w-[120px] text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c, i) => (
            <tr
              key={c.id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="px-5 py-2">{i + 1}</td>
              <td className="px-2 py-2 font-semibold">{c.name}</td>
              <td className="px-2 py-2">{formatDate(c.createdAt)}</td>
              <td className="px-2 py-2">{formatDate(c.updatedAt)}</td>
              <td className="px-2 py-2">
                <div className="flex justify-center gap-1">
                  <Link href={`/dashboard/edit-blog`}>
                    <Button>
                      <FilePenLine size={17} />
                    </Button>
                  </Link>
                  <Button className="hover:bg-rose-600">
                    <Trash2 size={17} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
