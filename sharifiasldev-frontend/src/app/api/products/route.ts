import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get("sort") || "popularity:desc";
    const searchTerm = searchParams.get("_q") || "";
    const categorySlug = searchParams.get("category");

    const STRAPI_URL =
      process.env.NEXT_PUBLIC_STRAPI_URL ||
      "process.env.NEXT_PUBLIC_STRAPI_URL";

    // Build the query parameters for Strapi
    const queryParams = new URLSearchParams({
      populate: "*",
      sort: sortBy,
    });

    if (searchTerm) {
      queryParams.append("_q", searchTerm);
    }

    // Add category filter if it exists
    if (categorySlug) {
      queryParams.append("filters[category][slug][$eq]", categorySlug);
    }

    const res = await fetch(
      `${STRAPI_URL}/api/products?${queryParams.toString()}`
    );
    if (!res.ok) throw new Error("Failed to fetch products from Strapi");

    const responseJson = await res.json();
    return NextResponse.json(responseJson.data);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
