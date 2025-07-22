import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import Style from './Home.module.css'
import { formatDistanceToNow } from 'date-fns';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaHeart } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import {  Modal } from 'antd';
import { IoSend } from "react-icons/io5";

// Import Swiper styles
import 'swiper/css';
import { toast } from 'react-toastify';
const Home = () => {
 
  
  let userStore = useSelector((state) => state.user)
  console.log(userStore)

  const [AllPosts, setAllPosts] = useState([]);
  console.log(AllPosts)

  const getAllUserPost = async () => {
    let res = await axios.get('https://socalapp-backend.onrender.com/posts/getAllpost');
    let data = res.data;
    // console.log(data)
    setAllPosts(res.data.post)
  }

  useEffect(() => {
    getAllUserPost()
  }, [])


  const handleLikes = async(postId)=>{
    console.log("running")
    console.log(postId)
    let res = await axios.get(`https://socalapp-backend.onrender.com/posts/like/${postId}`,{
      headers:{
        'Authorization':userStore.token
      }
    })

    let data = res.data;
    console.log(data)
    getAllUserPost()
  }


  //Comment code starts here*************************************************************
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [selectedPost, setselectedPost] = useState("");
  console.log(selectedPost)
  
  const commentClicked = (obj)=>{
    // console.log(obj)
    setselectedPost(obj)
    setIsModalOpen(true);
  }

  const [commentValue, setcommentValue] = useState("");
  const handleCommentChanger = (e)=>{
    let value = e.target.value;
    // console.log(value)
    setcommentValue(value)
  }

  const handleCommentSubmit = async(postId)=>{
    // console.log(postId)
    //   console.log(commentValue)
      let res = await  axios.post(`https://socalapp-backend.onrender.com/posts/comment/${postId}`,{text:commentValue},{
        headers:{
          'Authorization':userStore.token
        }
      })

      let data = res.data;
      console.log(data);

      if(data.success){
        toast.success('comment added successfully',{position:"bottom-right",theme:'dark'})
        getAllUserPost()
        setcommentValue('')
      }

      // console.log("running")
  }

  return (
    <div>



      <div className='flex gap-2 mt-0'>
        <div className='flex-1'>
        <Sidebar    getAllUserPost={  getAllUserPost}/>
        </div>
     
          <section className="w-[900%]  bg-slate-500">
            <div className="container px-6 py-8 mx-auto ">

              <div className="w-full flex flex-col items-center ">
                {
                  AllPosts.map((ele) => {
                    

          
                    return <div className="w-[50%] relative overflow-hidden mb-3 bg-slate-200 rounded-lg shadow-md dark:bg-gray-800">

                      <div className="iconBox z-10 absolute right-6 top-3 flex flex-col justify-center text-center">
                     <span className='flex justify-center'> <FaHeart onClick={()=>handleLikes(ele._id)} color={ele.likes.includes(userStore.user._id)?'red':''} size={30} /> <sub>{ele.likes.length}</sub></span>
                     <p>likes</p>
                     <GoCommentDiscussion onClick={()=>commentClicked(ele)} size={30} className='mt-5 mx-auto'/>
                     <p>comments</p>
                      </div>
                      <div className="mt-4">
      <div className="flex items-center">
        
        <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">{formatDistanceToNow(ele.createdAt, { addSuffix: true })}</span>
      </div>
    </div>

  <Swiper
      spaceBetween={50}
      slidesPerView={1}
    >
     
      {ele.file.map((data) => {
        return <SwiperSlide>
         {data.resource_type === 'image' ? <img className="object-contain w-full h-64" src={data.url} alt="" /> : <video className="object-contain w-[80%] mx-auto h-64" controls src={data.url}></video>}
         </SwiperSlide>
                      
                      })}
      
    </Swiper>

      


  <div className="p-6">
    <div>
      <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">Product</span>
      <a href="#" className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline" tabIndex={0} role="link">{ele.title}</a>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{ele.description}</p>
    </div>
   
    <div className='flex items-center gap-2 my-3 text-white'>
         <img  className='w-10 h-10 rounded-full' src={userStore.user.profilePic} alt="" />
         <input value={commentValue} onChange={handleCommentChanger} type="text" className='w-full bg-transparent border-2 border-gray-400 outline-none px-4 py-2 rounded-md'  placeholder='enter a comment...'/>
         <button onClick={()=>handleCommentSubmit(ele._id)}><IoSend size={25} color='green'/></button>
         </div>
  </div>

  

</div>

                  })
                }

              </div>
            </div>
          </section>

       
      </div>
      <Modal title="Comments" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
        
      
        <div className="space-y-4">
          {selectedPost?.comments?.length > 0 ? (
            selectedPost.comments.map((obj) => (
              <div
                key={obj._id}
                className="p-3 bg-gray-100 rounded-md shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <img src={obj.user.profilePic} className='w-7 h-7 rounded-full mr-5' alt="" />
                  <span className="font-medium text-gray-800">{obj.user.name}</span>
                  {/* <span className="text-xs text-gray-500">{comment.timestamp}</span> */}
                </div>
                <p className="mt-2 text-gray-700">{obj.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
        </Modal>
    </div>
  )
}

export default Home
