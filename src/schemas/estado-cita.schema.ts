import { z } from "zod";

export const estadoCitaSchema = z.object({
  estado: z.enum(["COMPLETADA", "CANCELADA"]),
});