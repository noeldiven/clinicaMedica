import swaggerUi from "swagger-ui-express";

export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Clínica Salud Integral API",
    version: "1.0.0",
    description: "API REST para la gestión de la Clínica Salud Integral",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
security: [
  {
    bearerAuth: [],
  },
],


  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },

  paths: {
    "/api/patients": {
      post: {
        summary: "Registrar un paciente",
        tags: ["Pacientes"],
        security: [{ bearerAuth: [] }],
        responses: {
          201: {
            description: "Paciente creado correctamente",
          },
          400: {
            description: "Datos del paciente no válidos",
          },
          401: {
            description: "Token requerido",
          },
          403: {
            description: "No tienes permisos",
          },
        },
      },

      get: {
        summary: "Listar pacientes",
        tags: ["Pacientes"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Lista de pacientes",
          },
          401: {
            description: "Token requerido",
          },
          403: {
            description: "No tienes permisos",
          },
        },
      },
    },

    "/api/patients/{id}": {
      get: {
        summary: "Obtener paciente por ID",
        tags: ["Pacientes"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "Paciente encontrado",
          },
          400: {
            description: "El ID debe ser un número",
          },
          401: {
            description: "Token requerido",
          },
          403: {
            description: "No tienes permisos",
          },
          404: {
            description: "Paciente no encontrado",
          },
        },
      },
    },

    "/api/doctors": {
  get: {
    summary: "Listar médicos",
    tags: ["Médicos"],
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: "Lista de médicos",
      },
      401: {
        description: "Token requerido",
      },
      403: {
        description: "No tienes permisos",
      },
    },
  },
},

"/api/doctors/{id}/appointments": {
  get: {
    summary: "Obtener agenda de un médico",
    tags: ["Médicos"],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "integer",
        },
      },
      {
        name: "from",
        in: "query",
        required: false,
        schema: {
          type: "string",
          format: "date",
        },
      },
      {
        name: "to",
        in: "query",
        required: false,
        schema: {
          type: "string",
          format: "date",
        },
      },
    ],
    responses: {
      200: {
        description: "Agenda del médico",
      },
      400: {
        description: "ID o fechas no válidas",
      },
      401: {
        description: "Token requerido",
      },
      403: {
        description: "No tienes permisos",
      },
    },
  },
},

"/api/appointments": {
  post: {
    summary: "Crear una cita",
    tags: ["Citas"],
    security: [{ bearerAuth: [] }],
    responses: {
      201: {
        description: "Cita creada correctamente",
      },
      400: {
        description: "Datos de la cita no válidos",
      },
      404: {
        description: "Paciente o médico no encontrado",
      },
    },
  },
},

"/api/appointments/{id}/status": {
  patch: {
    summary: "Cambiar el estado de una cita",
    tags: ["Citas"],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "integer",
        },
      },
    ],
    responses: {
      200: {
        description: "Estado de la cita actualizado",
      },
      400: {
        description: "ID o estado no válido",
      },
      401: {
        description: "Token requerido",
      },
      403: {
        description: "No tienes permisos",
      },
      404: {
        description: "Cita no encontrada",
      },
    },
  },
},

"/api/reports/appointments-by-specialty": {
  get: {
    summary: "Obtener citas agrupadas por especialidad",
    tags: ["Reportes"],
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: "Reporte de citas por especialidad",
      },
      401: {
        description: "Token requerido",
      },
      403: {
        description: "No tienes permisos",
      },
    },
  },
},

"/api/reports/appointments-by-date": {
  get: {
    summary: "Obtener citas por fecha",
    tags: ["Reportes"],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "fecha",
        in: "query",
        required: true,
        schema: {
          type: "string",
          format: "date",
        },
      },
    ],
    responses: {
      200: {
        description: "Cantidad de citas completadas y canceladas",
      },
      400: {
        description: "La fecha no es válida",
      },
      401: {
        description: "Token requerido",
      },
      403: {
        description: "No tienes permisos",
      },
    },
  },
},

},

};

export { swaggerUi };