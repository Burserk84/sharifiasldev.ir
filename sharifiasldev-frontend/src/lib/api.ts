import type { Category, PortfolioItem, Product, Post } from "./definitions";

/**
 * @file src/lib/api.ts
 * @description This file contains all functions for fetching data from the Strapi API.
 *
 * IMPORTANT: Two environment variables are used:
 * - STRAPI_URL (server-only): Points to local Strapi (http://127.0.0.1:1337)
 *   Used during SSR to avoid the Cloudflare/Nginx roundtrip (death loop).
 * - NEXT_PUBLIC_STRAPI_URL (public): Points to the public URL (https://api.sharifiasldev.ir)
 *   Used in the browser for client-side requests.
 */

function getStrapiURL(): string {
  // Server-side: prefer the internal/local URL to avoid the DNS/Cloudflare roundtrip
  if (typeof window === "undefined") {
    return process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";
  }
  // Client-side: must use the public URL
  return process.env.NEXT_PUBLIC_STRAPI_URL || "https://api.sharifiasldev.ir";
}

/**
 * Returns the public Strapi URL (for image URLs rendered in HTML, etc.)
 * This should always be the external URL since browsers need to reach it.
 */
export function getPublicStrapiURL(): string {
  return process.env.NEXT_PUBLIC_STRAPI_URL || "https://api.sharifiasldev.ir";
}

/**
 * A generic helper function to fetch data from the Strapi API.
 * It centralizes the URL, caching, and error handling.
 * @param {string} path The API path to fetch (e.g., '/posts')
 * @param {RequestInit} options Custom options for the fetch request
 * @returns {Promise<unknown>} The JSON response from the API.
 */
async function fetchAPI(path: string, options: RequestInit = {}) {
  const baseUrl = getStrapiURL();
  const url = `${baseUrl}/api${path}`;

  try {
    const defaultOptions: RequestInit = {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    };
    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };
    const res = await fetch(url, mergedOptions);

    if (!res.ok) {
      console.error(
        `Failed to fetch from ${url}: ${res.status} ${res.statusText}`
      );
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error(`Error in fetchAPI (${url}):`, error);
    return null;
  }
}

/**
 * Fetches all portfolio items.
 */
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const response = await fetchAPI("/portfolios?populate=*");
  return response?.data || [];
}

/**
 * Fetches all products.
 */
export async function getProducts(): Promise<Product[]> {
  const response = await fetchAPI("/products?populate=*");
  return response?.data || [];
}

/**
 * Fetches all posts.
 */
export async function getPosts(): Promise<Post[]> {
  const response = await fetchAPI("/posts?populate=*");
  return response?.data || [];
}

/**
 * Fetches all product categories.
 */
export async function getCategories(): Promise<Category[]> {
  const response = await fetchAPI("/categories?populate=parent");
  return response?.data || [];
}

/**
 * Searches across multiple content types (Posts, Products, Portfolio) in Strapi.
 * @param {string} query The user's search term.
 * @returns {Promise<unknown[]>} A combined array of results.
 */
export async function searchContent(query: string): Promise<unknown[]> {
  if (!query) return [];

  const baseUrl = getStrapiURL();

  const endpoints = [
    `/api/posts?filters[title][$containsi]=${query}&populate=*`,
    `/api/products?filters[name][$containsi]=${query}&populate=*`,
    `/api/portfolios?filters[title][$containsi]=${query}&populate=*`,
  ];

  try {
    const responses = await Promise.all(
      endpoints.map((endpoint) => fetch(`${baseUrl}${endpoint}`))
    );

    const data = await Promise.all(responses.map((res) => res.json()));

    const posts = (data[0]?.data || []).map((item: any) => ({
      ...item.attributes,
      type: "blog",
      id: item.id,
    }));
    const products = (data[1]?.data || []).map((item: any) => ({
      ...item.attributes,
      type: "product",
      id: item.id,
    }));
    const portfolios = (data[2]?.data || []).map((item: any) => ({
      ...item.attributes,
      type: "portfolio",
      id: item.id,
    }));

    return [...posts, ...products, ...portfolios];
  } catch (error) {
    console.error("Error in searchContent:", error);
    return [];
  }
}

/**
 * Fetches a single post by its slug.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const response = await fetchAPI(
    `/posts?filters[slug][$eq]=${slug}&populate=*`
  );
  return response?.data?.[0] || null;
}

/**
 * Fetches a single portfolio item by its slug.
 */
export async function getPortfolioItemBySlug(
  slug: string
): Promise<PortfolioItem | null> {
  const response = await fetchAPI(
    `/portfolios?filters[slug][$eq]=${slug}&populate=*`
  );
  return response?.data?.[0] || null;
}

/**
 * Fetches all products that belong to a specific category.
 */
export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  const response = await fetchAPI(
    `/products?populate=*&filters[categories][slug][$eq]=${categorySlug}`
  );
  return response?.data || [];
}

/**
 * Fetches a single product by its slug.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const response = await fetchAPI(
    `/products?filters[slug][$eq]=${slug}&populate=*`
  );
  return response?.data?.[0] || null;
}

/**
 * Fetches all orders for the logged-in user using their JWT.
 * @param {string} jwt The user's JSON Web Token.
 * @returns {Promise<any[]>} An array of the user's orders.
 */
export async function getUserOrders(jwt: string): Promise<unknown[]> {
  const baseUrl = getStrapiURL();

  const ordersRes = await fetch(`${baseUrl}/api/orders/me`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    cache: "no-store",
  });

  if (!ordersRes.ok) {
    console.error("Failed to fetch orders from Strapi /api/orders/me");
    return [];
  }

  const ordersData = await ordersRes.json();
  return ordersData.data;
}

/**
 * Fetches all tickets belonging to the currently authenticated user
 * by calling our custom Strapi endpoint.
 * @param {string} jwt The user's Strapi JWT.
 * @returns {Promise<any[]>} An array of the user's tickets.
 */
export async function getUserTickets(jwt: string): Promise<unknown[]> {
  const baseUrl = getStrapiURL();

  const res = await fetch(`${baseUrl}/api/tickets/me`, {
    headers: { Authorization: `Bearer ${jwt}` },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch user tickets from custom endpoint");
    return [];
  }
  const responseData = await res.json();
  console.log(responseData);
  return responseData.data;
}
