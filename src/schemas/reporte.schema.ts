import { z } from "zod";

export const fechaReporteSchema = z.object({
  fecha: z.coerce.date({
    message: "La fecha no es válida",
  }),
});