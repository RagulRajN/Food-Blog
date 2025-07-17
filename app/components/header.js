import Link from "next/link"
import { useState, useEffect } from "react"

const Header = () => {
  const [toogle, setToogle] = useState(false);
  const [islogined, setIsLogined] = useState(false);

  useEffect(() => {
    setIsLogined(!!localStorage.getItem("islogined"));
  }, []);

  const handleToggle = () => {
    setToogle(!toogle);
  };

  const handleLogout = () => {
    localStorage.removeItem("islogined");
    localStorage.removeItem("canedit");
    setIsLogined(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[rgb(31,39,55)] text-white shadow-lg">
      <div className="flex justify-between items-center px-6 py-3">
        
        <div className="flex items-center gap-2">
          <img src="/assets/capicon.png" className="w-10 h-10" alt="logo" />
          <span className="text-xl font-bold text-orange-400">FoodieSpot</span>
        </div>

        <button onClick={handleToggle} className="sm:hidden text-3xl focus:outline-none">
          ☰
        </button>

        <nav className="hidden sm:flex gap-8 text-gray-300 text-[18px] items-center">
          <Link href={'/food'}><h1 className="hover:text-white cursor-pointer" >Home</h1></Link>
          
          <Link href={'/adminlogin'}>
            <h1
              onClick={handleLogout}
              className="bg-green-600 hover:bg-green-500 px-4 py-1 rounded-full text-white text-sm transition"
            >
              {islogined ? "Logout" : "Login"}
            </h1>
          </Link>
        </nav>
      </div>

      {toogle && (
        <div className="sm:hidden flex flex-col px-6 pb-4 gap-4 bg-[rgb(31,39,55)] text-gray-300 text-[18px]">
           <Link href={'/food'}> <h1 className="hover:text-white cursor-pointer">Home</h1></Link>
          <h1 className="hover:text-white cursor-pointer">Help</h1>
          <h1 className="flex items-center hover:text-white cursor-pointer gap-1">
            Cart
            <img src="/assets/carticon.png" className="w-4 h-4" alt="cart" />
          </h1>
          <Link href={'/login'}>
            <h1
              onClick={handleLogout}
              className="bg-green-600 hover:bg-green-500 w-fit px-4 py-1 rounded-full text-white text-sm transition"
            >
              {islogined ? "Logout" : "Login"}
            </h1>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
