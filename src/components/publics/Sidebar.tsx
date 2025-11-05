import Banner from "./Banner";
import FilterCategory from "./FilteCategory";
import SearchInput from "./Search";
import SortBy from "./SortBy";

export default function Sidebar() {
  return (
    <aside className="w-full lg:w-72 lg:sticky top-24 self-start space-y-8 lg:pl-10">
      <SearchInput />
      <FilterCategory />
      <SortBy />
      <Banner />
    </aside>
  );
}
