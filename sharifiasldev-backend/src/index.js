'use strict';

/**
 * The default navigation items, seeded on first boot.
 * These mirror the menu that was previously hardcoded in the frontend,
 * so the site looks identical right after this ships.
 */
const DEFAULT_NAV_ITEMS = [
  { title: 'خانه', link: '/', order: 1, autoSubmenu: 'none' },
  { title: 'فروشگاه', link: '/products', order: 2, autoSubmenu: 'categories' },
  { title: 'بلاگ', link: '/blog', order: 3, autoSubmenu: 'none' },
  { title: 'نمونه کارها', link: '/portfolio', order: 4, autoSubmenu: 'none' },
  { title: 'خدمات', link: 'https://devorastudio.ir', order: 5, autoSubmenu: 'none' },
  { title: 'درباره من', link: '/about', order: 6, autoSubmenu: 'none' },
  { title: 'تماس با من', link: '/contact', order: 7, autoSubmenu: 'none' },
];

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap(/*{ strapi }*/) {
    // 1) Allow the Public (anonymous) role to read nav items from the REST API.
    try {
      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (publicRole) {
        const action = 'api::nav-item.nav-item.find';
        const existing = await strapi
          .query('plugin::users-permissions.permission')
          .findOne({ where: { action, role: publicRole.id } });

        if (!existing) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action,
              subject: 'nav-item',
              role: publicRole.id,
              conditions: [],
              properties: {},
            },
          });
          strapi.log.info('[nav-item] granted public read permission');
        }
      }
    } catch (error) {
      strapi.log.error('[nav-item] failed to grant public permission', error);
    }

    // 2) Seed the default menu once (only when the table is empty).
    try {
      const count = await strapi.query('api::nav-item.nav-item').count();
      if (count === 0) {
        for (const item of DEFAULT_NAV_ITEMS) {
          await strapi.query('api::nav-item.nav-item').create({
            data: {
              title: item.title,
              link: item.link,
              order: item.order,
              autoSubmenu: item.autoSubmenu,
              enabled: true,
              openInNewTab: false,
            },
          });
        }
        strapi.log.info(
          `[nav-item] seeded ${DEFAULT_NAV_ITEMS.length} default nav items`
        );
      }
    } catch (error) {
      strapi.log.error('[nav-item] failed to seed default nav items', error);
    }
  },
};
