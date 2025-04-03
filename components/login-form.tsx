'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { z } from "zod";

// Esquema de validación con zod
const loginSchema = z.object({
  email: z.string().email("Debe ser un correo válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [form, setForm] = useState<LoginFormData>({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      // Valida los datos con zod
        setLoading(prev => true)
      loginSchema.parse(form);

      // Inicia sesión con NextAuth
      const result = await signIn("credentials", {
        redirect: false, // No redirige automáticamente, lo manejamos manualmente
        email: form.email,
        password: form.password,
      });

      if (result?.error) {
        setError(result.error); // Muestra el error devuelto por NextAuth
        setLoading(prev => false)
      } else {
        router.push("/inicio"); // Redirige al inicio tras un login exitoso
      }
    } catch (err) {
        setLoading(prev => false)
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message); // Errores de validación de zod
      } else {
        setError("Error al iniciar sesión"); // Error genérico
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Iniciar sesión</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Ingrese su correo para iniciar sesión
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Olvidé mi contraseña
            </a>
          </div>
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {loading 
          ? <div className="flex flex-row w-full items-center justify-center"><span className="loading loading-spinner loading-xl"></span></div>
          : <Button type="submit" className="hover:cursor-pointer w-full">Iniciar sesión</Button>
        }


      </div>
      <div className="text-center text-sm">
        ¿No tiene cuenta?
        <a href="/register" className="ml-3 underline underline-offset-4">
          Registrarse
        </a>
      </div>
    </form>
  );
}
