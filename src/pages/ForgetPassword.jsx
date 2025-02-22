import axios from 'axios';
import React, { useRef, useState } from 'react'

const ForgetPassword = () => {
    const [msg, setmsg] = useState('');
    let emailRef = useRef()

    const handleSubmit = async()=>{
        let value = emailRef.current.value;
        console.log(value)
        let res = await axios.post('https://socalapp-backend.onrender.com/users/resetPassword',{email:value});
        let data = res.data;
        console.log(data)    
        setmsg(data.msg)   
    }
  return (
    <div className='dark:bg-slate-700 px-5 py-3 rounded-md mt-48 w-max mx-auto'>
        <h1 className='text-3xl mb-4'>{msg}</h1>
        <h1 className='text-white mb-3'>Forget password page</h1>
      <input ref={emailRef} type="text" className='px-3 py-2 rounded-md'  placeholder='enter your email'/>
      <button onClick={handleSubmit} className='bg-green-950 text-white px-3 py-2  rounded-md ml-5'>submit</button>
    </div>
  )
}

export default ForgetPassword
