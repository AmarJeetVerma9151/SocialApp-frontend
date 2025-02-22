
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
import { updateUser } from './store/UserSlice'
import ForgetPassword from './pages/ForgetPassword'
import Profile from './pages/Profile'
import FriendProfile from './pages/FriendProfile'

function App() {
  
  let dispatch = useDispatch()

  let userStore = useSelector((state)=>state.user);
  // console.log(userStore)
  let login = userStore.login;
  // console.log(login)

  const getUserDetails = async()=>{
    let res = await axios.get('https://socalapp-backend.onrender.com/users/getUser',{
      headers:{
        'Authorization':userStore.token
      }
    })
    let data = res.data;
    // console.log(data)
    dispatch(updateUser(data))
  }

  useEffect(()=>{
   if(userStore.token){
    getUserDetails()
   }
  },[userStore.token])


  return (
    <>
      <BrowserRouter>
     <div className='mb-[60px] '>
     <Navbar/>
     </div>
        <Routes>
            <Route path='/' element={login===true?<Home/>:<Navigate to={'/login'}/>}/>
            <Route path='/login' element={login===false?<Login/>:<Navigate to={'/'}/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/profile' element={login===true? <Profile getUserDetails={getUserDetails}/> :<Navigate to={'/login'}/>}/>
            <Route path='/forget-password' element={<ForgetPassword/>}/>
            <Route path='/friendProfile' element={<FriendProfile/>}/>
        </Routes>

        <ToastContainer/>
      </BrowserRouter>
    </>
  )
}

export default App
