module.exports = {
  apps: [{
    name: "sharifiasl-frontend",
    script: "node_modules/.bin/next",
    args: "start -p 3000",
    cwd: "/root/projects/sharifiasldev.ir/sharifiasldev-frontend",
    env: {
      NODE_ENV: "production",
      // Secrets/URLs live in .env.local (single source of truth — Next.js
      // process.env would override it, so keep this block minimal).
    }
  }]
}
