import { getServerSession } from "next-auth";
import HeaderClient from "./HeaderClient";
import { getCategories } from "@/lib/api";
import type { Category } from "@/lib/definitions";

/**
 * A helper function that takes a flat list of categories from Strapi
 * and recursively builds a nested tree structure for the menu.
 */
const buildMenuTree = (
  categories: Category[],
  parentId: number | null = null,
  basePath: string = "/products"
): unknown[] => {
  const children = categories.filter((cat) => {
    const parent = cat.attributes.parent?.data;
    return (parent ? parent.id : null) === parentId;
  });

  if (children.length === 0) {
    return [];
  }

  return children.map((cat) => {
    const newPath = `${basePath}/${cat.attributes.slug}`;
    return {
      title: cat.attributes.name,
      link: newPath,
      // Recursively call the function to find children of the current category
      submenu: buildMenuTree(categories, cat.id, newPath),
    };
  });
};

export default async function Header() {
  const session = await getServerSession();
  const allCategories = await getCategories();

  // Build the nested submenu for the store
  const storeSubmenu = buildMenuTree(allCategories, null);

  // This is the static part of your menu
  const staticMenu = [
    { title: "بلاگ", link: "/blog" },
    { title: "نمونه کارها", link: "/portfolio" },
    { title: "خدمات", link: "https://devorastudio.ir" },
    { title: "درباره من", link: "/about" },
    { title: "تماس با من", link: "/contact" },
  ];

  const menu = [
    { title: "خانه", link: "/" },
    {
      title: "فروشگاه",
      link: "/products",
      submenu: storeSubmenu,
    },
    ...staticMenu,
  ];

  return <HeaderClient session={session} menu={menu} />;
}
