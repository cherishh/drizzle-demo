// import { getBlog } from '@/lib/blog';

// todo: will this be pre-built?
async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log('slug', slug);
  // const { title, content } = await getBlog(params.slug);

  return (
    <div>
      <h1>Blog Page</h1>
      <article>
        <h2>title</h2>
        <p>content</p>
      </article>
    </div>
  );

  // return (
  //   <div>
  //     <h1>Blog Page</h1>
  //     <article>
  //       <h2>{title}</h2>
  //       <p>{content}</p>
  //     </article>
  //     <div>
  //       <span>like</span>
  //       <span>comment</span>
  //     </div>
  //   </div>
  // );
}

export default BlogPage;
