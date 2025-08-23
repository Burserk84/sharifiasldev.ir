"use client";

import { Button } from "@/components/ui/Button";

// Define the props this component will accept
interface StoreSidebarProps {
  onSearch: (query: string) => void;
  onSortChange: (sortKey: string) => void;
}

export default function StoreSidebar({ onSearch, onSortChange }: StoreSidebarProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    onSearch(query);
  };

  return (
    <aside className="lg:col-span-3 space-y-8 text-right">
      {/* Search Card */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="font-bold text-white mb-4">جستجو در محصولات</h3>
        <form onSubmit={handleSearch}>
          <input 
            type="text"
            name="search"
            placeholder="نام محصول..." 
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </form>
      </div>

      {/* Sorting Card */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="font-bold text-white mb-4">مرتب‌سازی بر اساس</h3>
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="popularity:desc">محبوب‌ترین</option>
          <option value="publishedAt:desc">جدیدترین</option>
          <option value="price:asc">ارزان‌ترین</option>
          <option value="price:desc">گران‌ترین</option>
        </select>
      </div>

      {/* Contact Card */}
      <div className="bg-orange-400 p-6 rounded-lg text-gray-900">
        <h3 className="font-bold text-2xl">پروژه‌ای در ذهن دارید؟</h3>
        <p className="my-2">برای دریافت مشاوره رایگان و شروع پروژه بعدی خود با ما تماس بگیرید.</p>
        <Button href="/contact" variant="secondary" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white mt-4">
          تماس با ما
        </Button>
      </div>
    </aside>
  );
}