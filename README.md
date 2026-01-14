<h1 align="center">
  Todo List 📝
</h1>

---

<div align="center">
    <img alt="Made by Tico1606" src="https://img.shields.io/badge/made%20by-Tico1606-blueviolet">
    <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/Tico1606/todo-list">
    <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/Tico1606/todo-list">
    <img alt="GitHub License" src="https://img.shields.io/github/license/Tico1606/todo-list">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/Tico1606/todo-list?style=social">
</div>

---

## 🖥️ About

**Todo List** is a robust and efficient backend service designed to streamline task management. It allows client applications to create, query, update, and delete tasks, serving as a reliable foundation for scalable productivity tools.

The goal of developing this project was to practice **backend development** using **TypeScript**, **NodeJs**, **Fastify**, **Prisma**, and **Vitest**, ccreating a full API with funcionalitys to manipulate your tasks.

---

<!--
### ⏹️ Demonstration

<table align="center">
  <tr>
    <td align="center">
      <span>Home page<br/><br/></span>
      <img src="documentation/images/home-page.png" alt="Página inicial" height="420" />
    </td>
  </tr>
</table>

---
-->

## ✨ Features

- [x] Add new tasks with a title and description  
- [x] Mark tasks as completed  
- [x] Edit existing tasks  
- [x] Delete tasks  
- [x] Filter tasks by status (all, completed, pending)  
- [x] Responsive UI for mobile and desktop  

---

## ⚙️ Architecture

### 🛠️ Technologies and tools

This project was developed using:

- **[TypeScript](https://www.typescriptlang.org/)** for type safety and better code organization
- **[NodeJs](https://nodejs.org/)** for run JavaScript on backend
- **[Fastify](https://fastify.dev)** for run the server of API
- **[Fastify](https://www.prisma.io)** an ORM to manipulate PostgreeSQL database
- **[Vitest](https://vitest.dev)** for tests on the system

> For more details on dependencies and versions, check the [package.json file](https://github.com/Tico1606/todo-list/blob/main/package.json)

---

## 🚀 How to run the application

### 🔧 Prerequisites

- [Git](https://git-scm.com/)  
- [Node.js](https://nodejs.org/) (with npm or yarn)  
- Optional: [VSCode](https://code.visualstudio.com/) for editing code  

### 📟 Running the app

```bash
# Clone this repository
git clone https://github.com/Tico1606/todo-list.git

# Enter the project folder
cd todo-list

# Install dependencies
npm install

# Generate the Prisma types
npm run generate

# Migrate the database
npm run migrate

# Seed the database
npm run seed

# Run the application in development mode
npm run dev
