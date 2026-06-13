import { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import api from "../api";



const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus("error");
      setMessage("Please enter an email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await api.post("subscribe/", { email });
      setStatus("success");
      setMessage(response.data.message || "Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      const errMsg = err.response?.data?.error || err.response?.data?.email?.[0] || "An error occurred. Please try again.";
      setMessage(errMsg);
    }
  };

  return (
    <footer className="bg-[#F6F6F7] padding-x py-16 max-container dark:bg-white">
      <div className="flex max-lg:gap-9 lg:gap-4 flex-wrap max-md:justify-center justify-between">
        <div className="w-[300px] flex flex-col gap-6 max-md:items-center">
          <h1 className="text-[#141624] text-2xl dark:text-[#141624] ">
            DevFolio
          </h1>

          <p className="text-[14px] text-[#696A75] leading-[1.5]  max-md:text-center dark:text-[#141624]">
            A blog platform for curious minds. We cover technology, lifestyle,
            business, travel and more — written by developers, thinkers and
            creators from around the world.
          </p>
        </div>

        <div className="text-[#141624] text-[14px] flex flex-col gap-4 px-4 max-md:items-center">
          <p className=" font-semibold text-[16px] dark:text-[#141624]">
            Quick Links
          </p>
          <ul className="flex flex-col gap-4  text-[#3B3C4A] max-md:items-center dark:text-[#141624]">
            <li><Link to="/" className="hover:text-[#4B6BFB] transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-[#4B6BFB] transition-colors">About</Link></li>
            <li><Link to="/" className="hover:text-[#4B6BFB] transition-colors">Blog</Link></li>
            <li><Link to="/archived" className="hover:text-[#4B6BFB] transition-colors">Archived</Link></li>
            <li><Link to="/author" className="hover:text-[#4B6BFB] transition-colors">Author</Link></li>
            <li><Link to="/contact" className="hover:text-[#4B6BFB] transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="text-[#141624] text-[14px] flex flex-col gap-4 px-4 max-md:items-center">
          <p className=" font-semibold text-[16px] dark:text-[#141624]">Category</p>
          <ul className="flex flex-col gap-4  text-[#3B3C4A] max-md:items-center dark:text-[#141624]">
            <li><Link to="/?category=lifestyle" className="hover:text-[#4B6BFB] transition-colors">Lifestyle</Link></li>
            <li><Link to="/?category=technology" className="hover:text-[#4B6BFB] transition-colors">Technology</Link></li>
            <li><Link to="/?category=travel" className="hover:text-[#4B6BFB] transition-colors">Travel</Link></li>
            <li><Link to="/?category=business" className="hover:text-[#4B6BFB] transition-colors">Business</Link></li>
            <li><Link to="/?category=economy" className="hover:text-[#4B6BFB] transition-colors">Economy</Link></li>
            <li><Link to="/?category=sports" className="hover:text-[#4B6BFB] transition-colors">Sports</Link></li>
          </ul>
        </div>

        <div className="bg-white w-[350px] px-6 flex flex-col items-center justify-center gap-2  rounded-lg dark:bg-white py-6">
          <h3 className="font-semibold text-xl  dark:text-[#141624]">
            Weekly Newsletter
          </h3>
          <p className="text-[#696A75] text-[16px] mb-5 dark:text-[#141624]">
            Get blog articles and offers via email
          </p>
          <form onSubmit={handleSubscribe} className="w-full flex flex-col gap-2">
            <div className="w-full relative">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="border border-[#DCDDDF] rounded-sm h-[40px] px-3 py-3 w-full text-[14px] dark:bg-white "
              />
              <CiMail className="absolute top-[12px] right-[10px] text-[16px] dark:text-[#141624]" />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-[#4B6BFB] text-white text-[16px] rounded-md w-full py-3 disabled:opacity-50 font-medium"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {message && (
            <p className={`text-xs mt-2 text-center font-medium ${status === "success" ? "text-green-600" : "text-red-500"}`}>
              {message}
            </p>
          )}
        </div>
      </div>

      <div className="py-3 flex items-center gap-6 max-md:mt-6 max-md:justify-center">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity"><FaInstagram className="dark:text-white text-[20px] text-[#141624]" /></a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity"><FaFacebookF className="dark:text-white text-[20px] text-[#141624]" /></a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity"><BsTwitterX className="dark:text-white text-[20px] text-[#141624]" /></a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity"><FaYoutube className="dark:text-white text-[20px] text-[#141624]" /></a>
      </div>
    </footer>
  )
}

export default Footer
