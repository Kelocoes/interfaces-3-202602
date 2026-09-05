# Ejercicios de Consultas y Endpoints con TypeORM (FindOptions)

Guia practica de 15 ejercicios orientados al uso de metodos nativos de repositorio de TypeORM (find, findOne, findAndCount, count) y sus operadores integrados, sin necesidad de recurrir a QueryBuilder.

---

## Metodos y Operadores de TypeORM a Tener en Cuenta

### 1. Importacion de Operadores
Los operadores de comparacion y filtrado se importan directamente desde `typeorm`:

```typescript
import {
    Between,
    ILike,
    In,
    IsNull,
    LessThan,
    LessThanOrEqual,
    Like,
    MoreThan,
    MoreThanOrEqual,
    Not,
    Repository
} from 'typeorm';
```

### 2. Metodos del Repositorio (`Repository<T>`)

```typescript
// Retorna un arreglo con todas las entidades que coincidan
const users = await this.userRepository.find(options);

// Retorna la primera entidad que coincida o null si no existe
const user = await this.userRepository.findOne(options);

// Retorna la cantidad de registros que cumplen una condicion
const total = await this.userRepository.count(options);

// Retorna una tupla [elementos, totalConteo] util para paginar
const [items, totalCount] = await this.userRepository.findAndCount(options);

// Versiones directas basadas unicamente en where:
const list = await this.userRepository.findBy({ role: { id: 1 } });
const single = await this.userRepository.findOneBy({ id: 5 });
```

### 3. Estructura de Opciones (`FindManyOptions` / `FindOneOptions`)

```typescript
await this.userRepository.find({
    // Proyectar columnas especificas
    select: {
        id: true,
        username: true,
        email: true,
    },

    // Filtros
    where: {
        bio: Not(IsNull()),
    },

    // Cargar entidades relacionadas (incluso anidadas)
    relations: {
        role: {
            rolePermissions: {
                permission: true,
            },
        },
    },

    // Ordenamiento
    order: {
        createdAt: 'DESC',
    },

    // Paginacion: take = LIMIT, skip = OFFSET
    take: 10,
    skip: 0,
});
```

### 4. Logica AND vs Logica OR en `where`

```typescript
// Logica AND: se define con un solo objeto
// Ejemplo: username contiene 'juan' Y bio no es nula
where: {
    username: ILike('%juan%'),
    bio: Not(IsNull()),
}

// Logica OR: se define pasando un arreglo de objetos
// Ejemplo: username contiene 'juan' O email contiene 'juan'
where: [
    { username: ILike('%juan%') },
    { email: ILike('%juan%') },
]
```

### 5. Ejemplos de Operadores de Comparacion

```typescript
// Mayor que (>) y Menor o igual que (<=)
where: {
    estimatedCalories: MoreThan(150),
    estimatedDurationMin: LessThanOrEqual(30),
}

// Rango inclusivo (BETWEEN fechaInicio AND fechaFin)
where: {
    createdAt: Between(new Date('2026-01-01'), new Date('2026-02-01')),
}

// Pertenencia en conjunto (IN)
where: {
    type: In(['cardio', 'strength']),
}

// Coincidencia parcial insensible a mayusculas/minusculas (ILIKE)
where: {
    name: ILike('%fuerza%'),
}

// Nulos y Negaciones
where: {
    bio: IsNull(), // IS NULL
    completedAt: Not(IsNull()), // IS NOT NULL
    roleId: Not(In([1, 2])), // NOT IN (1, 2)
}
```

---

## Nivel Basico

1. Listar usuarios ordenados por fecha de creacion
Obtener todos los usuarios ordenados de forma descendente por `createdAt`, seleccionando unicamente los campos `id`, `username`, `email` y `createdAt`.
Pistas de TypeORM:
```typescript
await this.userRepository.find({
    select: { id: true, username: true, email: true, createdAt: true },
    order: { createdAt: 'DESC' },
});
```

2. Contar usuarios que no tienen biografia
Retornar la cantidad total de usuarios cuyo campo `bio` no ha sido diligenciado (es nulo).
Pistas de TypeORM:
```typescript
await this.userRepository.count({
    where: { bio: IsNull() },
});
```

3. Listar ejercicios con duracion estimada menor o igual a un umbral
Consultar los ejercicios del catalogo cuya duracion estimada (`estimatedDurationMin`) sea menor o igual al valor recibido por parametro.
Pistas de TypeORM:
```typescript
await this.exerciseRepository.find({
    where: { estimatedDurationMin: LessThanOrEqual(maxDuration) },
});
```

4. Listar rutinas de un usuario especifico
Obtener todas las rutinas creadas por un `userId` dado, ordenadas alfabeticamente por el nombre de la rutina.
Pistas de TypeORM:
```typescript
await this.routineRepository.find({
    where: { user: { id: userId } },
    order: { name: 'ASC' },
});
```

