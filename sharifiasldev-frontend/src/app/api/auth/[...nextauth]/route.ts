import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
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
          // If Strapi returns a user and JWT, the login is successful
          if (data.user && data.jwt) {
            return { ...data.user, jwt: data.jwt };
          }
          // If Strapi returns an error or no user, return null to trigger the error flow
          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          // In case of a network error, also return null
          return null;
        }
      },
    }),
  ],
  // ✨ ADD THIS PAGES OBJECT ✨
  pages: {
    signIn: "/login", // Tell NextAuth this is your custom login page
    error: "/login", // On error, redirect back to the login page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = user.jwt;
        try {
          const profileRes = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate=profilePicture,coverImage`,
            {
              headers: { Authorization: `Bearer ${user.jwt}` },
            }
          );
          const profileData = await profileRes.json();
          token.id = profileData.id;
          token.username = profileData.username;
          token.email = profileData.email;
          token.firstName = profileData.firstName;
          token.lastName = profileData.lastName;
          token.profilePicture = profileData.profilePicture;
          token.coverImage = profileData.coverImage;
        } catch (error) {
          console.error("JWT Callback Error:", error);
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
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.profilePicture = token.profilePicture;
        session.user.coverImage = token.coverImage;
      }
      session.jwt = token.jwt;
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
