export default function FilterByCategory() {
  return (
    <div>
      <div>
        <h3 className="text-md font-semibold mb-2 mt-5">Category topics:</h3>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="bg-gray-200 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-300">
            Travel
          </span>
          <span className="bg-gray-200 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-300">
            Technology
          </span>
          <span className="bg-gray-200 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-300">
            Culinary
          </span>
          <span className="bg-gray-200 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-300">
            Education
          </span>
          <span className="bg-gray-200 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-300">
            Lifestyle
          </span>
        </div>
      </div>
    </div>
  );
}
