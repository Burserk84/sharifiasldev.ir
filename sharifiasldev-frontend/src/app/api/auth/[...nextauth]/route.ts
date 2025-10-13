import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function verifyTurnstile(token?: string, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) return false;
  const form = new URLSearchParams();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  const resp = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: form,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
  const data = (await resp.json()) as { success: boolean };
  return !!data.success;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
        captcha: { label: "Captcha", type: "text" }, // ⬅️ اضافه شد
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        // ✅ کپچا را قبل از تماس Strapi چک کن
        const ip = req?.headers?.["x-forwarded-for"] as string | undefined;
        const ok = await verifyTurnstile(
          credentials.captcha as string | undefined,
          ip?.split(",")[0]?.trim()
        );
        if (!ok) {
          // با null خطای CredentialsSignin می‌دهد و به /login برمی‌گردد
          return null;
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                identifier: credentials.identifier,
                password: credentials.password,
              }),
            }
          );
          const data = await res.json();
          if (data.user && data.jwt) return { ...data.user, jwt: data.jwt };
          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  pages: { signIn: "/login", error: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = (user as unknown).jwt;
        try {
          const profileRes = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate=profilePicture,coverImage`,
            { headers: { Authorization: `Bearer ${(user as unknown).jwt}` } }
          );
          const p = await profileRes.json();
          token.id = p.id;
          token.username = p.username;
          token.email = p.email;
          token.firstName = p.firstName;
          token.lastName = p.lastName;
          token.profilePicture = p.profilePicture;
          token.coverImage = p.coverImage;
        } catch (e) {
          console.error("JWT Callback Error:", e);
          return { ...token, error: "FetchError" };
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        (session.user as unknown).firstName = token.firstName;
        (session.user as unknown).lastName = token.lastName;
        (session.user as unknown).profilePicture = token.profilePicture;
        (session.user as unknown).coverImage = token.coverImage;
      }
      (session as unknown).jwt = (token as unknown).jwt;
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
