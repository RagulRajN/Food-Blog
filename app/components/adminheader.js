"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

const AdminHeader = () => {
  const [isadminlogined, setIsAdminLogined] = useState(false)

  useEffect(() => {
    // This runs only on client side
    setIsAdminLogined(localStorage.getItem('isadminlogined'))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isadminlogined')
    localStorage.removeItem('canedit')
  }

  return (
    <div className="flex justify-between items-center relative top-3 right-6 w-full h-16 px-12 bg-[rgb(31,39,55)] text-white shadow-lg backdrop-blur-md mx-6">
      <div className="flex items-center gap-3">
        <img src="/assets/capicon.png" className="w-10 h-10" alt="logo" />
        <span className="text-xl font-bold text-orange-400 tracking-wide">FoodCart</span>
      </div>

      <nav className="flex gap-10 items-center text-gray-300 text-[20px] font-medium">
        <Link href={'/login'}>
          <h1
            onClick={handleLogout}
            className="bg-green-600 hover:bg-green-500 px-4 py-1 rounded-full text-white text-sm transition duration-200"
          >
            {isadminlogined ? 'Logout' : 'Login'}
          </h1>
        </Link>
      </nav>
    </div>
  )
}

export default AdminHeader