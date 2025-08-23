import { getProductsByCategory } from "@/lib/api";
import ProductList from "@/components/products/ProductList"; // Import the interactive list
import { Metadata } from "next";

interface ProductCategoryPageProps {
  params: { slug: string[] };
}

export async function generateMetadata({
  params,
}: ProductCategoryPageProps): Promise<Metadata> {
  const { slug } = params;
  const categoryName = slug[slug.length - 1].replace(/-/g, " ");
  return {
    title: `${categoryName} | فروشگاه`,
  };
}

export default async function ProductCategoryPage({
  params,
}: ProductCategoryPageProps) {
  const { slug } = params;
  const currentCategorySlug = slug[slug.length - 1];

  const initialProducts = await getProductsByCategory(currentCategorySlug);
  const categoryName = currentCategorySlug.replace(/-/g, " ");

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-white capitalize">
          {categoryName}
        </h1>
      </div>

      <ProductList
        initialProducts={initialProducts}
        categorySlug={currentCategorySlug}
      />
    </div>
  );
}
