import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <section className="padding-x py-12 max-container">
      <div className="max-w-4xl mx-auto bg-[#F6F6F7] dark:bg-[#242535] rounded-2xl p-8 md:p-12">
        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#4B6BFB] mb-4">
          About DevFolio
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold text-[#141624] dark:text-white leading-tight">
          A home for thoughtful writing and practical ideas.
        </h1>
        <p className="mt-6 text-[#696A75] dark:text-[#BABABF] text-lg leading-8">
          DevFolio brings together articles on technology, business, travel, lifestyle,
          and the work behind building things on the web. It is designed for readers
          who want clear, useful, and well-crafted posts in one place.
        </p>
        <p className="mt-4 text-[#696A75] dark:text-[#BABABF] text-lg leading-8">
          Explore the latest posts from the homepage or get in touch if you want to
          suggest a topic, collaborate, or share feedback.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-[#4B6BFB] px-5 py-3 text-white font-medium hover:opacity-90 transition-opacity"
          >
            Go to Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-md border border-[#DCDDDF] px-5 py-3 text-[#141624] dark:text-white hover:border-[#4B6BFB] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;