import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/UserSlice'
import axios from 'axios'

const Navbar = () => {

  let dispatch = useDispatch()
  let userStore = useSelector((state) => state.user);
  console.log(userStore)

  let login = userStore.login;

  const [searchUsers, setsearchUsers] = useState([]);
  console.log(searchUsers)
  const handleSearchChanger = async (e) => {
    // console.log(e.target.value)
    let value = e.target.value
    let res = await axios.get(`https://socalapp-backend.onrender.com/users/search?q=${value}`);
    let data = res.data;
    // console.log(data.users)
    setsearchUsers(data.users)
  }
  return (
    <div>


      <nav className="bg-gray-400 fixed z-50 top-0 left-0 right-0 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" className="h-8" alt="Flowbite Logo" /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BlogApp</span>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
              <span className="sr-only">Open user menu</span>
              {login === true ? <img className="w-8 h-8 rounded-full" src={userStore?.user?.profilePic} alt="user photo" />
                :
                <img className="w-8 h-8 rounded-full" src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="" />}
            </button>
            {/* Dropdown menu */}
            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
              {login === true && <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">{userStore.user?.name}</span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{userStore.user?.email}</span>
              </div>}
              <ul className="py-2" aria-labelledby="user-menu-button">
                {login === true && <li>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link>
                </li>}
                {login === false && <li>
                  <Link to="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Signup</Link>
                </li>}
                {login === false && <li>
                  <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log in</Link>
                </li>}
                {login === true && <li onClick={() => dispatch(logout())} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Log out
                </li>}
              </ul>
            </div>
            <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:items-center md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
              </li>
              <li className='relative'>
                <input type="text" onChange={handleSearchChanger} className='px-4 py-2 rounded-md outline-none border-2 border-gray-400' placeholder='search a friend...' />

                <div className='absolute top-full mt-1 w-full bg-white text-black'>
                  {
                    searchUsers?.map((ele) => {
                      return <Link state={ele._id} to={'/FriendProfile'} className='flex items-center gap-5 mt-3 p-2 cursor-pointer'>
                        <img className='w-10 h-10 rounded-full' src={ele.profilePic} alt="" />
                        <p>{ele.name}</p>
                      </Link>
                    })
                  }
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar
