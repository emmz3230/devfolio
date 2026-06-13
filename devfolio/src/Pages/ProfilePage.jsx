import BlogContainer from "@/ui_components/BlogContainer.jsx";
import Hero from "@/ui_components/Hero";
import Spinner from "@/ui_components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Modal from "@/ui_components/Modal";
import SignupPage from "@/Pages/SignupPage";
import { useState } from "react";
import { getUserINfo as getUserInfo } from "@/services/apiBlog";


const ProfilePage = ({ authUsername }) => {

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => {
    setShowModal((curr) => !curr)
  }


  const { username } = useParams()

  const { isPending, isError, data } = useQuery({
    queryKey: ["users", username],
    queryFn: () => getUserInfo(username)
  })

  const blogs = data?.author_posts

  if (isPending) {
    return <Spinner />
  }

  if (isError || !data) {
    return <p className="text-center py-10 text-red-500">Could not load profile. Please try again.</p>
  }


  return (
    <>
      <Hero userInfo={data} authUsername={authUsername} toggleModal={toggleModal} />
      <BlogContainer blogs={blogs} title={`🍔${username}`} />

      {showModal && <Modal toggleModal={toggleModal}>
        <SignupPage userInfo={data} updateForm={true} toggleModal={toggleModal} />
      </Modal>
      }
    </>
  );
};

export default ProfilePage;