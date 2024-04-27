'use client'
import { loginUser } from '@/services/auth/loginService'
import React, { useState } from 'react'
import { io } from 'socket.io-client';
// import { socket } from '../components/WebSocketProvider'
const socket = io('http://localhost:3000'); // Replace with your server URL

const page = () => {

    const [details, setDetails] = useState({
        email: '',
        password: '',
        type: 'superAdmin'
    })

const handleLogin = async (e: { preventDefault: () => void }) =>{
e.preventDefault()

try{
    const res = await loginUser(details)
    if(res){
        sessionStorage.setItem('schoolSystemUser', JSON.stringify(res))
        socket.emit('joinRoom', {schoolId: res.user.schoolId});
    }

}

catch(err){
    console.log(err)
}


}


  return (
    <div>
      <form onSubmit={handleLogin} className='flex flex-col gap-3 bg-zinc-400 max-w-[400px] text-black'>

    <input type="text" className='text-black'  onChange={(e)=>{
        setDetails({...details, email: e.target.value})
    }}/>
    <input type="text" className='text-black'  name="" onChange={(e)=>{
        setDetails({...details, password: e.target.value})
    }} id="" />

    <button>Submit</button>

      </form>
    </div>
  )
}

export default page
