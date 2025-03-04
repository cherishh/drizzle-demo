# minimal saas framework
this is a POC app for nextjs 15, RSC, drizzle, neon(severless db), auth, cms, analytics, etc.

a minimal saas framework putting all modern pieces together.

## todo
- [x] add drizzle
- [x] add DB, connect to postgres
- [x] test RSC, server actions, form, zod, fetch, etc.(e.g. contact form)
- [x] add theme
- [x] test next Image component
- [x] add i18n/next Intl
- [x] setup shadcn/ui
- [x] setup domain/SSL related
- [x] add auth/clerk
- [x] setup CI
- [ ] ~~add payload/CMS(deprecated)~~
- [x] add notion/blog
- [x] add analytics/posthog
- [x] add redis/upstash rate limit
- [ ] ~~add logging/sentry~~
- [x] sitemap
--
- [ ] file for a us company & get a stripe account


## further actions(on the fly)
- fix sometimes /blog loading failed
- add stripe/payment
resources:
  - https://github.com/hua1995116/indiehackers-steps
  - https://mp.weixin.qq.com/s/y_XRFa8pzkgV-GqttSotqw
  - https://github.com/t3dotgg/stripe-recommendations
  - https://www.youtube.com/watch?v=ag7HXbgJtuk

- add logging/sentry
- add uptime monitor
  resources:
    - https://betterstack.com/uptime
- mailer
  resources:
    - https://resend.com/
    - https://sendgrid.com/en-us
- custom support/crisp
- find an actual image service
- user comment/disqus
- add cache/redis
- tanstack query w/ trpc(or even a separate backend?)
- testing/unit test
  resources:
    - playwright
- documentation
  resources:
    - https://starlight.astro.build/
    - https://vitepress.dev/


## domains
- https://tuxihub.com
- https://drizzle-demo.vercel.app
- https://drizzle-demo.netlify.app

## reflection
1. i18n(or at least next-intl) kinda sucks. it's not integrate with others very well. but in the end you can make it work. so if you don't really need it, drop internationalization.
2. don't actually need dynamic blogs. mdx is fine. although i don't know in the case of you need to 'generate' blogs, what's the best practice.

## usage
```bash
pnpm i
pnpm dev
```

