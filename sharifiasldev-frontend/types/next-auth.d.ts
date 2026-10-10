import "next-auth";
import "next-auth/jwt";

/** Slim media shape stored in the session cookie — only what the UI reads. */
interface SessionMedia {
  id: number;
  url: string;
  width?: number | null;
  height?: number | null;
}

declare module "next-auth" {
  interface User {
    id: number;
    username: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    profilePicture?: SessionMedia | null;
    coverImage?: SessionMedia | null;
    jwt: string;
  }
  interface Session {
    user: {
      id: number;
      username: string;
      email: string;
      firstName?: string | null;
      lastName?: string | null;
      profilePicture?: SessionMedia | null;
      coverImage?: SessionMedia | null;
    };
    jwt: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    username: string;
    firstName?: string | null;
    lastName?: string | null;
    profilePicture?: SessionMedia | null;
    coverImage?: SessionMedia | null;
    jwt: string;
  }
}
