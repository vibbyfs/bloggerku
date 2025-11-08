export default function FilterCategory() {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Filter by Category:
      </h3>

      <select
        defaultValue=""
        className="border rounded-full px-4 py-2 text-sm text-gray-800"
      >
        <option value="">All Categories</option>
        <option></option>
      </select>
    </div>
  );
}
