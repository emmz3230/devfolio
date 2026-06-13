import { Link } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getBlogs } from "@/services/apiBlog";
import { Base_URL } from "@/api";

const ArchivedPage = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ["archived-blogs"],
    queryFn: () => getBlogs(1),
    placeholderData: keepPreviousData,
  });

  const archivedItems = data?.results || [];

  return (
    <section className="padding-x py-12 max-container">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#4B6BFB] mb-4">
            Archived Posts
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold text-[#141624] dark:text-white leading-tight">
            A place for older stories and evergreen reads.
          </h1>
        </div>

        <div className="grid gap-4">
          {isPending ? (
            <p className="text-[#696A75] dark:text-[#BABABF]">Loading archived posts...</p>
          ) : isError ? (
            <p className="text-red-500">Unable to load archived posts right now.</p>
          ) : archivedItems.length === 0 ? (
            <p className="text-[#696A75] dark:text-[#BABABF]">No archived posts found.</p>
          ) : (
            archivedItems.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-[#DCDDDF] bg-white dark:bg-[#242535]"
              >
                <div className="grid gap-0 md:grid-cols-[220px_1fr]">
                  <div className="h-[220px] md:h-full bg-[#F6F6F7] overflow-hidden">
                    <img
                      src={`${Base_URL}${item.featured_image}`}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-6 flex flex-col justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold tracking-[0.15em] uppercase text-[#4B6BFB] mb-3">
                        Archived Post
                      </p>
                      <h2 className="text-xl font-semibold text-[#141624] dark:text-white leading-snug">
                        <Link to={`/blogs/${item.slug}`} className="hover:text-[#4B6BFB] transition-colors">
                          {item.title}
                        </Link>
                      </h2>
                      <p className="mt-3 text-[#696A75] dark:text-[#BABABF] leading-7">
                        {item.excerpt || item.description || "Read the full post to revisit the original story."}
                      </p>
                    </div>

                    <div>
                      <Link
                        to={`/blogs/${item.slug}`}
                        className="inline-flex items-center rounded-md bg-[#4B6BFB] px-5 py-3 text-white font-medium hover:opacity-90 transition-opacity"
                      >
                        Read Post
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-[#4B6BFB] px-5 py-3 text-white font-medium hover:opacity-90 transition-opacity"
          >
            Back to Latest Posts
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center rounded-md border border-[#DCDDDF] px-5 py-3 text-[#141624] dark:text-white hover:border-[#4B6BFB] transition-colors"
          >
            Learn More About DevFolio
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArchivedPage;