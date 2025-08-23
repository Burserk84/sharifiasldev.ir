"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchCard() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${query}`);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg text-right">
      <h3 className="font-bold text-white mb-4">جستجو در مقالات</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجو..."
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </form>
    </div>
  );
}
