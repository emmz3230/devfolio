import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(`DevFolio contact from ${formData.name || "a reader"}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );

    window.location.href = `mailto:hello@devfolio.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section className="padding-x py-12 max-container">
      <div className="max-w-3xl mx-auto bg-[#F6F6F7] dark:bg-[#242535] rounded-2xl p-8 md:p-12">
        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#4B6BFB] mb-4">
          Contact
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold text-[#141624] dark:text-white leading-tight">
          Send a message to the DevFolio team.
        </h1>
        <p className="mt-6 text-[#696A75] dark:text-[#BABABF] text-lg leading-8">
          Use the form below to start an email draft. For quick questions, you can also
          write directly to hello@devfolio.com.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="rounded-md border border-[#DCDDDF] bg-white px-4 py-3 text-[#141624] outline-none focus:border-[#4B6BFB]"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-md border border-[#DCDDDF] bg-white px-4 py-3 text-[#141624] outline-none focus:border-[#4B6BFB]"
          />
          <textarea
            name="message"
            rows="6"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            className="rounded-md border border-[#DCDDDF] bg-white px-4 py-3 text-[#141624] outline-none focus:border-[#4B6BFB]"
          />
          <button
            type="submit"
            className="inline-flex w-fit items-center rounded-md bg-[#4B6BFB] px-5 py-3 text-white font-medium hover:opacity-90 transition-opacity"
          >
            Open Email Draft
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-sm font-medium text-[#4B6BFB]">
            Your email app should open with a draft message.
          </p>
        )}
      </div>
    </section>
  );
};

export default ContactPage;