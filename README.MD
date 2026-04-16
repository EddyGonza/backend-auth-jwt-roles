Backend API - Usuarios con JWT y Roles

Descripción
API REST desarrollada con Node.js y Express que implementa:

Autenticación con JWT
Hash de contraseñas con bcrypt
Control de acceso por roles (RBAC)
PostgreSQL con Docker

Tecnologías
Node.js
Express
PostgreSQL
Docker
JWT
bcrypt

Endpoints principales
 Login


POST /auth/login
 Crear usuario

POST /usuarios
Obtener usuarios (solo admin)

GET /usuarios
Cambiar rol (solo admin)

PATCH /usuarios//rol
Autenticación

Usar header:
Authorization: Bearer TOKEN


Cómo ejecutar
# levantar base de datos
docker compose up -d

# instalar dependencias
npm install

# correr servidor
npm run dev
 
AUTOR
Proyecto desarrollado coomo practica de backend por EDUARDO ENRIQUE GONZALEZ ORTEGA