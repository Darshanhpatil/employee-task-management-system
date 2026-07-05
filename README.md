# Employee Task Management System

## Overview

Employee Task Management System is a Full Stack web application developed using React, TypeScript, Node.js, Express.js, and MySQL.

It allows Admins to manage employees and tasks while Employees can view and update their assigned tasks.

---

## Technologies Used

Frontend

- React
- TypeScript
- React Router
- Axios

Backend

- Node.js
- Express.js
- JWT Authentication
- Multer

Database

- MySQL

---

## Features

### Authentication

- Register
- Login
- JWT Authentication
- Role Based Access

### Dashboard

Admin Dashboard

- Total Employees
- Total Tasks
- Completed Tasks
- Pending Tasks

Employee Dashboard

- Assigned Tasks
- Completed Tasks

### Employee Management

- Add Employee
- Edit Employee
- Delete Employee
- Search
- Sorting
- Pagination

### Task Management

- Create Task
- Update Task
- Delete Task
- Assign Task
- File Upload

### Notifications

- Task Assigned
- Task Completed

### Reports

- Completed Tasks
- Pending Tasks
- Employee Wise Report
- Export CSV
- Export Excel

---

## Installation

Clone repository

```bash
git clone <repository-url>
```

Backend

```bash
cd server
npm install
npm run dev
```

Frontend

```bash
cd client
npm install
npm run dev
```

Database

Import

```
employee_task_db.sql
```

Update

```
.env
```

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=employee_task_db
JWT_SECRET=your_secret_key
```

---

## Default Roles

Admin

Employee

---

## Author

Darshan Patil