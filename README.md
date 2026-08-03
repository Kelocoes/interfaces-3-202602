# Cats Module CRUD Example

This repository contains a simple NestJS application with an in‑memory **Cats** module.

## Basic NestJS Commands (Comandos)

```bash
# Create a new module
nest g module cats

# Create a controller inside the module
nest g controller cats --no-spec

# Create a service inside the module
nest g service cats --no-spec
```

> **Note:** `nest g` is a shortcut for `nest generate`.

## Cats Module Overview

- **Module:** `src/cats/cat.module.ts`
- **Controller:** `src/cats/cat.controller.ts`
- **Service:** `src/cats/cat.service.ts`
