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
  const {data, setData} = useFoodContext();
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
  const [canedit, setCanedit] = useState(false);

  useEffect(() => {
    // Client-side only check
    setCanedit(localStorage.getItem('canedit') === 'true');
    
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
  const [isedit, setIsEdit] = useState(false);

  return (
    <div className="w-full z-5 relative bottom-3">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6">
              {data.map((el, i) => {
                return (
                  <div key={i} className="mx-6 my-3 sm:w-70 bg-[#f38f46] rounded-[10px] text-black font-semibold">
                    <Link href={`/food/${el.id - 1}`}>
                      <img src={el.image} alt="" className="w-full max-w-xs sm:max-w-full h-60 p-4 object-cover mt-2 mx-auto mb-2" />
                      <div className="text-center">
                        <p className="text-gray-900 text-xl font-bold">{el.name}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2">
                          <p className="text-[rgba(255,255,255,0.96)] font-medium">&#8377; {el.price} </p>
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
              className="bg-orange-500 hover:bg-orange-600 text-white font-serif text-2xl font-bold text-center float-end relative top-5 right-30 p-1 rounded-2xl w-30 cursor-pointer"
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
                  {/* ... rest of your form inputs ... */}
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
            {/* ... rest of your table code ... */}
          </table>
        </div>
      )}
    </div>
  );
};

export default FoodApi;