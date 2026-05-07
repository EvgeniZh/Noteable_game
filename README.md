# Noteable - Web версия

Това е статична HTML/CSS/JS версия на Noteable. Не изисква backend и може да се качи директно в GitHub Pages, Netlify, Vercel или друг статичен хостинг.

## Стартиране локално

Отвори `index.html` в браузър или стартирай малък локален сървър:

```bash
python -m http.server 8000
```

След това отвори `http://localhost:8000`.

## Публикуване онлайн с линк

### GitHub Pages
1. Създай нов GitHub repository.
2. Качи всички файлове от тази папка в root директорията.
3. В Settings → Pages избери Branch: `main` и Folder: `/root`.
4. GitHub ще даде публичен линк към сайта.

### Netlify
1. Влез в Netlify.
2. Избери Add new site → Deploy manually.
3. Drag & drop цялата папка `noteable_web`.
4. Netlify ще генерира публичен линк.
