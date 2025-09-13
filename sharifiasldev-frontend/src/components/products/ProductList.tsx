"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import StoreSidebar from "@/components/products/StoreSidebar";
import type { Product } from "@/lib/definitions";

interface ProductListProps {
  initialProducts: Product[];
  categorySlug?: string;
}

export default function ProductList({
  initialProducts,
  categorySlug,
}: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity:desc");

  useEffect(() => {
    // We don't want to re-fetch for the initial render
    if (searchTerm === "" && sortBy === "popularity:desc") {
      setProducts(initialProducts);
      return;
    }

    const fetchProducts = async () => {
      setIsLoading(true);

      // Build the query parameters correctly
      const queryParams = new URLSearchParams({ sort: sortBy });
      if (searchTerm) queryParams.append("_q", searchTerm);

      // Use the correct filter format for the category slug
      if (categorySlug) {
        queryParams.append("filters[category][slug][$eq]", categorySlug);
      }

      try {
        // Fetch from our API route. Now it will pass the correct filter.
        const res = await fetch(`/api/products?${queryParams.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [searchTerm, sortBy, categorySlug, initialProducts]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <main className="lg:col-span-9">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <div className="flex items-center gap-x-3">
              {/* Three pulsing dots for the animation */}
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
              <div
                className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"
                style={{ animationDelay: "200ms" }} // Stagger the animation
              ></div>
              <div
                className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"
                style={{ animationDelay: "400ms" }} // Stagger the animation
              ></div>
            </div>
            <p className="mt-4 text-gray-400">...در حال بارگذاری</p>
            {/* This text is hidden visually but read by screen readers for accessibility */}
            <span className="sr-only">Loading...</span>
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p>هیچ محصولی مطابق با فیلتر شما یافت نشد.</p>
        )}
      </main>

      <StoreSidebar onSearch={setSearchTerm} onSortChange={setSortBy} />
    </div>
  );
}
