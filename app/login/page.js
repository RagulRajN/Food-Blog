"use client"
import { useState } from "react"
import  {useRouter } from "next/navigation";

const Login = () => {
    const [email,setEmail]=useState("");
    const router=useRouter();
    const admin={email:"admin@gmail.com",password:"123"};
    var canedit=false;
    const [password,setPassword]=useState("");
    if(localStorage.getItem('islogined')){
        router.push('/food')
    }
    const login=(e)=>{
        console.log('hi')
        console.log(email)
        console.log(password)
        localStorage.removeItem('islogined')
        localStorage.removeItem('canedit')
        if(password=='123'){
            localStorage.setItem('islogined','true')
            router.push('/food')

        }
        else{
            alert('Wrong Password.Cannout able to login')
        }
    }
  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
  <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-2xl">
    <h1 className="text-4xl font-bold mb-8 text-center text-white">Login</h1>
    <form onSubmit={(e) => { e.preventDefault(); login(); }} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-between items-center mt-6">
        <input
          type="submit"
          value="Login"
          className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg font-semibold cursor-pointer"
        />
        <button
          type="reset"
          className="bg-red-600 hover:bg-red-700 transition px-6 py-2 rounded-lg font-semibold"
        >
          Reset
        </button>
      </div>
    </form>
  </div>
</div>

  )
}

export default Login