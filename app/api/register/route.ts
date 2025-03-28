import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/user";

// Esquema de validación para el registro
const registerSchema = z.object({
  email: z.string().email("Debe ser un correo válido"),
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" })
  .max(50, { message: "El nombre no puede exceder los 50 caracteres" })
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/, { message: "El nombre solo puede contener letras, sin espacios ni números" }),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});


// 📌 POST: Crear un nuevo usuario
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, password } = registerSchema.parse(body);

    await connectToDatabase();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: "El usuario ya existe" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      name,
      password: hashedPassword,
    });
    const result = await user.save();

    return NextResponse.json(
      { message: "Usuario creado", id: result._id.toString() },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    }
    console.error("❌ Error registrando usuario:", error);
    return NextResponse.json({ message: "Error en el servidor", error }, { status: 500 });
  }
}

// 📌 GET: Placeholder para obtener usuarios (no implementado)
export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json({ message: "GET no implementado aún" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error en GET:", error);
    return NextResponse.json({ message: "Error en el servidor", error }, { status: 500 });
  }
}
