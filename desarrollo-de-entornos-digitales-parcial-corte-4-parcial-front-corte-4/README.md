# Examen Individual - Corte 4: Desarrollo de Aplicaciones Web

## Restricciones y Condiciones

- El estudiante podrá visualizar sus apuntes del curso, así como la documentación de curso y enlaces relacionados al contexto del ejercicio. Podrá hacer uso de internet y búsquedas de código a través del navegador.
- **El estudiante no podrá hacer uso de ningún tipo de herramienta relacionada con IA Generativa como lo son: Chat GPT, Gemini, Copilot, Claude y similares.** De ser utilizado se anulará el examen y se hará el respectivo reporte para iniciar un proceso disciplinario.
- El estudiante no podrá hacer uso de ningún dispositivo electrónico además de su computador personal o el suministrado por el laboratorio para realizar la evaluación.
- El estudiante deberá hacer uso de las herramientas utilizadas dentro del curso hasta el momento, especialmente **Next.js**.
- Dentro del examen, el docente le solicitará hacer commits a su repositorio de manera frecuente, esto con el objetivo de demostrar su desarrollo y avance a través del examen. Si su entrega final no posee un avance demostrable, su entrega será revisada posteriormente para demostrar su autenticidad.
- **Toda la aplicación y diseño debe ser presentada en inglés.** Los nombres de variables, atributos y entidades en otro idioma no serán aceptados.
- **Nota final:** Si la aplicación falla al ejecutarse, su nota podrá verse afectada drásticamente. Además, si el profesor lo considera, el examen deberá ser sustentado para validar sus conocimientos.

## Repositorio del Backend

https://github.com/Desarrollo-de-Entornos-Digitales/back-parcial-corte-4.git

## Descripción del Proyecto

El objetivo de este examen consiste en desarrollar una interfaz de usuario utilizando **Next.js** que consuma un backend desarrollado en **NestJS**. La aplicación debe permitir la gestión de reservas para funciones de cine, integrando visualización de películas, horarios y selección de asientos.

La solución debe implementarse utilizando el sistema de rutas de Next.js, estilizarse con **Tailwind CSS** y realizar las peticiones HTTP mediante la librería **Axios**.

## Requerimientos Funcionales

### 1. Visualización de Películas
- Implementar una sección que permita visualizar el listado completo de películas disponibles en el sistema.
- Cada película deberá mostrar información básica como:
    - **Nombre**
    - **Duración**
    - **Género**

### 2. Visualización de Horarios (Screenings)
- Al realizar click en una película, se debe mostrar una nueva sección con los horarios disponibles para esa película.
- Cada horario deberá mostrar:
    - **Día**
    - **Fecha**

### 3. Selección de Asientos
- Desarrollar una interfaz visual para seleccionar asientos disponibles dentro de una sala de cine.
- Los asientos deben representarse mediante una grilla con las siguientes características:
    - **Total de asientos:** 150.
    - **Distribución:** 15 asientos por fila (10 filas en total).
    - **Numeración:** Del 1 al 150 de manera consecutiva.
- Los asientos deben:
    - Mostrar visualmente cuáles están **disponibles** y cuáles **reservados** (ocupados).
    - Permitir seleccionar únicamente asientos disponibles.
    - Cambiar visualmente al ser seleccionados.
    - Mantener una distribución clara y ordenada en forma de grilla.

### 4. Reserva de Asientos
- Implementar un botón llamado **"Reserve Seats"** que permita realizar la reserva de los asientos seleccionados para un horario específico.
- La reserva debe persistirse utilizando el backend suministrado.

## Requerimientos Técnicos

### Tecnologías
- **Next.js** (Se recomienda App Router)
- **Tailwind CSS**
- **Axios**

### Diseño
- La aplicación debe presentar una estructura organizada, limpia y profesional.
- **Se evaluará:**
    - Distribución visual.
    - Uso correcto de espacios.
    - Diseño responsivo básico.
    - Claridad en la selección de asientos.

## Ponderación de la Evaluación

- **Visualización de Películas:** 20%
- **Visualización de Horarios:** 20%
- **Lógica de Selección y Reserva de Asientos:** 20%
- **Consumo adecuado del API con Axios:** 20%
- **Navegación y Estructura de Páginas:** 10%
- **Calidad del Código y Uso de Tailwind CSS:** 10%
