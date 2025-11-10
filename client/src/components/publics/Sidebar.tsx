import Category from "./Category";
import SearchInput from "./Search";

export default function Sidebar() {
  return (
    <aside className="w-full lg:w-72 lg:sticky top-24 self-start space-y-4 lg:pl-10">
      <SearchInput />
      <Category />
    </aside>
  );
}
