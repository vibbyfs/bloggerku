"use client";

import BlogCard from "@/components/publics/BlogCard";
import { BlogType, getPublicBlog } from "./services/blog";
import { useEffect, useState } from "react";
import SearchInput from "@/components/publics/Search";
import { CategoriesType, getPublicCategories } from "./services/categories";
import FilterByCategory from "@/components/publics/FilterByCategory";

export default function Dashboard() {
  const [blogs, setBlog] = useState<BlogType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(true);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoadingBlogs(true);
        const data = await getPublicBlog(searchTerm);
        setBlog(data);
      } catch (err) {
        console.log("Error fetching data", err);
      } finally {
        setLoadingBlogs(false);
      }
    }

    async function fetchCategory() {
      try {
        setLoadingCategories(true);
        const data = await getPublicCategories();
        setCategories(data);
      } catch (err) {
        console.log("ERROR FETHCING CATEGORY", err);
      } finally {
        setLoadingCategories(false);
      }
    }

    fetchCategory();
    fetchBlog();
  }, [searchTerm]);

  function handleSearch(term: string) {
    setSearchTerm(term);
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 flex flex-col-reverse sm:flex-row gap-6">
        <div className="w-full sm:flex-1 min-w-0">
          {loadingBlogs && (
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          )}
          {!loadingBlogs &&
            blogs.map((blog) => {
              const categoryName =
                categories.find((c) => c.id === Number(blog.categoryId))
                  ?.name ?? "Unknown Category";
              return (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  categoryName={categoryName}
                />
              );
            })}
        </div>
        <div className="sm:w-64 sm:shrink-0 sm:sticky sm:top-4">
          {loadingBlogs || loadingCategories ? (
            <div className="space-y-4">
              <div className="h-9 bg-gray-200 rounded animate-pulse" />
              <div>
                <div className="h-5 w-40 bg-gray-200 rounded mb-3 animate-pulse" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-7 w-20 bg-gray-200 rounded-full animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <SearchInput onSearch={handleSearch} />
              <FilterByCategory />
            </>
          )}
        </div>
      </div>
    </>
  );
}
