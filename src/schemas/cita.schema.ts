import { z } from "zod";

export const citaSchema = z.object({
  pacienteId: z.number().int().positive("El pacienteId debe ser positivo"),

  medicoId: z.number().int().positive("El medicoId debe ser positivo"),

  fechaHora: z.coerce.date().refine(
    (fecha) => fecha >= new Date(),
    {
      message: "La fecha de la cita no puede estar en el pasado",
    },
  ),

  motivoConsulta: z.string().optional(),
});