import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/user";

// Esquema de validación con zod
const authSchema = z.object({
  email: z.string().email("Debe ser un correo válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        // Validar que las credenciales existen
        if (!credentials) {
          throw new Error("No se proporcionaron credenciales");
        }

        const parsedCredentials = authSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          throw new Error(parsedCredentials.error.errors[0].message);
        }

        const { email, password } = parsedCredentials.data;

        await connectToDatabase();
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Usuario no encontrado");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Contraseña incorrecta");
        }

        // Devolver objeto con las propiedades requeridas por NextAuth
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name // Opcional, si tienes este campo
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Opcional: página personalizada de login
  },
}

// Handler para manejar tanto GET como POST
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
