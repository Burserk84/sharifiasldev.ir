import "next-auth";
import "next-auth/jwt";
import { StrapiImage } from "@/lib/definitions";

declare module "next-auth" {
  interface User {
    id: number;
    username: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    profilePicture?: StrapiImage | null;
    coverImage?: StrapiImage | null;
    jwt: string;
  }
  interface Session {
    user: {
      id: number;
      username: string;
      email: string;
      firstName?: string | null;
      lastName?: string | null;
      profilePicture?: StrapiImage | null;
      coverImage?: StrapiImage | null;
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
    profilePicture?: StrapiImage | null;
    coverImage?: StrapiImage | null;
    jwt: string;
  }
}
