# Aplicación de Computación en Internet 3

En este repositorio encontrarás un pequeño backend trabajado en el curso de Computación en Internet 3.

## Pasos para ejecutarlo

1. Ejecutar el siguiente comando:

```bash
docker-compose up --build
```

2. El backend estará disponible en `http://localhost:8080`.

3. La base de datos estará configurada con los siguientes parámetros:

```yaml
POSTGRES_USER: postgres
POSTGRES_PASSWORD: postgres
POSTGRES_DB: postgres
POSTGRES_HOST: db
POSTGRES_PORT: 5432
```

4. Para poblar la base de datos, puedes ejecutar el siguiente comando:

```bash
docker-compose exec back npm run seed:prod
```

5. Obten a los usuarios por medio de la ruta `http://localhost:8080/users` (requiere autenticación, pero la he deshabilitado para propósitos de prueba).