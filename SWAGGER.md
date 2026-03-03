# Documentación de endpoints (Swagger)

Accede a la interfaz Swagger UI en: `http://localhost:3000/docs`
(la API tiene prefijo global `/api`).

## Endpoints

- **POST /api/users**
  - Resumen: Crear un nuevo usuario.
  - Body (CreateUserDto):
    - `email` (string, requerido) — correo del usuario
    - `firstName` (string, requerido)
    - `lastName` (string, requerido)
    - `username` (string, requerido)
    - `password` (string, requerido)
    - `roles` (enum: `regular` | `professional` | `admin`, requerido)
  - Response 201: `UserResponseDto` (id, email, username, firstName?, lastName?, createdAt, updatedAt)

## Cómo levantar la app y ver Swagger

1. Instala dependencias si hace falta:

```bash
npm install
```

2. Levanta la aplicación en modo desarrollo:

```bash
npm run start:dev
```

3. Abre en el navegador:

```
http://localhost:3000/docs
```

## Notas

- Asegúrate de tener las variables de entorno `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE` configuradas (o usa los valores por defecto).
- El prefijo global `/api` significa que las rutas de controller se sirven bajo `/api/*`.
- Si quieres que incluya más endpoints, indícame qué controladores faltan o si quieres que documente los DTOs con más ejemplos.
