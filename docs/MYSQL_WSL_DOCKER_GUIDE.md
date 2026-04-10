# MySQL on Docker (WSL) Quick Guide

## Scope
Simple operational commands for a local MySQL container used by this project.

## Assumptions
- Container name: `mysql-local`
- App database user: `appuser`
- App database name: `meubanco`
- Shadow database name: `meubanco_shadow`

Adjust names if your environment is different.

## 1. Start, Stop, and Check MySQL Container
```bash
# list containers
docker ps -a

# start MySQL container
docker start mysql-local

# stop MySQL container
docker stop mysql-local

# restart MySQL container
docker restart mysql-local

# follow MySQL logs
docker logs -f mysql-local
```

## 2. Access and Exit MySQL
```bash
# connect as root (recommended for admin actions)
docker exec -it mysql-local mysql -uroot -p

# connect as application user to app database
docker exec -it mysql-local mysql -uappuser -papp123 meubanco
```

Exit MySQL prompt with:
```sql
exit;
```
or:
```sql
\q
```

## 3. One-Time Setup (Database + User Grants)
Run as `root` inside MySQL:

```sql
CREATE DATABASE IF NOT EXISTS meubanco;
CREATE DATABASE IF NOT EXISTS meubanco_shadow;

CREATE USER IF NOT EXISTS 'appuser'@'%' IDENTIFIED BY 'app123';
CREATE USER IF NOT EXISTS 'appuser'@'localhost' IDENTIFIED BY 'app123';

GRANT ALL PRIVILEGES ON meubanco.* TO 'appuser'@'%';
GRANT ALL PRIVILEGES ON meubanco_shadow.* TO 'appuser'@'%';

GRANT ALL PRIVILEGES ON meubanco.* TO 'appuser'@'localhost';
GRANT ALL PRIVILEGES ON meubanco_shadow.* TO 'appuser'@'localhost';

FLUSH PRIVILEGES;
```

Validate permissions:
```sql
SHOW GRANTS FOR 'appuser'@'%';
SHOW GRANTS FOR 'appuser'@'localhost';
```

## 4. Basic SQL Inspection Commands
```sql
SHOW DATABASES;
USE meubanco;
SHOW TABLES;
SHOW TABLE STATUS;
```

Inspect a table:
```sql
DESCRIBE users;
SHOW CREATE TABLE users;
SHOW INDEX FROM users;
SELECT * FROM users LIMIT 10;
```

## 5. Other Database Entities
Views:
```sql
SHOW FULL TABLES IN meubanco WHERE TABLE_TYPE LIKE 'VIEW';
```

Triggers:
```sql
SHOW TRIGGERS FROM meubanco;
```

Stored procedures:
```sql
SHOW PROCEDURE STATUS WHERE Db = 'meubanco';
```

Functions:
```sql
SHOW FUNCTION STATUS WHERE Db = 'meubanco';
```

Events:
```sql
SELECT EVENT_NAME, STATUS
FROM information_schema.EVENTS
WHERE EVENT_SCHEMA = 'meubanco';
```

## 6. Prisma Migration (Local Dev)
`prisma migrate dev` needs access to both app DB and shadow DB.

Required `.env` entries:
```env
DATABASE_URL="mysql://appuser:app123@127.0.0.1:3306/meubanco"
SHADOW_DATABASE_URL="mysql://appuser:app123@127.0.0.1:3306/meubanco_shadow"
```

Run migration:
```bash
npm run prisma:migrate:dev
```

## 7. Fast Troubleshooting
1. `P3014` + `P1010` on shadow DB: create `meubanco_shadow`, grant `appuser` privileges on it, and confirm `SHADOW_DATABASE_URL`.
2. `Access denied for user 'appuser'@'localhost'`: ensure grants exist for both `'appuser'@'%'` and `'appuser'@'localhost'`.
