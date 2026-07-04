# 🦎 ChameleonFit — Beta

Персональный фитнес-помощник. Работает полностью офлайн, данные хранятся на телефоне.

---

## 🚀 Деплой на GitHub Pages (бесплатно, 5 минут)

### Что нужно
- Аккаунт на [github.com](https://github.com) — бесплатно, если нет

### Шаги

**1. Создать репозиторий**
Зайти на github.com → New repository → назвать `chameleon-fit` → Create

**2. Загрузить файлы**
В репозитории нажать **uploading an existing file** и перетащить все файлы из этой папки.

Или через терминал:
```bash
cd chameleon-fit
git init
git add .
git commit -m "beta"
git remote add origin https://github.com/ТВОЙ_НИК/chameleon-fit.git
git push -u origin main
```

**3. Включить GitHub Pages**
В репозитории → Settings → Pages → Source: **GitHub Actions** → Save

**4. Подождать 1-2 минуты**
GitHub сам соберёт и задеплоит. Ссылка появится в Settings → Pages:
`https://ТВОЙ_НИК.github.io/chameleon-fit/`

**5. Установить на телефон**

- **Android (Chrome):** открыть ссылку → меню `⋮` → «Добавить на гл. экран»
- **iPhone (Safari):** открыть ссылку → кнопка Поделиться `↑` → «На экран Домой»

---

## 💻 Локальный запуск

```bash
npm install
npm run dev
```

Открыть: http://localhost:5173

---

## 📦 Что внутри

```
chameleon-fit/
├── src/
│   ├── App.jsx        ← всё приложение
│   └── main.jsx       ← точка входа
├── public/
│   ├── manifest.json  ← PWA
│   ├── sw.js          ← офлайн-кэш
│   └── icon.svg       ← иконка
├── .github/
│   └── workflows/
│       └── deploy.yml ← авто-деплой
├── index.html
├── package.json
└── vite.config.js
```

**Нет бэкенда. Нет API-ключей. Нет подписок.**
Планы генерируются локально на основе результатов теста.
Все данные хранятся в localStorage телефона.
