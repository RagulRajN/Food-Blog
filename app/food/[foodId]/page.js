"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from 'react-hot-toast'
import { useState } from "react";
import Header from "../../components/header";
import { useFoodContext } from "@/app/context/FoodContext";

const Food = () => {
  const params = useParams();
  const {data,setData}=useFoodContext();
  const fooddetails = data[params.foodId-1];
  const slicedata = data.slice(0, 8);
  const [count,setCount]=useState(1);
  
  const handlAddToCart=()=>{  
    toast.success('Added To Cart!', {
      duration: 4000,
      position: 'top-right',
      style: {
        background: 'rgb(254,154,0)',
        color: 'black',
      },
    });
  } 
  const handleBuy=()=>{
    toast.success('Order Placed',{
      duration:4000,
      position:'top-right',
      style:{
        background:'rgb(0,255,0)',
        color:'black',
        fontSize:'16px',
      },
    });
  }
  return (
  <div className="bg-white w-full min-h-screen text-black px-4 py-6 sm:px-8 md:px-16 overflow-x-hidden">
  <Header />
  <hr className="border-gray-700 border-2 rounded-full my-4" />

  <div className="flex flex-col md:flex-row gap-10">
   
    <div className="flex-1">
       <div className="p-4 max-w-8xl mx-auto">
  <div className="border border-gray-200 p-6 rounded-xl bg-white shadow-md">

   
    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-black">{fooddetails.shop}</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="flex flex-col gap-2 text-orange-400 text-lg sm:text-xl font-bold justify-center">
        <h1>{fooddetails.name}</h1>              
        <h2>Preparation Time: {fooddetails.prepTime}</h2>

        <div className="flex flex-wrap items-center text-orange-400 gap-4 text-gray-300 mt-6">
          <span>{fooddetails.rating} ⭐</span>
          <span className="text-black-100 text-2xl font-bold">
            ₹{fooddetails.price * count}
          </span>
        </div>

        <div className="flex gap-4 items-center my-4">
          <button
            onClick={() => count > 1 && setCount(count - 1)}
            className="text-xl bg-gray-700 px-3 py-1 rounded"
          >
            {count === 1 ? "🗑" : "-"}
          </button>
          <span className="text-xl text-black">{count}</span>
          <button
            onClick={() => setCount(count + 1)}
            className="text-xl bg-gray-700 px-3 py-1 rounded"
          >
            +
          </button>
        </div>

        <div className="text-gray-400 ">
          <h1>
            Category: <span className="text-black">{fooddetails.category}</span>
          </h1>
          <h1>
            Special Style: <span className="text-black">{fooddetails.location}</span>
          </h1>
          <h1>
            Type:{" "}
            <span className="text-black">{fooddetails.veg ? "Veg" : "Non Veg"}</span>
          </h1>
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <img
          src={fooddetails.image}
          alt={fooddetails.name}
          className="h-[200px] sm:h-[400px] w-full sm:w-[400px] object-cover rounded-lg border-4 border-[rgb(95,107,131)]"
        />
      </div>
    </div>

    <div className="flex flex-col sm:flex-row gap-4 mt-4">
      <button
        onClick={handleBuy}
        className="bg-[#e23744] hover:bg-[#c52e3a] px-4 py-2 rounded-md text-white w-full sm:w-auto"

      >
        Buy now
      </button>
      <button
        onClick={handlAddToCart}
        className="bg-amber-400 hover:bg-amber-500 px-4 py-2 rounded-md text-black w-full sm:w-auto"
      >
        Add To Cart
      </button>
    </div>
  </div>
</div>



      
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-4 ">Recommended (8)</h1>
        <div className="space-y-4 ">
          {slicedata.map((el, i) => (
            <Link key={i} href={`/food/${el.id}`}>
                    <div className="flex flex-col my-5 sm:flex-row justify-between items-center gap-6 bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                <div>
                  <h1 className="text-black font-semibold">{el.name}</h1>
                  <h2 className="text-orange-300 text-xl mt-1">₹{el.price}</h2>
                  <p>Shop: {el.shop}</p>
                  <p>Category: {el.category}</p>
                </div>
                <img src={el.image} className="w-24 h-24 object-cover rounded-md" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>

    
    
  </div>
</div>

  );
};

export default Food;
