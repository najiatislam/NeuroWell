import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Form } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const [state,setState] = useState('Admin')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const {setAToken,backendUrl} = useContext(AdminContext)

    const onSubmitHandler = async (event) => {

        event.preventDefault() //to not reload the webpage

        try {
            //API call
            if (state === 'Admin') {

                const {data} = await axios.post(backendUrl + '/api/admin/login', {email,password})
                
                if (data.success) {
                    localStorage.setItem('aToken',data.token)
                    setAToken(data.token);        
                } else  {
                    toast.error(data.message)
                }

            } else{

            }
        } catch (error) {
            
        }

    }


    


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex item-center'>
        <div className='flex flex-col gap-3 m-auto item-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-700 text-sm shadow-lg'>
            <p className='text-2xl font-semiboldm m-auto'><span className='text-primary'>{state}</span>Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-zinc-400 rounded w-full p-2 mt-1' type="email" required />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-zinc-400 rounded w-full p-2 mt-1' type="password" required />
            </div>
            <button className='bg-slate-700 text-white w-full py-2 rounded-md text-base'>Login</button>
            {
          state === 'Admin' 
          ? <p>Doctor Login?<span onClick={()=> setState('Doctor')} className='text-slate-700 underline cursor-pointer'>Click here</span> </p>
          : <p>Admin Login? <span onClick={()=> setState('Admin')} className='text-slate-700 underline cursor-pointer'>Click here</span></p>
        }
        </div>
    </form>
  )
}

export default Login