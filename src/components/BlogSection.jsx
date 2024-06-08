const posts = [
  {
    id: 1,
    title: 'Blog Post 1',
    excerpt: 'Summary of blog post 1',
    date: '2023-06-01',
  },
  {
    id: 2,
    title: 'Blog Post 2',
    excerpt: 'Summary of blog post 2',
    date: '2023-06-15',
  },
  // Add more blog posts here
];

const BlogSection = () => {
  return (
    <section className='bg-gray-100 py-10'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-6'>
          News and Updates
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {posts.map((post) => (
            <div
              key={post.id}
              className='bg-white shadow-xl rounded-lg overflow-hidden'
            >
              <div className='p-4'>
                <h3 className='text-xl font-semibold mb-2'>{post.title}</h3>
                <p className='mb-4'>{post.excerpt}</p>
                <p className='text-gray-500 text-sm mb-4'>{post.date}</p>
                <button className='btn btn-primary'>Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
