import Badge from "@/ui_components/Badge"
import BlogWriter from "@/ui_components/BlogWriter"
import banner from "../images/detailBanner.jpg"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import Spinner from "@/ui_components/Spinner"
import { getBlog } from "@/services/apiBlog"
import { Base_URL } from "@/api"



const DetailPage = () => {

  const { slug } = useParams()

  const { isPending,
    isError,
    error,
    data: blog,

  } = useQuery({
    queryKey: ['blogs', slug],
    queryFn: () => getBlog(slug),
  })

  if (isPending) {
    return <Spinner />
  }

  return (
    <div className="padding-dx max-container py-9">
      <Badge blog={blog} />

      <div className="flex justify-between items-center">
        <h2 className="py-6 leading-normal text-2xl md:text-3xl text-[#181A2A] tracking-wide font-semibold dark:text-[#FFFFFF]">
          Build and Ecommerce Web App with Django and React
        </h2>
      </div>

      <BlogWriter blog={blog} />

      <div className="w-full h-[350px] my-9 overflow-hidden rounded-sm">
        <img className="w-full h-full object-cover rounded-sm"
          src={`${Base_URL}${blog.featured_image}`}
        />
      </div>
      <p className="text-[16px] leading-[2rem] text-justify text-[#3B3C4A] dark:text-[#BABABF]">
        {blog.content}
      </p>
    </div>
  )
}

export default DetailPage