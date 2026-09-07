import { z } from "zod";

export const pacienteSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellidos: z.string().min(1, "Los apellidos son obligatorios"),
  email: z.string().email("El email no es válido"),
  telefono: z.string().optional(),
  fechaNacimiento: z.coerce.date().refine(
    (fecha) => fecha <= new Date(),
    {
      message: "La fecha de nacimiento no puede ser futura",
    }
  ),
});