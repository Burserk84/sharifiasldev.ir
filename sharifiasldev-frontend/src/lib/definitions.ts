/**
 * @file src/lib/definitions.ts
 * @description This file contains all TypeScript interfaces for data types from the Strapi API.
 * Having a single source of truth for types prevents errors and improves code readability.
 */

/**
 * The structure of an image object from Strapi's Media Library.
 */
export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    url: string;
    width: number;
    height: number;
    alternativeText?: string;
  };
}

/**
 * The structure of a block from Strapi's Rich Text editor.
 */
export interface DescriptionBlock {
  type: string;
  children: { type: string; text: string }[];
}

/**
 * A minimal interface for a User, often used in relations.
 */
export interface User {
  id: number;
  attributes: {
    username: string;
    email?: string; // Optional as it may not always be populated
  };
}

/**
 * The structure for a Category, including parent/child relations for nesting.
 */
export interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    parent: { data: Category | null };
    children: { data: Category[] | null };
  };
}

/**
 * The structure for a Product, including all custom fields and relations.
 */
export interface Product {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description: DescriptionBlock[] | null;
    price: number;
    productImage: { data: StrapiImage[] | null };
    downloadableFile?: { data: StrapiImage | null }; // Added for downloads
    isFeatured: boolean | null;
    popularity: number | null;
    details: { [key: string]: string } | null;
    gallery: { data: StrapiImage[] | null };
    categories: { data: Category[] | null };
    paymentLink: string | null;
  };
}

/**
 * The structure for a Blog Post.
 */
export interface Post {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    createdAt: string;
    coverImage: { data: StrapiImage | null };
  };
}

/**
 * The structure for a Portfolio Item.
 */
export interface PortfolioItem {
  id: number;
  attributes: {
    title: string;
    slug: string | null;
    technologies: string;
    coverImage: { data: StrapiImage | null };
    description: DescriptionBlock[] | null;
    liveUrl: string | null;
    gallery: { data: StrapiImage[] | null };
    features: { [key: string]: string } | null;
  };
}

/**
 * The structure for a Comment from the custom comment system.
 */
export interface Comment {
  id: number;
  attributes: {
    content: string;
    createdAt: string;
    author: { data: User | null }; // Using the shared User type
  };
}

// --- NEWLY ADDED TYPES ---

/**
 * The structure for a single message within a support ticket.
 */
export interface TicketMessage {
  id: number;
  message: string;
  isResponse: boolean;
  sentAt: string;
  author: { data: User | null };
}

/**
 * The structure for a support Ticket.
 */
export interface Ticket {
  id: number;
  attributes: {
    title: string;
    status: string;
    createdAt: string;
    messages: TicketMessage[];
  };
}

/**
 * The structure for a user's Order.
 */
export interface Order {
  id: number;
  attributes: {
    orderId: string;
    status: string;
    createdAt: string;
    user: { data: User | null };
    products: { data: Product[] };
  };
}
