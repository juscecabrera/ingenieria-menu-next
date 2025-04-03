import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/user";

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
        if (!credentials) throw new Error("No se proporcionaron credenciales");

        const parsedCredentials = authSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          throw new Error(parsedCredentials.error.errors[0].message);
        }

        const { email, password } = parsedCredentials.data;

        await connectToDatabase();
        const user = await User.findOne({ email });

        if (!user) throw new Error("Usuario no encontrado");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Contraseña incorrecta");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name || "",
          image: user.image || "",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Cuando el usuario se autentica inicialmente
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      // Actualizar el token con datos frescos de la DB si es necesario
      await connectToDatabase();
      const dbUser = await User.findById(token.id);
      if (dbUser) {
        token.name = dbUser.name || "";
        token.email = dbUser.email;
        token.image = dbUser.image || "";
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
