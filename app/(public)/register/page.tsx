'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Debe ser un correo válido"),
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" })
  .max(50, { message: "El nombre no puede exceder los 50 caracteres" })
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/, { message: "El nombre solo puede contener letras, sin espacios ni números" }),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

type RegisterForm = z.infer<typeof registerSchema>;
type ResponseData = { message: string; id?: string };

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterForm>({ email: "", name: "", password: "" });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      registerSchema.parse(form);

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: ResponseData = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar el usuario");
      }

      setSuccess("¡Usuario registrado con éxito! Rediriendo a login");
      setForm({ email: "", name:"", password: "" });
        
      setTimeout(() => {
          router.push("/login")
      }, 2500)

    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            Registrarse
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Registrarse</h1>
        <p className="text-muted-foreground text-sm text-balance">
        Ingrese sus datos para registrarse
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input 
                type="email"
                id="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="tu@email.com"
            / >
        </div>
        <div className="grid gap-3">
            <Label htmlFor="password">Nombre</Label>
            <Input
                id="name"
                type="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Mínimo 2 caracteres"
            / >
        </div>
        <div className="grid gap-3">
            <Label htmlFor="password">Contraseña</Label>
            <Input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                placeholder="Mínimo 8 caracteres"
            / >
        </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <Button type="submit" className="hover:cursor-pointer w-full">
                Registrar
            </Button>
        </div>
        </form>

          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
