import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

const prisma = new PrismaClient({
  adapter,
});


async function main() {
  const cardiologia = await prisma.especialidad.create({
    data: {
      nombre: "Cardiología",
    },
  });

  const pediatria = await prisma.especialidad.create({
    data: {
      nombre: "Pediatría",
    },
  });

  const dermatologia = await prisma.especialidad.create({
    data: {
      nombre: "Dermatología",
    },
  });

  await prisma.medico.createMany({
    data: [
      {
        nombre: "Carlos",
        apellidos: "Ramírez Torres",
        email: "carlos.ramirez@clinicasalud.com",
        telefono: "987654321",
        fechaNacimiento: new Date("1980-05-15"),
        especialidadId: cardiologia.id,
      },
      {
        nombre: "María",
        apellidos: "Gómez Vargas",
        email: "maria.gomez@clinicasalud.com",
        telefono: "986543210",
        fechaNacimiento: new Date("1983-08-20"),
        especialidadId: cardiologia.id,
      },
      {
        nombre: "Luis",
        apellidos: "Fernández Soto",
        email: "luis.fernandez@clinicasalud.com",
        telefono: "985432109",
        fechaNacimiento: new Date("1979-03-10"),
        especialidadId: pediatria.id,
      },
      {
        nombre: "Ana",
        apellidos: "Quispe Flores",
        email: "ana.quispe@clinicasalud.com",
        telefono: "984321098",
        fechaNacimiento: new Date("1985-11-25"),
        especialidadId: pediatria.id,
      },
      {
        nombre: "Jorge",
        apellidos: "Mendoza Pérez",
        email: "jorge.mendoza@clinicasalud.com",
        telefono: "983210987",
        fechaNacimiento: new Date("1982-07-18"),
        especialidadId: dermatologia.id,
      },
      {
        nombre: "Laura",
        apellidos: "Castillo Rojas",
        email: "laura.castillo@clinicasalud.com",
        telefono: "982109876",
        fechaNacimiento: new Date("1987-01-30"),
        especialidadId: dermatologia.id,
      },
    ],
  });

  console.log("Seed ejecutado correctamente.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });