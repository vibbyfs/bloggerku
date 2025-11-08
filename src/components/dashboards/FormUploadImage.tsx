"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../commons/Button";
import { uploadImage } from "@/app/services/blog";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function FormUploadImage() {
  const { id } = useParams();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const preview = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file]
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      if (!file) return;
      await uploadImage(id as string, file);

      router.push("/dashboard");
    } catch (err) {
      const anyErr = err as any;
      console.log("ERROR UPLOAD IMAGE", anyErr);
      console.log("SERVER RESPONSE", anyErr?.response?.data);
    }
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <main className="w-full max-w-5xl p-8">
        <div className="bg-white border border-gray-300 shadow-md rounded-xl ml-20 p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="w-100 h-64 flex justify-center items-center overflow-hidden border rounded-lg bg-gray-100 shadow">
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                width={500}
                height={300}
                unoptimized
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-xs text-gray-500">No Preview Image</span>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-center mb-6">
              Change Your Image
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image
                </label>
                <input
                  type="file"
                  name="coverImage"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="form-input w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
                />
              </div>
              <Button label="Upload Image" type="submit" className="w-full" />
            </form>

            <div className="mt-4">
              <Link href="/dashboard">
                <Button label="Back" className="w-full" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
