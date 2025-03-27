'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { FormEvent } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

    const router = useRouter()

    const loginFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault() // Evita el comportamiento por defecto del formulario
        // Aquí puedes agregar tu lógica de validación si la necesitas
        router.push('/inicio')
    }
  return (
    <form 
    onSubmit={loginFunction}
    className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Iniciar sesión</h1>
        <p className="text-muted-foreground text-sm text-balance">
        Ingrese su correo para iniciar sesión
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
            Olvide mi contraseña
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="hover:cursor-pointer w-full">
          Iniciar sesión
        </Button>
      </div>
      <div className="text-center text-sm">
      ¿No tiene cuenta?
        <a href="#" className="ml-3 underline underline-offset-4">
          Registrarse
        </a>
      </div>
    </form>
  )
}
