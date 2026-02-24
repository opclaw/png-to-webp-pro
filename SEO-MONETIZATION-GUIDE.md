# SEO & Monetization Setup Guide

## 1. Custom Domain (рекомендуется)

### Вариант A: Домен через Namecheap/Cloudflare
- Купи домен: `pngtowebpconverter.com` или `convertpngtowebp.com`
- В Vercel Dashboard: Project → Settings → Domains
- Добавь домен и следуй инструкциям по DNS

### Вариант B: Поддомен (бесплатно)
- `png-to-webp.yoursite.com` — если есть основной сайт

## 2. Google Search Console

1. Перейди на https://search.google.com/search-console
2. Добавь свойство (домен или URL-префикс)
3. Подтверди владение (через DNS или HTML-файл)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`
5. Request indexing для главной страницы

## 3. Google AdSense

### Регистрация:
1. https://www.google.com/adsense/start
2. Создай аккаунт
3. Добавь сайт
4. Вставь код в `app/layout.tsx`:

```tsx
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ID"
  crossOrigin="anonymous"
  strategy="lazyOnload"
/>
```

### Размещение рекламных блоков:

**Ad Slot 1 (Hero Section):**
```tsx
<ins
  className="adsbygoogle"
  style={{ display: 'block', textAlign: 'center' }}
  data-ad-layout="in-article"
  data-ad-format="fluid"
  data-ad-client="ca-pub-YOUR_ID"
  data-ad-slot="SLOT_1"
/>
```

**Ad Slot 2 (After Converter):**
```tsx
<ins
  className="adsbygoogle"
  style={{ display: 'block' }}
  data-ad-client="ca-pub-YOUR_ID"
  data-ad-slot="SLOT_2"
  data-ad-format="auto"
  data-full-width-responsive="true"
/>
```

## 4. Google Analytics 4

1. https://analytics.google.com
2. Создай поток данных (Web)
3. Получи Measurement ID (G-XXXXXXXXXX)
4. Замени в `app/layout.tsx`:

```tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YOUR_ID');
  `}
</Script>
```

## 5. Rich Snippets Testing

Проверь разметку:
- https://search.google.com/test/rich-results
- Вставь URL и проверь, что Schema.org работает

## 6. PageSpeed Insights

Проверь скорость:
- https://pagespeed.web.dev/
- Цель: 90+ на мобильных

## 7. Контент для SEO

### Статьи (добавить в блог/раздел):
1. "PNG vs WebP: Complete Comparison Guide"
2. "How to Reduce Image Size by 80% Without Losing Quality"
3. "WebP Format: Everything You Need to Know"

### FAQ (уже в коде, но можно расширить):
- Добавить 10-15 вопросов
- Использовать Schema.org FAQPage разметку

## 8. Backlinks (для ранжирования)

### Бесплатные методы:
1. Reddit: r/webdev, r/SEO, r/sideproject
2. Product Hunt (при запуске)
3. Hacker News (Show HN)
4. Indie Hackers
5. Twitter/X (поделиться)

### Гостевые посты:
- Написать статью для блогов о веб-разработке
- Medium, Dev.to

## 9. Монетизация: Freemium (опционально)

### Free:
- До 10 файлов в день
- Макс размер 5MB

### Pro ($5/мес):
- Безлимит файлов
- Размер до 50MB
- Batch processing (до 100 файлов)
- API доступ
- Без рекламы

### Stripe интеграция:
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

## 10. Аналитика конверсий

Отслеживай в GA4:
- File uploads
- Conversions completed
- Downloads
- Ad clicks (через events)

## Чек-лист запуска:

- [ ] Кастомный домен
- [ ] Google Search Console
- [ ] Sitemap submitted
- [ ] AdSense approved
- [ ] Analytics работает
- [ ] Rich snippets тест пройден
- [ ] PageSpeed 90+
- [ ] Первые бэклинки
- [ ] Reddit пост
- [ ] Product Hunt (через неделю)

---

**Ожидаемый результат через 3 месяца:**
- Трафик: 1,000-5,000 посещений/мес
- Доход AdSense: $10-50/мес (на старте)
- Рост: +20-30% в месяц при активном SEO
