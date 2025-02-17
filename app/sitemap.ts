import { getPublishedPosts } from '@/lib/notion';
import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

type ChangeFreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  const baseUrl = 'https://tuxihub.com';

  // 静态页面路径 - 移除需要登录的页面
  const routes = [
    '', // 首页
    '/blog', // 博客列表
    '/feedback', // 反馈
    '/feedback/list', // 反馈列表
    '/feedback-client/list', // 客户端反馈列表
    '/image-test', // 图片测试
    '/term-of-service', // 服务条款
    '/privacy', // 隐私政策
  ];

  // 为每个静态页面生成所有支持的语言版本
  const staticUrls = routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFreq,
      priority: route === '' ? 1.0 : 0.8,
    }))
  );

  // 为每篇博客文章生成所有支持的语言版本
  const blogUrls = posts.flatMap((post) =>
    routing.locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.publishDate),
      changeFrequency: 'weekly' as ChangeFreq,
      priority: 0.7,
    }))
  );

  // 动态路由页面 (如果有动态生成的内容)
  // const dynamicUrls = [
  //   // 例如从数据库获取的动态页面 ID 列表
  //   // { url: `${baseUrl}/detail/1`, ... },
  //   // { url: `${baseUrl}/detail/2`, ... },
  // ];

  return [...staticUrls, ...blogUrls];
}
