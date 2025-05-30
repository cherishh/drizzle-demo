# minimal saas framework
this is a MVP app for making a modern web app with modern techstack. in this project i'll glue all modern pieces together, for you to get a sense of how to build a modern web app, and maybe a quick start.



## future todos
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
- tanstack query w/ trpc
- testing/unit test
  resources:
    - playwright
- documentation
  resources:
    - https://starlight.astro.build/
    - https://vitepress.dev/


## domains
- https://tuxihub.com

## reflection
1. i18n(or at least next-intl) kinda sucks. it's not integrate with others very well. AND IT HURTS PERFORMANCE. in the end you can make it work though. so if you don't really need it, drop internationalization.
2. if you don't actually need dynamic blogs, mdx is fine. although i don't know in the case of you need to 'generate' blogs, what's the best practice.
3. use better-auth. clerk is not good enough.

## usage
```bash
pnpm i
pnpm dev
```

