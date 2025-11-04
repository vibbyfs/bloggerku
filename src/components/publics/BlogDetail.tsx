import Image from "next/image";

export default function BlogDetail() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-12 dark:bg-zinc-900 dark:text-white">
        <button className="py-3 px-2 bg-gray-600 text-white dark:bg-blue-950"></button>
        <div className="mb-8">
          <Image
            src="empy"
            alt="empty"
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />
        </div>

        <div className="text-sm text-gray-500 mb-2 dark:text-white">
          <span>
            <span className="font-medium text-gray-800 dark:text-white">
              Post at
            </span>
          </span>
          <span className="mx-2">•</span>
          <span></span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 dark:text-white"></h1>
      </div>
    </>
  );
}
