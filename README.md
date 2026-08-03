# Sistema de Gestión de Rutinas y Actividad Física

Una empresa que ofrece servicios relacionados con el bienestar y la actividad física desea desarrollar una aplicación para ayudar a sus usuarios a organizar sus entrenamientos y llevar un control de su progreso. Actualmente, muchas personas utilizan hojas de cálculo, notas en el celular o aplicaciones genéricas para registrar sus actividades, lo que dificulta mantener un historial ordenado y consultar los resultados obtenidos a lo largo del tiempo. Por esta razón, se busca construir una solución que permita a cada usuario crear planes de entrenamiento personalizados, compuestos por diferentes actividades físicas, y utilizarlos durante sus sesiones diarias. Cuando una persona realice un entrenamiento, la aplicación deberá permitir registrar lo que efectivamente hizo, ya que en ocasiones los resultados obtenidos pueden diferir de lo que se había planeado inicialmente. También se desea conservar un historial de las sesiones realizadas para que los usuarios puedan revisar su evolución y analizar su desempeño. Adicionalmente, la organización considera importante que no todas las personas tengan acceso a las mismas funcionalidades dentro de la plataforma, por lo que será necesario contemplar diferentes tipos de usuarios con distintos niveles de acceso. Como parte del proyecto, se espera diseñar una solución que permita almacenar y gestionar toda la información necesaria para soportar estas necesidades de negocio de forma organizada y consistente.

<details>
<summary><strong>Ver propuesta de modelo de datos (solución sugerida)</strong></summary>

```mermaid
erDiagram

    USER {
        int id PK
        int roleId FK
        varchar name
        varchar email UK
        varchar password
        timestamp createdAt
        timestamp updatedAt
    }

    ROLE {
        int id PK
        varchar name UK
        text description
        timestamp createdAt
    }

    PERMISSION {
        int id PK
        varchar name UK
        text description
        timestamp createdAt
    }

    ROLE_PERMISSION {
        int roleId FK
        int permissionId FK
        timestamp createdAt
    }

    EXERCISE {
        int id PK
        varchar name
        text description
        varchar type
        float estimatedCalories
        float estimatedDistanceKm
        int estimatedDurationMin
        varchar icon
        timestamp createdAt
    }

    ROUTINE {
        int id PK
        int userId FK
        varchar name
        text description
        timestamp createdAt
        timestamp updatedAt
    }

    ROUTINE_EXERCISE {
        int id PK
        int routineId FK
        int exerciseId FK
        int orderIndex
        int targetSets
        int targetReps
        float targetWeightKg
        int targetDurationMin
        timestamp createdAt
    }

    ACTIVITY_LOG {
        int id PK
        int userId FK
        int routineId FK
        timestamp startedAt
        timestamp completedAt
        timestamp createdAt
    }

    ACTIVITY_EXERCISE {
        int id PK
        int activityLogId FK
        int routineExerciseId FK
        int actualSets
        int actualReps
        float actualWeightKg
        int actualDurationMin
        float caloriesBurned
        float distanceCoveredKm
        timestamp startedAt
        timestamp completedAt
    }

    ROLE ||--o{ USER : assigned_to
    ROLE ||--o{ ROLE_PERMISSION : has
    PERMISSION ||--o{ ROLE_PERMISSION : granted_to

    USER ||--o{ ROUTINE : creates
    USER ||--o{ ACTIVITY_LOG : performs

    ROUTINE ||--o{ ROUTINE_EXERCISE : contains
    EXERCISE ||--o{ ROUTINE_EXERCISE : used_in

    ROUTINE ||--o{ ACTIVITY_LOG : executed_as

    ACTIVITY_LOG ||--o{ ACTIVITY_EXERCISE : contains

    ROUTINE_EXERCISE ||--o{ ACTIVITY_EXERCISE : executed_as
```

</details>
