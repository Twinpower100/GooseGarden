# Goose Garden

Премиальный маркетинговый сайт ландшафтного дизайна: публичная витрина на Next.js (App Router) и админка [Payload CMS](https://payloadcms.com/) с PostgreSQL. Контент и SEO настраиваются через панель, без правки кода.

## Стек

| Слой | Технологии |
|------|------------|
| Приложение | Next.js 15 (App Router), React 19, TypeScript |
| Стили | Tailwind CSS 3 |
| Анимации | Motion (`motion/react`) |
| CMS | Payload 3.x, Lexical (rich text), встроенный admin UI |
| БД | PostgreSQL (`@payloadcms/db-postgres`) |
| Формы | Route Handler `POST /api/submit-inquiry`, валидация на сервере |
| Уведомления | Nodemailer (SMTP), Telegram Bot API (опционально) |
| Локализация | RU / EN: контент в Payload + префиксы URL `/ru`, `/en` |

## Требования

- Node.js 20+
- PostgreSQL (локально или удалённо)
- npm

## Быстрый старт

### 1. Клонирование и зависимости

```bash
git clone https://github.com/Twinpower100/GooseGarden.git
cd GooseGarden
npm install
```

### 2. Переменные окружения

Скопируйте пример и подставьте значения:

```bash
cp .env.example .env
```

| Переменная | Назначение |
|------------|------------|
| `DATABASE_URI` | Строка подключения PostgreSQL (например `postgresql://USER:PASSWORD@HOST:PORT/DB`) |
| `PAYLOAD_SECRET` | Секрет Payload (длинная случайная строка) |
| `NEXT_PUBLIC_SERVER_URL` | Публичный URL приложения (для ссылок и медиа), локально: `http://localhost:3005` |

Опционально для уведомлений о заявках: `SMTP_*`, `NOTIFICATION_EMAIL`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — см. `.env.example`.

### 3. База данных

Создайте роль и базу (пример; имена и пароль замените на свои):

```sql
CREATE USER goose_garden_admin WITH PASSWORD 'your_password';
CREATE DATABASE goose_garden OWNER goose_garden_admin ENCODING 'UTF8' TEMPLATE template0;
```

Укажите хост и порт в `DATABASE_URI` (в примере `.env.example` используется порт `5433` — при необходимости замените на `5432` или свой).

При первом запуске приложения Payload синхронизирует схему с БД.

### 4. Запуск в режиме разработки

По умолчанию dev-сервер слушает **порт 3005** (см. `package.json`).

```bash
npm run dev
```

- Сайт: `http://localhost:3005/ru`, `http://localhost:3005/en`
- Админка: `http://localhost:3005/admin`

Первого пользователя админки создайте через UI входа в Payload.

### 5. Демо-контент (seed)

После настройки `.env` и создания администратора можно заполнить демо-данные (тексты, глобальные настройки, портфолио, загрузка изображений с Unsplash в медиатеку):

```bash
npm run seed
```

Скрипт читает переменные из файла **`.env`** в корне проекта (не из `.env.local`).

## Структура репозитория

```
src/
├── app/
│   ├── (app)/[locale]/          # Публичные страницы (локаль в URL)
│   ├── (payload)/admin/         # Маршруты админки Payload
│   ├── (payload)/api/[...slug]/ # REST Payload
│   ├── api/submit-inquiry/      # Форма заявки
│   ├── sitemap.ts               # /sitemap.xml
│   └── robots.ts                # /robots.txt
├── components/                  # UI: шапка, форма, галерея, видео
├── lib/                         # rate limit, уведомления
├── payload/
│   ├── collections/             # users, media, portfolio-projects, inquiry-requests
│   └── globals/                 # site-settings, contact-settings, social-links, home-page
├── middleware.ts                # Редирект без локали → /ru/...
├── payload.config.ts
└── seed.ts                      # Сид демо-данных
```

## Локализация

- В конфиге Payload заданы локали `ru` (по умолчанию) и `en`, с fallback.
- `middleware.ts` добавляет префикс `/ru` для путей без локали и не трогает `/admin`, `/api`, статику Next и медиа.

## Форма заявки

- **Endpoint:** `POST /api/submit-inquiry`
- **Защита:** скрытое поле honeypot (`website_url`), ограничение частоты по IP (5 запросов за 60 с), проверка времени отправки формы (не быстрее 2,5 с с момента отображения)
- Заявки сохраняются в коллекцию `inquiry-requests`; при настроенных переменных отправляются письмо и/или сообщение в Telegram

## Production

```bash
npm run build
npm start
```

Порт для `start` задан в `package.json` (`-p 3005`); при деплое задайте переменные окружения на хостинге и при необходимости измените порт.

## Полезные команды Payload

```bash
npm run generate:types      # обновить типы после смены схемы
npm run generate:importmap  # при необходимости пересобрать import map админки
```

## Админка: основные разделы

| Раздел | Назначение |
|--------|------------|
| Globals → Site settings | Название, SEO-заголовки по умолчанию |
| Globals → Contact settings | Контакты, шаблоны сообщений |
| Globals → Social links | Соцсети |
| Globals → Home page | Контент главной (hero, блоки, CTA и т.д.) |
| Collections → Portfolio projects | Портфолио |
| Collections → Inquiry requests | Входящие заявки |
| Collections → Media | Медиафайлы |

## Документ с постановкой задачи

Техническое задание и сценарии контента описаны в [`Prompt.md`](./Prompt.md).

## Лицензия

Условия использования кода уточняйте у владельца репозитория.
