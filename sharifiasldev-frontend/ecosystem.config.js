module.exports = {
  apps: [{
    name: "sharifiasl-frontend",
    script: "node_modules/.bin/next",
    args: "start -p 3000",
    cwd: "/home/ceo/apps/sharifiasldev/sharifiasldev-frontend",
    env: {
      NODE_ENV: "production",
      STRAPI_URL: "http://127.0.0.1:1337",
      NEXT_PUBLIC_STRAPI_URL: "https://api.sharifiasldev.ir",
      NEXTAUTH_URL: "https://sharifiasldev.ir",
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: "0x4AAAAAAB6J3xeLabwKqEuB",
      TURNSTILE_SECRET_KEY: "0x4AAAAAAB6J3zPPTA1shZAucHSy-DYdQQg",
      NEXTAUTH_SECRET: "YpEcAsfh7Yvfq3PnVqng4CV0W0X8YJSCqp8WF044Vu9="
    }
  }]
}
