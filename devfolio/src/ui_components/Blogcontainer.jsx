import BlogCard from "./BlogCard"
import Spinner from "./Spinner"

const BlogContainer = ({isPending, blogs}) => {
  const blogList = Array.isArray(blogs)
    ? blogs
    : Array.isArray(blogs?.results)
    ? blogs.results
    : Array.isArray(blogs?.blogs)
    ? blogs.blogs
    : Array.isArray(blogs?.data)
    ? blogs.data
    : []

  if (isPending) {
    return <Spinner />
  }

  return (
    <section className="padding-x py-6  max-container">
      <h2 className="font-semibold text-xl mb-6 dark:text-[#141624] text-center">
        🍔Latest Posts
      </h2>

      <div className="flex items-center gap-6 justify-center flex-wrap">
        {blogList.length === 0 ? (
          <p className="text-center">No posts yet.</p>
        ) : (
          blogList.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        )}
      </div>
    </section>
  )
}

export default BlogContainer
      