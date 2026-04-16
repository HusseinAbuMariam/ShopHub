# Dev Server Setup

This project has two parts: a React/Vite frontend (`multi-vendor-master`) and a Laravel backend (`dawlyStor_backend-main`). Both need to be running simultaneously.

## Prerequisites

- Node.js installed
- XAMPP MariaDB running
- PHP 8.4 at `C:\Users\msi gf63\Downloads\php-8.4.20\php.exe`
- Backend dependencies installed (`composer install`) and `.env` configured

See [db-local.md](db-local.md) for database setup.

## 1. Start MariaDB

Open XAMPP Control Panel and start MySQL, or run:

```bash
C:\xampp\mysql\bin\mysqld.exe --standalone
```

## 2. Start the Laravel backend

```bash
cd D:\code\dawlyStor_backend-main
"C:/Users/msi gf63/Downloads/php-8.4.20/php.exe" artisan serve
```

Runs at: http://localhost:8000

## 3. Start the frontend

```bash
cd D:\code\multi-vendor-master
npm install   # first time only
npm run dev
```

Runs at: http://localhost:5173
