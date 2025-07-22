import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaHeart } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";

const   UserProfileCard = (props) => {

    let userStore = useSelector((state)=>state.user);
    let user = userStore.user
    console.log(userStore)

    const [allPosts, setallPosts] = useState([]);
    console.log(allPosts)

      let likesLength = 0
    allPosts?.forEach((post)=>{
       likesLength = likesLength+ post.likes.length
    })
    console.log(likesLength)

    props.getLikes(likesLength)

    const getUserPost = async()=>{
        let res = await axios.get(`https://socalapp-backend.onrender.com/posts/userPost/${user._id}`)
        let data = res.data
        console.log(data)
        setallPosts(data.posts)
    }

    useEffect(()=>{
        getUserPost()
    },[])
    
    const handleLike = async(postId)=>{
      console.log("running")
      console.log(postId)
      let res = await axios.get(`https://socalapp-backend.onrender.com/posts/like/${postId}`,{
        headers:{
          'Authorization':userStore.token
        }
      })
  
      let data = res.data;
      console.log(data)
      getUserPost()
      // getAllUserPost()
    }
  
  return (
    <div>
      
      {
        allPosts.map((ele)=>{
            return <article className="relative flex  bg-white transition hover:shadow-xl mb-4">

                <div className='absolute right-4 top-4'>
                   <span className='flex'> <FaHeart color={ele.likes.includes(userStore.user._id)?'red':''} onClick={()=>handleLike(ele._id)} size={25}/> <sup>{ele.likes.length}</sup></span>
                    <span className='flex mt-6'><GoCommentDiscussion size={25} /> <sub>{ele.comments.length}</sub></span>
                </div>
          
          
            <div className="hidden sm:block sm:basis-56">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                className="aspect-square h-full w-full object-cover"
              />
            </div>
          
            <div className="flex flex-1 flex-col justify-between">
              <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                <a href="#">
                  <h3 className="font-bold uppercase text-gray-900">
                    {ele.title}
                  </h3>
                </a>
          
                <p className="mt-2 line-clamp-3 gap-2 text-sm/relaxed text-gray-700">
                 {ele.description}
                </p>
              </div>
          
              <div className="sm:flex sm:items-end sm:justify-end">
                <a
                  href="#"
                  className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                >
                  Read Post
                </a>
              </div>
            </div>
          </article>
        })
      }
    </div>
  )
}

export default UserProfileCard
