import { getProducts } from "@/lib/api";
import ProductList from "@/components/products/ProductList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "فروشگاه | SharifiaslDev",
  description: "جدیدترین قالب‌ها و افزونه‌های وردپرس و وب.",
};

export default async function ProductsPage() {

  const initialProducts = await getProducts();

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-white">فروشگاه</h1>
        <p className="mt-4 text-lg text-gray-400">
          نگاهی به جدیدترین افزونه‌ها و قالب‌های ما بیندازید.
        </p>
      </div>

      {/* 2. Pass initial data to the client component */}
      <ProductList initialProducts={initialProducts} />
    </div>
  );
}