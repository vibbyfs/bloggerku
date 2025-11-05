export default function Banner() {
  return (
    <div>
      <div className="p-4 bg-gray-100 rounded-lg hidden sm:block">
        <h2 className="text-md font-semibold mb-2">
          Writing for our community
        </h2>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>
            <a href="#" className="hover:underline">
              New writer FAQ
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Expert writing advice
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Grow your readership
            </a>
          </li>
        </ul>
        <button className="mt-5 py-2 text-base">Start writing</button>
      </div>
      <div>
        <h3 className="text-md font-semibold mb-2 mt-5">Recommended topics</h3>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="bg-gray-200 px-3 py-1 rounded-full">Travel</span>
          <span className="bg-gray-200 px-3 py-1 rounded-full">Technology</span>
          <span className="bg-gray-200 px-3 py-1 rounded-full">Culinary</span>
          <span className="bg-gray-200 px-3 py-1 rounded-full">Education</span>
          <span className="bg-gray-200 px-3 py-1 rounded-full">Lifestyle</span>
        </div>
        <a
          href="#"
          className="mt-5 inline-block text-sm text-gray-600 hover:underline"
        >
          See more topics
        </a>
      </div>
    </div>
  );
}
