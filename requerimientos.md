ESPECIALIDAD 
id       Int       [PK] [Obligatorio]
nombre   String    [Único] [Obligatorio]

MEDICO
id                 Int       [PK] [Obligatorio]
nombre             String    [Obligatorio]
apellidos          String    [Obligatorio]
email              String    [Único] [Obligatorio]
telefono           String    [Opcional]
fecha_nacimiento   Date      [Obligatorio]
especialidad_id    Int       [Obligatorio]

PACIENTE
id                 Int       [PK] [Obligatorio]
nombre             String    [Obligatorio]
apellidos          String    [Obligatorio]
email              String    [Único] [Obligatorio]
telefono           String    [Opcional]
fecha_nacimiento   Date      [Obligatorio]

CITA
id                 Int       [PK] [Obligatorio]
paciente_id        Int       [Obligatorio]
medico_id          Int       [Obligatorio]
fecha_hora         DateTime  [Obligatorio]
motivo_consulta    String    [Opcional]
diagnostico        String    [Opcional]
estado             Enum      [Obligatorio]

RELACIONES
Especialidad 1 ───── N Médico

Médico       1 ───── N Cita

Paciente     1 ───── N Cita

Especialidad — Médico
Una especialidad puede tener muchos médicos, pero un médico pertenece a una sola especialidad.

Médico — Cita
Un médico puede tener muchas citas, pero una cita pertenece a un solo médico.

Paciente — Cita
Un paciente puede tener muchas citas, pero una cita pertenece a un solo paciente.