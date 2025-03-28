// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Agrega id como propiedad
    } & DefaultSession["user"];
  }

  interface User {
    id: string; // Asegúrate de que authorize devuelva esto
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; // Agrega id al token
  }
}