5. Obtener un rol junto con su listado de usuarios
Consultar un rol por su `id` e incluir de forma explicita la lista de usuarios que tienen dicho rol asignado.
Pistas de TypeORM:
```typescript
await this.roleRepository.findOne({
    where: { id: roleId },
    relations: { users: true },
});
```

---

## Nivel Intermedio

6. Buscar usuarios registrados en un rango de fechas con paginacion
Consultar los usuarios cuya fecha `createdAt` este dentro de un rango determinado (`startDate` y `endDate`), retornando los resultados paginados junto con el total general.
Pistas de TypeORM:
```typescript
await this.userRepository.findAndCount({
    where: { createdAt: Between(startDate, endDate) },
    order: { createdAt: 'DESC' },
    take: limit,
    skip: offset,
});
```

7. Buscar roles por coincidencia parcial de texto
Buscar roles cuyo nombre contenga un texto recibido por query param, sin diferenciar mayusculas ni minusculas.
Pistas de TypeORM:
```typescript
await this.roleRepository.find({
    where: { name: ILike(`%${term}%`) },
    order: { name: 'ASC' },
});
```

8. Contar rutinas de un usuario
Calcular cuantas rutinas tiene creadas un usuario determinado a partir del identificador de usuario.
Pistas de TypeORM:
```typescript
await this.routineRepository.count({
    where: { user: { id: userId } },
});
```

9. Consultar ejercicios por tipo o con calorias estimadas superiores a un valor
Obtener ejercicios que pertenezcan a un tipo determinado (ej. 'cardio') O que tengan un estimado de calorias mayor a 150.
Pistas de TypeORM:
```typescript
await this.exerciseRepository.find({
    where: [
        { type: tipo },
        { estimatedCalories: MoreThan(150) },
    ],
});
```

10. Obtener usuario con rol y permisos anidados
Dado el id de un usuario, obtener la entidad completa cargando la relacion del rol y de los permisos a traves de `role_permissions`.
Pistas de TypeORM:
```typescript
await this.userRepository.findOne({
    where: { id: userId },
    relations: {
        role: {
            rolePermissions: {
                permission: true,
            },
        },
    },
});
```

---

## Nivel Avanzado

11. Buscar usuarios con condicion compuesta: texto en username o email y con bio obligatoria
Buscar usuarios donde el termino coincida en `username` o en `email`, pero exigiendo en ambos casos que tengan biografia diligenciada.
Pistas de TypeORM:
```typescript
await this.userRepository.find({
    where: [
        { username: ILike(`%${query}%`), bio: Not(IsNull()) },
        { email: ILike(`%${query}%`), bio: Not(IsNull()) },
    ],
    relations: { role: true },
    order: { username: 'ASC' },
});
```

12. Consultar logs de actividad completados dentro de un rango de tiempo
Obtener los `activity_logs` de un usuario que ya fueron finalizados (`completedAt` no es nulo) y cuya fecha de inicio `startedAt` este entre dos fechas dadas.
Pistas de TypeORM:
```typescript
await this.activityLogRepository.find({
    where: {
        user: { id: userId },
        completedAt: Not(IsNull()),
        startedAt: Between(fromDate, toDate),
    },
    relations: { routine: true },
});
```

13. Listar ejercicios de rutina ordenados por secuencia
Para una rutina dada (`routineId`), obtener todos sus `routine_exercises` junto con la informacion del ejercicio correspondiente, ordenados por su numero de orden.
Pistas de TypeORM:
```typescript
await this.routineExerciseRepository.find({
    where: { routine: { id: routineId } },
    relations: { exercise: true },
    order: { orderIndex: 'ASC' },
});
```

14. Consultar actividad detallada con ejercicios realizados
Obtener el detalle de una sesion (`activity_log`) por su id, incluyendo los datos de la rutina asociada y la lista de `activity_exercises` ejecutados junto con el ejercicio base.
Pistas de TypeORM:
```typescript
await this.activityLogRepository.findOne({
    where: { id: logId },
    relations: {
        routine: true,
        activityExercises: {
            routineExercise: {
                exercise: true,
            },
        },
    },
});
```

15. Filtrar ejercicios por lista de tipos y umbral de calorias
Obtener los ejercicios que pertenezcan a cualquiera de los tipos dados en un arreglo (ej. `['strength', 'cardio']`) y cuyas calorias estimadas superen un valor minimo.
Pistas de TypeORM:
```typescript
await this.exerciseRepository.find({
    where: {
        type: In(typesList),
        estimatedCalories: MoreThan(minCalories),
    },
    order: { estimatedCalories: 'DESC' },
});
```
