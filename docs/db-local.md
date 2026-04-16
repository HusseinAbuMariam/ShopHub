# Local Database Setup

The backend uses MySQL. The dump is a MySQL 8.0 export; locally we use XAMPP's MariaDB 10.4.

## Prerequisites

- XAMPP installed (provides MariaDB at `C:\xampp\mysql\bin\`)
- PHP 8.4 extracted to `C:\Users\msi gf63\Downloads\php-8.4.20\`

## 1. Start MariaDB

Open XAMPP Control Panel and start MySQL, or run:

```bash
C:\xampp\mysql\bin\mysqld.exe --standalone
```

## 2. Create the database

```bash
C:\xampp\mysql\bin\mysql.exe -u root -e "CREATE DATABASE IF NOT EXISTS dawlystor CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

## 3. Import the dump

The dump uses `utf8mb4_0900_ai_ci` (MySQL 8 only) which must be replaced with `utf8mb4_unicode_ci` for MariaDB:

```bash
sed 's/utf8mb4_0900_ai_ci/utf8mb4_unicode_ci/g' main.dump | C:\xampp\mysql\bin\mysql.exe -u root dawlystor
```

> Replace `main.dump` with the full path to your dump file.

## 4. Configure .env

In `dawlyStor_backend-main/.env`, set:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=dawlystor
DB_USERNAME=root
DB_PASSWORD=
```

## 5. Install dependencies & run the backend

```bash
# Install PHP dependencies (must use PHP 8.4)
"C:/Users/msi gf63/Downloads/php-8.4.20/php.exe" "C:/ProgramData/ComposerSetup/bin/composer.phar" install

# Generate app key (first time only)
"C:/Users/msi gf63/Downloads/php-8.4.20/php.exe" artisan key:generate

# Start the dev server
"C:/Users/msi gf63/Downloads/php-8.4.20/php.exe" artisan serve
```

## Notes

- MariaDB must be running every time you work on the project.
- Always use `C:\Users\msi gf63\Downloads\php-8.4.20\php.exe` instead of the system `php` — XAMPP's PHP 8.2 is too old for this project's dependencies.
- To permanently fix the `php` command, add `C:\Users\msi gf63\Downloads\php-8.4.20` to the top of your system PATH in Windows environment variables.
