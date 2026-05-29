# 🚀 Деплой и обновление проекта

> **Примечание:** везде по тексту `domain_example` и `domain_example.ru` заменить на имя домена — с `.ru` и без соответственно.

---

## 📋 Содержание

- [Первичный деплой](#первичный-деплой)
  - [Автоматически](#автоматически)
  - [Вручную](#вручную)
- [Обновление проекта](#обновление-проекта)
  - [Автоматически](#автоматически-1)
  - [Вручную](#вручную-1)

---

## Первичный деплой

### Шаг 1 — Домен

Зарегистрировать домен и привязать его к серверу.

---

### Шаг 2 — База данных

1. Создать БД, импортировать данные и открыть доступ для IP:
   - `89.223.71.58`
   - `176.116.170.80`

2. Заполнить `server_config` в backend. В `sitekey` указать домен без `-` и `.ru`:

```bash
nano /var/www/backend/server_config.js
```

```js
domainexample: {
    host: 'vh240.timeweb.ru',
    database: 'megatariff_domainexample',
    user: 'megatariff_domainexample',
    password: '45674567',
    connectionLimit: 10,
    timezone: 'Z',
    dateStrings: true,
    siteDomain: 'domain_example.ru',
    siteIndex: '../domain_example.ru/index.html'
},
```

3. Перезапустить бэкенд:

```bash
pm2 restart backend
```

---

### Автоматически

#### Шаг 3 — Запуск скрипта деплоя

```bash
/root/deploy/deploy_site.sh domain_example.ru
```

#### Шаг 4 — Добавление в ecosystem и запуск

```bash
nano /var/www/ecosystem.config.js
```

```js
{
    name: "domainexample",
    cwd: "/var/www/domain_example.ru",
    script: "npm",
    args: "start -- -p 3001", // Порт поменять
    env: {
        NODE_ENV: "production",
        PORT: 3001 // Порт поменять
    }
},
```

```bash
pm2 start ecosystem.config.js
```

---

### Вручную

#### Шаг 3 — Создание папки проекта

```bash
mkdir /var/www/domain_example.ru/
```

#### Шаг 4 — Загрузка проекта из GitHub

```bash
git init
git branch -m main
git remote add origin git@github.com:Alexandr1810/ReactPatternSite.git
git pull origin main
npm i
```

Создать конфиг фронтенда:

```bash
cat > /var/www/domain_example.ru/app/utils/server_config.js << 'EOF'
export const server_config = {
    site_key: "domain_example",
    site_folder: "domain_example.ru",
    api_protocol: "https", // https — на проде, http — для localhost
    сaching_period: 3600
}
EOF
```

#### Шаг 5 — Папка с картинками

```bash
cp -r /var/www/backend/uploads/yfanet /var/www/backend/uploads/$SITE_KEY
```

#### Шаг 6 — Nginx-конфиг (без SSL)

> Не забыть подставить нужный порт.

```bash
cat > /etc/nginx/sites-available/domain_example.ru << 'EOF'
server {
    listen 80;
    server_name domain_example.ru www.domain_example.ru;

    client_max_body_size 50M;

    location ~ ^/(auth|front|back|uploads|upload)/ {
        proxy_pass http://127.0.0.1:3000;
        include proxy_params;
    }

    location ~ ^/(robots\.txt|sitemap\.xml)$ {
        proxy_pass http://127.0.0.1:3000;
        include proxy_params;
    }

    location / {
        proxy_pass http://127.0.0.1:3001;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF
```

#### Шаг 7 — Активация сайта в Nginx

```bash
ln -s /etc/nginx/sites-available/domain_example.ru /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

#### Шаг 8 — Получение SSL-сертификата

```bash
certbot --nginx -d domain_example.ru -d www.domain_example.ru
```

#### Шаг 9 — Сборка проекта

```bash
cd /var/www/domain_example.ru/
npm run build
```

#### Шаг 10 — Добавление в ecosystem и запуск

```bash
nano /var/www/ecosystem.config.js
```

```js
{
    name: "domainexample",
    cwd: "/var/www/domain_example.ru",
    script: "npm",
    args: "start -- -p 3001", // Порт поменять
    env: {
        NODE_ENV: "production",
        PORT: 3001 // Порт поменять
    }
},
```

```bash
pm2 start ecosystem.config.js
```

---

## Обновление проекта

> Выполняется после `git push` в GitHub.

### Автоматически

| Действие | Команда |
|---|---|
| Обновить один проект | `/opt/deploy-tools/deploy.sh yar-kom` |
| Обновить все проекты | `/opt/deploy-tools/deploy.sh all` |

**Логи:**
```
/var/log/deploy-tools
```

---

### Вручную

```bash
cd domain_example.ru
git pull origin main
npm i
npm run build
cd ..
pm2 restart domainexample
```
