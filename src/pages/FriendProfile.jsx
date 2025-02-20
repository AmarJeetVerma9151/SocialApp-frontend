
import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { FaCameraRetro } from "react-icons/fa";
// import UserProfileCard from '../components/UserProfileCard';
import { FaHeart } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

const FriendProfile = (props) => {

    // let userStore = useSelector((state)=>state.user);
    // let userDetails = userStore.user
    // console.log(userDetails)

  let location = useLocation();
  let userId = location.state

  const [userDetails, setuserDetails] = useState('');
    async function getUserDetails (){
        let res = await axios.get(`http://localhost:8080/users/getSingleUser/${userId}`);
        let data = res.data;
        console.log(data)
        setuserDetails(data.user)
    }

    useEffect(()=>{
        getUserDetails()
    },[userId])
  
const [userPics, setuserPics] = useState({
      coverPic:"",
      profilePic:""
    });
    console.log(userPics)

    const [likesCount, setlikesCount] = useState(0);
    const getLikes = (ans)=>{
        console.log(ans)
        setlikesCount(ans)
    }
    
  return (
    <div>
     
      

<div className=" mx-auto w-[90%] bg-white shadow-xl rounded-lg text-gray-900">
  <div className="rounded-t-lg h-64 overflow-hidden relative">
    
    <img className="object-cover object-top w-full" src={ userDetails?.coverPic} alt="Mountain" />
  </div>
  <div className="mx-auto  w-32 h-32 relative -mt-16 border-4 border-white rounded-full ">
  
    <img className="object-cover object-center w-full h-full rounded-full" src={userDetails?.profilePic} alt="Woman looking front" />
  </div>
  <div className="text-center mt-2">
    <h2 className="font-semibold">{userDetails?.name}</h2>
    <p className="text-gray-500">{userDetails?.bio?userDetails?.bio:'enter a bio'}</p>
  </div>
  <ul className="py-4 mt-2 text-gray-700 flex items-center  justify-around">
    <li className="flex flex-col items-center justify-around">
    <p className='font-bold'>Followings</p>
    <div>{userDetails?.followings?.length}</div>
    </li>
    <li className="flex flex-col items-center -ms-10 justify-between">
     
      <p className='font-bold'>Followers</p>
      <div>{userDetails?.followers?.length}</div>
    </li>
    <li className="flex flex-col items-center justify-around">
     
      <FaHeart size={30} color='red'/>
      <div>{likesCount}</div>
    </li>
  </ul>

</div>

<div className='flex gap-5 mt-4 mx-auto w-[90%]'>


    <div>
      {/* <UserProfileCard getLikes={getLikes}/> */}
    </div>
</div>

      
    </div>
  )
}

export default FriendProfile
