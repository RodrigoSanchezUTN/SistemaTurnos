# 📅 Turnify — Sistema de Gestión de Turnos

<p align="center">
  <strong>Sistema web para la gestión de turnos, clientes, servicios y horarios.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/API-Express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
  <img src="https://img.shields.io/badge/ORM-Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">
</p>

---

## 📌 Sobre el proyecto

**Turnify** es una aplicación web desarrollada para facilitar la gestión de turnos de profesionales y pequeños negocios.

El sistema permite administrar información relacionada con **usuarios, clientes, servicios, horarios y turnos**, centralizando la gestión en una única plataforma.

El proyecto está desarrollado con una arquitectura separada de **Frontend y Backend**, utilizando una API REST para la comunicación entre ambas partes.

---

## ✨ Funcionalidades

### 👤 Gestión de usuarios

* Registro e inicio de sesión.
* Autenticación mediante JWT.
* Gestión de roles y permisos.
* Protección de rutas mediante middleware.

### 👥 Gestión de clientes

* Registro de clientes.
* Información de contacto.
* Observaciones.
* Asociación de clientes con sus turnos.

### 📅 Gestión de turnos

* Creación y administración de turnos.
* Asociación entre cliente, servicio y usuario.
* Gestión del estado de los turnos.
* Control de fechas y horarios.

### 🕐 Gestión de horarios

* Configuración de horarios de atención.
* Definición de días activos.
* Configuración de horarios de inicio y finalización.
* Soporte para diferentes franjas horarias.

### 💼 Gestión de servicios

* Creación de servicios.
* Configuración de precios.
* Configuración de duración.
* Asociación de servicios con turnos.

---

## 🏗️ Arquitectura

El proyecto está dividido en dos aplicaciones principales:

```text
SistemaTurnos/
│
├── backend/
│   ├── agentes/
│   ├── configuración/
│   ├── controladores/
│   ├── middleware/
│   ├── prisma/
│   ├── rutas/
│   └── ...
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── ...
│
└── README.md
```

### Frontend

Aplicación desarrollada con **React** y **Vite**, encargada de la interfaz de usuario y la interacción con la API.

### Backend

API desarrollada con **Node.js y Express**, encargada de la lógica del sistema, autenticación, gestión de datos y comunicación con la base de datos.

### Base de datos

Se utiliza **PostgreSQL**, gestionada mediante **Prisma ORM**.

---

## 🛠️ Tecnologías utilizadas

### Frontend

* React
* Vite
* JavaScript
* React Router
* Axios
* Bootstrap
* Chart.js
* Firebase
* React Icons
* React Toastify
* SweetAlert2

### Backend

* Node.js
* Express
* Prisma
* PostgreSQL
* JWT
* bcrypt
* CORS
* dotenv

### Herramientas

* Git
* GitHub
* Visual Studio Code
* Postman

---

## 🔐 Seguridad y autenticación

El backend implementa autenticación mediante **JSON Web Tokens (JWT)** y utiliza **bcrypt** para el manejo seguro de contraseñas.

Además, el sistema utiliza middleware para controlar el acceso a determinadas funcionalidades según el usuario autenticado y sus permisos.

Las variables sensibles y credenciales se gestionan mediante variables de entorno.

---

## 🗄️ Modelo de datos

La aplicación utiliza PostgreSQL y Prisma para gestionar diferentes entidades:

```text
Usuario
   │
   ├── Turnos
   └── Horarios

Cliente
   │
   └── Turnos

Servicio
   │
   └── Turnos

Turno
   ├── Cliente
   ├── Servicio
   └── Usuario
```

Esto permite relacionar usuarios, clientes, servicios, horarios y turnos dentro del sistema.

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/RodrigoSanchezUTN/SistemaTurnos.git
```

```bash
cd SistemaTurnos
```

---

### 2. Configurar el Backend

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` con las variables necesarias para la aplicación.

Ejemplo:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/turnify"
JWT_SECRET="tu_clave_secreta"
```

Ejecutar las migraciones de Prisma:

```bash
npx prisma migrate dev
```

Iniciar el servidor:

```bash
npm run dev
```

---

### 3. Configurar el Frontend

Desde la carpeta principal:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Iniciar el entorno de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en la URL indicada por Vite.

---

## 🔄 Flujo general de la aplicación

```text
        Usuario
           │
           ▼
      React / Vite
           │
           │ HTTP
           ▼
       Express API
           │
           ▼
        Prisma ORM
           │
           ▼
       PostgreSQL
```

---

## 📈 Estado del proyecto

🚧 **En desarrollo**

Turnify continúa evolucionando con nuevas funcionalidades, mejoras de seguridad, experiencia de usuario y optimización de la arquitectura.

---

## 🎯 Objetivos

* Centralizar la gestión de turnos.
* Simplificar la administración de clientes.
* Facilitar la configuración de servicios y horarios.
* Reducir la gestión manual de reservas.
* Crear una solución adaptable a diferentes tipos de profesionales y negocios.

---

## 👨‍💻 Autor

**Rodrigo Sánchez**

Estudiante de Tecnicatura Universitaria en Programación — UTN FRSR.

💼 [LinkedIn](https://www.linkedin.com/in/rodrigo-sanchez-23356934b/)

🌐 [Portfolio](https://rodrigosanchezutn.github.io/cv/)

📧 [Email](mailto:rodri.sanchez1308@gmail.com)

---

<p align="center">
  <strong>🚀 Turnify — Organiza tus turnos. Simplifica tu trabajo.</strong>
</p>
