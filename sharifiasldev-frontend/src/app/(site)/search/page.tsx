import { searchContent } from "@/lib/api";
import Link from "next/link";

// A helper function to determine the correct link for each result type
const getLinkHref = (item: unknown): string => {
  switch (item.type) {
    case "blog":
      return `/blog/${item.slug || item.id}`;
    case "product":
      return `/product/${item.slug || item.id}`;
    case "portfolio":
      return `/portfolio/${item.slug || item.id}`;
    default:
      return "/";
  }
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  // FIX 1: Apply the same workaround for the strange 'await' error
  const awaitedSearchParams = await searchParams;
  const query = awaitedSearchParams.q || "";
  const results = await searchContent(query);

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">
        نتایج جستجو برای: <span className="text-orange-400">{query}</span>
      </h1>

      {results.length > 0 ? (
        <ul className="space-y-6">
          {results.map((item) => (
            // FIX 2: Create a truly unique key by combining the type and id
            <li key={`${item.type}-${item.id}`}>
              <Link
                href={getLinkHref(item)}
                className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-orange-400">
                    {item.title || item.name}
                  </h2>
                  <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full capitalize">
                    {item.type}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-400">
          هیچ نتیجه‌ای برای جستجوی شما یافت نشد.
        </p>
      )}
    </div>
  );
}
