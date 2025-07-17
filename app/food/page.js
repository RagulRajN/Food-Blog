"use client";
import { useEffect, useState } from "react";
import Header from "../components/header";
import Link from "next/link";
import { useFoodContext } from "../context/FoodContext";
import AdminHeader from "../components/adminheader";

const FoodApi = () => {
  const [val, setVal] = useState(0);
  const [editkey, seteditKey] = useState(-1);
  const [isnowCreate, setisnowCreate] = useState(false);
  const {data,setData}=useFoodContext();
  const [food, setFood] = useState({
    id: '',
    name: '',
    shop: '',
    category: '',
    price: '',
    rating: '',
    location: '',
    reviews: '',
    prepTime: '',
    image: ''
  });

  useEffect(() => {
    if (editkey > 0) {
      const selectedFood = data.find(item => item.id === editkey);
      if (selectedFood) {
        setFood(selectedFood);
      }
    }
  }, [editkey, data]);

  function createFood() {
    setFood({
      id: '',
      name: '',
      shop: '',
      category: '',
      price: '',
      rating: '',
      location: '',
      reviews: '',
      prepTime: '',
      image: ''
    });
    setisnowCreate(true);
    seteditKey(-1);
  }

  function handleSave() {
    if (editkey > 0) {
      
      setData(prev => prev.map(item => item.id === food.id ? food : item));
    } else {
     
      const newId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
      setData(prev => [...prev, { ...food, id: newId }]);
    }
    setisnowCreate(false);
    seteditKey(-1);
  }

  function handleDelete(id) {
    setData(prev => prev.filter(item => item.id !== id));
  }

  const foods = data.slice(val, val + 4);
  const canedit = localStorage.getItem('canedit') === 'true';

  const [isedit, setIsEdit] = useState(false);

  return (
    <div className="w-full z-5  relative bottom-3">
      {!canedit ? (
              <div className="bg-white pb-15 min-h-screen text-black">
          <Header />
          <div className="">
            <div className="flex items-center justify-between mb-4 px-6 mt-2">
                <h1 className="font-bold text-3xl text-yellow-400 bg-gray-600 px-4 py-4 rounded-lg w-full text-center mt-20 sm:mt-20 font-serif shadow">
                  Top Deals Today
                </h1>
             
            </div>

         
          </div>

          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 px-6">
              {data.map((el, i) => {
                return (
                  <div key={i} className="mx-6 my-3 sm:w-70 bg-[#f38f46] rounded-[10px] text-black font-semibold">

                    <Link href={`/food/${el.id - 1}`}>
                      <img src={el.image} alt="" className="w-full max-w-xs sm:max-w-full h-60 p-4 object-cover mt-2 mx-auto mb-2" />
                    
                    <div className="text-center">
                      <p className="text-gray-900 text-xl font-bold">{el.name}</p>
                     <div className="grid grid-cols-1 sm:grid-cols-2">
                       <p className=" text-[rgba(255,255,255,0.96)] font-medium">&#8377; {el.price} </p>
                       <h4 className="px-5 rounded-[20px] text-yellow-200 text-lg ">{el.rating} ⭐ </h4>
                     </div>
                      
                    </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-white text-black">

          <div className="bg-white text-black mb-5">
            <AdminHeader />
          </div>
          <div>
            <h1
              className="bg-orange-500 hover:bg-orange-600  text-white font-serif text-2xl font-bold text-center  float-end relative top-5 right-30 p-1 rounded-2xl w-30 cursor-pointer"
              onClick={createFood}
            >
              Create +
            </h1>
          </div>

        
          {isnowCreate && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white text-black p-6 rounded-lg w-1/2 max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">
                  {editkey > 0 ? 'Edit Food Item' : 'Create New Food Item'}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Name</label>
                    <input
                      className="w-full border border-gray-300 bg-[#f9f9f9] rounded-lg px-4 py-2 text-black"

                      value={food.name}
                      onChange={(e) => setFood({ ...food, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Shop</label>
                    <input
                      className="w-full border border-gray-300 bg-[#f9f9f9] rounded-lg px-4 py-2 text-black"

                      value={food.shop}
                      onChange={(e) => setFood({ ...food, shop: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Category</label>
                    <input
                      className="w-full border border-gray-600 bg-[#4a4545] rounded-lg px-4 py-2 text-white"
                      value={food.category}
                      onChange={(e) => setFood({ ...food, category: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Price</label>
                    <input
                      className="w-full border border-gray-600 bg-[#4a4545] rounded-lg px-4 py-2 text-white"
                      value={food.price}
                      onChange={(e) => setFood({ ...food, price: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Rating</label>
                    <input
                      className="w-full border border-gray-600 bg-[#4a4545] rounded-lg px-4 py-2 text-white"
                      value={food.rating} readOnly
                      onChange={(e) => setFood({ ...food, rating: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Location</label>
                    <input
                      className="w-full border border-gray-600 bg-[#4a4545] rounded-lg px-4 py-2 text-white"
                      value={food.location}
                      onChange={(e) => setFood({ ...food, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Preparation Time</label>
                    <input
                      className="w-full border border-gray-600 bg-[#4a4545] rounded-lg px-4 py-2 text-white"
                      value={food.prepTime}
                      onChange={(e) => setFood({ ...food, prepTime: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Image URL</label>
                    <input
                      className="w-full border border-gray-600 bg-[#4a4545] rounded-lg px-4 py-2 text-white"
                      value={food.image}
                      onChange={(e) => setFood({ ...food, image: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    className="bg-gray-500 px-4 py-2 rounded-lg"
                    onClick={() => setisnowCreate(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-600 px-4 py-2 rounded-lg"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          <table className="relative mt-26 ml-20 w-270">
            <thead>
              <tr className="text-white-600 h-5">
                <th className="border text-center p-2 w-4 border-gray-400">Id</th>
                <th className="border text-center p-2 w-30 border-gray-400">Name</th>
                <th className="border text-center p-2 w-30 border-gray-400">Shop</th>
                <th className="border text-center p-2 w-30 border-gray-400">Category</th>
                <th className="border text-center p-2 w-30 border-gray-400">Price</th>
                <th className="border text-center p-2 w-30 border-gray-400">Rating</th>
                <th className="border text-center p-2 w-30 border-gray-400">Location</th>
                <th className="border text-center p-2 w-30 border-gray-400">Reviews</th>
                <th className="border text-center p-2 w-30 border-gray-400">Prep Time</th>
                <th className="border text-center p-2 w-50 border-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((el, i) => (
                <tr key={i} className={`h-20 `}>
                  <td className="border text-center border-gray-400 p-1">{i + 1}</td>
                  <td className="border text-center p-1 w-25 border-gray-400">{el.name}</td>
                  <td className="border text-center p-1 w-25 border-gray-400">{el.shop}</td>
                  <td className="border text-center p-1 w-25 border-gray-400">{el.category}</td>
                  <td className="border text-center p-1 w-25 border-gray-400">{el.price}</td>
                  <td className="border text-center p-1 w-25 border-gray-400">{el.rating}</td>
                  <td className="border text-center p-1 w-25 border-gray-400">{el.location}</td>
                  <td className="border text-center p-1 w-25 border-gray-400">{el.reviews}</td>
                  <td className="border text-center p-1 w-25 border-gray-400">{el.prepTime}</td>
                  <td className="border text-center p-1 w-50 flex h-20 pt-5 border-gray-400">
                    <div className="ml-3">
                      <button
                        className="bg-blue-700 py-1 text-white px- w-15 rounded-2xl mx-3 cursor-pointer"
                        onClick={() => {
                          seteditKey(el.id);
                          setIsEdit(true);
                          setisnowCreate(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-700 w-15 px-2 py-1 rounded-2xl mx-2 cursor-pointer"
                        onClick={() => handleDelete(el.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FoodApi;