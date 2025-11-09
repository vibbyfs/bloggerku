"use client";

import { getSavedToken, setAuthToken } from "@/app/services/auth";
import getCategories, { CategoriesType } from "@/app/services/categories";
import TableCategories from "@/components/dashboards/TableCategories";
import { useEffect, useState } from "react";

export default function Categories() {
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

  return <TableCategories categories={categories} />;
}
