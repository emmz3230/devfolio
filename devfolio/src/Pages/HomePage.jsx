import React, {useState} from 'react'
import BlogContainer from '@/ui_components/BlogContainer';
import Header from '@/ui_components/Header';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getBlogs } from '@/services/apiBlog';
import PagePagination from '@/ui_components/PagePagination';


const HomePage = () => {

  const [Page, setPage] = useState(1);
  const numOfBlogPerPages = 3;

  const { isLoading: isPending, isError, error, data} = useQuery({
    queryKey: ["blogs", Page],
    queryFn: () => getBlogs(Page),
    placeholderData: keepPreviousData
  })

  const blogs = data?.results || [];
  const numOfPages = Math.ceil(data?.count/numOfBlogPerPages)

  console.log(blogs)
  
  return (
    <>
      <Header />
     <BlogContainer  isPending= {isPending} blogs={blogs}/>
     <PagePagination  increasePageValue={increasePageValue}
        decreasePageValue={decreasePageValue}
        page={page}
        numOfPages={numOfPages}
        handleSetPage={handleSetPage}/>
    </>
  )
}

export default HomePage
