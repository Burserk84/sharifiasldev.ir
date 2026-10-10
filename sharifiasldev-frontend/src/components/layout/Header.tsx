import { getServerSession } from "next-auth";
import HeaderClient from "./HeaderClient";
import { getCategories, getNavItems } from "@/lib/api";
import type { Category, StrapiNavItem } from "@/lib/definitions";
import type { NavMenuItem, SubMenuItem } from "@/lib/data";

/**
 * A helper function that takes a flat list of categories from Strapi
 * and recursively builds a nested tree structure for the menu.
 */
const buildMenuTree = (
  categories: Category[],
  parentId: number | null = null,
  basePath: string = "/products"
): SubMenuItem[] => {
  const children = categories.filter((cat) => {
    const parent = cat.attributes.parent?.data;
    return (parent ? parent.id : null) === parentId;
  });

  if (children.length === 0) {
    return [];
  }

  return children.map((cat) => {
    const newPath = `${basePath}/${cat.attributes.slug}`;
    // Recursively call the function to find children of the current category
    const submenu = buildMenuTree(categories, cat.id, newPath);

    // Omit the submenu key entirely for leaf categories so no arrow/chevron
    // is rendered for items without children.
    return {
      title: cat.attributes.name,
      link: newPath,
      ...(submenu.length > 0 ? { submenu } : {}),
    };
  });
};

/**
 * Builds the navigation tree from the Strapi "Nav Item" collection.
 * - Items with `autoSubmenu: "categories"` get the product-category tree
 *   attached as their submenu (e.g. the shop item).
 * - Items nested under a parent item (via the `parent` relation in Strapi)
 *   become dropdown submenu entries, recursively.
 * - Items without any submenu render as plain links (no empty dropdown).
 */
const buildNavMenu = (
  items: StrapiNavItem[],
  categorySubmenu: SubMenuItem[],
  parentId: number | null = null
): SubMenuItem[] => {
  return items
    .filter((item) => (item.attributes.parent?.data?.id ?? null) === parentId)
    .map((item) => {
      const submenu =
        item.attributes.autoSubmenu === "categories"
          ? categorySubmenu
          : buildNavMenu(items, categorySubmenu, item.id);

      return {
        title: item.attributes.title,
        link: item.attributes.link,
        openInNewTab: item.attributes.openInNewTab,
        ...(submenu.length > 0 ? { submenu } : {}),
      };
    });
};

/**
 * Safety net: if Strapi is unreachable or has no nav items configured,
 * the site keeps rendering this hardcoded menu instead of an empty nav.
 */
const fallbackMenu: NavMenuItem[] = [
  { title: "خانه", link: "/" },
  { title: "فروشگاه", link: "/products" },
  { title: "بلاگ", link: "/blog" },
  { title: "نمونه کارها", link: "/portfolio" },
  { title: "خدمات", link: "https://devorastudio.ir" },
  { title: "درباره من", link: "/about" },
  { title: "تماس با من", link: "/contact" },
];

export default async function Header() {
  const [session, allCategories, navItems] = await Promise.all([
    getServerSession(),
    getCategories(),
    getNavItems(),
  ]);

  // Build the nested submenu for the store from product categories
  const categorySubmenu = buildMenuTree(allCategories, null);

  // Menu comes from Strapi; fall back to the static list if empty/unavailable
  const menu: SubMenuItem[] =
    navItems.length > 0
      ? buildNavMenu(navItems, categorySubmenu)
      : fallbackMenu;

  return <HeaderClient session={session} menu={menu} />;
}
