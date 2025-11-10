"use client";
import { CategoriesType } from "@/app/services/categories";

type Props = {
  categories: CategoriesType[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
};

export default function FilterByCategory({
  categories,
  selectedId,
  onSelect,
}: Props) {
  return (
    <div>
      <div>
        <h3 className="text-md font-semibold mb-2 mt-5">Category topics:</h3>
        <div className="flex flex-wrap gap-2 text-sm">
          {/* All */}
          <button
            type="button"
            onClick={() => onSelect(null)}
            className={`${
              selectedId === null
                ? "bg-gray-900 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            } px-3 py-1 rounded-full cursor-pointer`}
          >
            All
          </button>
          {categories.map((c) => {
            const isActive = selectedId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelect(c.id)}
                className={`${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                } px-3 py-1 rounded-full cursor-pointer`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
