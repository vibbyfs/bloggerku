export default function SortBy() {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Sort by:</h3>
      <div className="flex flex-col space-y-2 text-sm text-gray-800">
        <button className="text-left hover:underline">Newest</button>
        <button className="text-left hover:underline">Oldest</button>
      </div>
    </div>
  );
}
