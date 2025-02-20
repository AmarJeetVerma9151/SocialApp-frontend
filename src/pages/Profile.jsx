
import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaCameraRetro } from "react-icons/fa";
import UserProfileCard from '../components/UserProfileCard';
import { FaHeart } from "react-icons/fa";

const Profile = (props) => {

    let userStore = useSelector((state)=>state.user);
    let userDetails = userStore.user
    console.log(userDetails)

    const [details, setdetails] = useState({
        name:userDetails.name? userDetails.name:'',
        email:userDetails.email? userDetails.email:'',
        password:userDetails.password? userDetails.password:'',
        bio:userDetails.bio? userDetails.bio:'',
    });

    console.log(details)

    const handleInputChanger = (e)=>{
        let name = e.target.name;
        let value = e.target.value

        setdetails({...details,[name]:value})
        // setdetails=""
    }
    

    const handleSubmit= async(e)=>{
        e.preventDefault();
        let res = await axios.put(`http://localhost:8080/users/update/${userDetails._id}`,details);
        let data = res.data
        console.log(data)
        if(data.success){
          props.getUserDetails()
        }

    }

    const [userPics, setuserPics] = useState({
      coverPic:"",
      profilePic:""
    });
    console.log(userPics)

    const handleCoverChanger=(e)=>{
      let file = e.target.files[0];
      console.log(file);

      let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload=async()=>{
          console.log(reader.result)

          setuserPics({...userPics,coverPic:reader.result})
          let res = await axios.put(`http://localhost:8080/users/update/${userDetails._id}`,{coverPic:reader.result});
          let data = res.data
          console.log(data)
          if(data.success){
            props.getUserDetails()
          }

        }

        reader.onerror=()=>{
          console.log(reader.error)
        }
    }


    const handleProfileChanger = (e)=>{
  let file = e.target.files[0];
      console.log(file);

      let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload=async()=>{
          console.log(reader.result)

          setuserPics({...userPics,profilePic:reader.result})
          let res = await axios.put(`http://localhost:8080/users/update/${userDetails._id}`,{profilePic:reader.result});
          let data = res.data
          console.log(data)
          if(data.success){
            props.getUserDetails()
          }

        }

        reader.onerror=()=>{
          console.log(reader.error)
        }
    }

    const [likesCount, setlikesCount] = useState(0);
    const getLikes = (ans)=>{
        console.log(ans)
        setlikesCount(ans)
    }
    
  return (
    <div>
     
      

<div className=" mx-auto w-[90%] bg-white shadow-xl rounded-lg text-gray-900">
  <div className="rounded-t-lg h-64 overflow-hidden relative">
    <div className='absolute right-8 bottom-6 cursor-pointer'>
      <label htmlFor="cover"><FaCameraRetro className='cursor-pointer' color='white' size={30}/></label>
      <input onChange={handleCoverChanger} type="file" id='cover' hidden />
    </div>
    <img className="object-cover object-top w-full" src={userPics.coverPic? userPics.coverPic : userDetails.coverPic} alt="Mountain" />
  </div>
  <div className="mx-auto  w-32 h-32 relative -mt-16 border-4 border-white rounded-full ">
  <div className='absolute right-0 top-1 cursor-pointer'>
      <label htmlFor="profile"><FaCameraRetro className='cursor-pointer' color='black' size={25}/></label>
      <input onChange={handleProfileChanger} type="file" id='profile' hidden />
    </div>
    <img className="object-cover object-center h-32 w-[100%] rounded-full" src={userPics.profilePic? userPics.profilePic : userDetails.profilePic} alt="Woman looking front" />
  </div>
  <div className="text-center mt-2">
    <h2 className="font-semibold">{userDetails.name}</h2>
    <p className="text-gray-500">{userDetails.bio?userDetails.bio:'enter a bio'}</p>
  </div>
  <ul className="py-4 mt-2 text-gray-700 flex items-center  justify-around">
    <li className="flex flex-col items-center justify-around">
    <p className='font-bold'>Followings</p>
    <div>{userDetails.followings.length}</div>
    </li>
    <li className="flex flex-col items-center -ms-10 justify-between">
      {/* <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
      </svg> */}
      <p className='font-bold'>Followers</p>
      <div>{userDetails.followers.length}</div>
    </li>
    <li className="flex flex-col items-center justify-around">
      {/* <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
      </svg> */}
      <FaHeart size={30} color='red'/>
      <div>{likesCount}</div>
    </li>
  </ul>
  {/* <div className="p-4 border-t mx-8 mt-2">
    <button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Follow</button>
  </div> */}
</div>

<div className='flex gap-5 mt-4 mx-auto w-[90%]'>
    <div className='bg-red-400 p-10 rounded-lg'>
        <label className=' w-[100px] mt-2 inline-block' htmlFor="">UserName:</label>
        <input onChange={handleInputChanger} name='name' className='px-3 py-1 border-2 border-gray-300 rounded-md outline-none' value={details.name} type="text" /><br />
        <label className=' w-[100px] mt-2 inline-block' htmlFor="">Email:</label>
        <input className='px-3 py-1 border-2 border-gray-300 rounded-md outline-none' name='email' disabled value={details.email} type="email" /><br />
        <label className=' w-[100px] mt-2 inline-block' htmlFor="">Password:</label>
        <input onChange={handleInputChanger} name='password' className='px-3 py-1 border-2 border-gray-300 rounded-md outline-none' value={details.password} type="password" /><br />
        <label className=' w-[100px] mt-2 inline-block' htmlFor="">Bio:</label>
        <input onChange={handleInputChanger} name='bio' className='px-3 py-1 border-2 border-gray-300 rounded-md outline-none' value={details.bio} type="text" /><br />
        <button onClick={handleSubmit} className='bg-green-800 text-white w-full rounded-md px-3 py-2 text-center self-center place-self-center items-center content-center hover:bg-green-950 mt-3 mx-auto inline-block'>Update Details</button>
    </div>

    <div>
      <UserProfileCard getLikes={getLikes}/>
    </div>
</div>

      
    </div>
  )
}

export default Profile
