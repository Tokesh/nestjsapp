FROM node:20.8 AS builder
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --force

# Копируем все файлы проекта
COPY . .

# Пересобираем нативные модули
RUN npm rebuild bcrypt --build-from-source

# Собираем проект
RUN npm run build

FROM node:20.8
WORKDIR /usr/src/app

# Копируем весь проект из builder (вместе с .env и typeormconfig.ts)
COPY --from=builder /usr/src/app .

# Пересобираем нативные модули (в случае необходимости)
RUN npm rebuild bcrypt --build-from-source

# Запускаем приложение
CMD ["node", "dist/main"]
