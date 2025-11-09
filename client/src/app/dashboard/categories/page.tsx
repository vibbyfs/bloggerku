"use client";

import { getSavedToken, setAuthToken } from "@/app/services/auth";
import {
  CategoriesType,
  deleteCategory,
  getCategories,
} from "@/app/services/categories";
import TableCategories from "@/components/dashboards/TableCategories";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Categories() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoriesType[]>([]);

  useEffect(() => {
    async function fetchCatgories() {
      const token = getSavedToken();
      if (token) setAuthToken(token);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.log("ERROR FETCH CATEGORIES", err);
      }
    }

    fetchCatgories();
  }, []);

  async function handleSubmit(id: number | string) {
    try {
      await deleteCategory(id);

      const remainingCategory = categories.filter((c) => c.id !== id);
      setCategories(remainingCategory);

      router.push("/dashboard/categories");
    } catch (err) {
      console.log("ERROR HANDLE DELETE CATEGORY", err);
    }
  }

  return <TableCategories categories={categories} onDelete={handleSubmit} />;
}
