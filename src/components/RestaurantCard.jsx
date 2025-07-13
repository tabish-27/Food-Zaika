/* eslint-disable react/prop-types */


import { AiFillStar } from "react-icons/ai";



const RestaurantCard = (props) => {
  // eslint-disable-next-line react/prop-types
  const { resData } = props;
  console.log(resData);

  // Handle both API data and mock data structure
  const data = resData?.data || resData;
  
  const {
    cloudinaryImageId, name, avgRating, cuisines, costForTwo, deliveryTime,

    // eslint-disable-next-line no-unsafe-optional-chaining, react/prop-types
  } = data || {};

  // Add fallback values to prevent errors
  const displayName = name || "Restaurant Name";
  const displayRating = avgRating || "0";
  const displayCuisines = cuisines || ["Cuisine"];
  const displayCost = costForTwo || 0;
  const displayTime = deliveryTime || 30;

  const rateColor = displayRating >= 4 ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-gradient-to-r from-amber-500 to-orange-500";
  


  return (
    <div className="card bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-200/60 dark:border-slate-600/60 hover:border-indigo-300/80 dark:hover:border-indigo-400/80 hover:shadow-2xl dark:hover:shadow-indigo-900/50 p-5 cursor-pointer rounded-3xl transition-all duration-500 hover:scale-105 transform hover:-translate-y-3 shadow-lg dark:shadow-slate-900/50 hover:shadow-indigo-200/30 dark:hover:shadow-indigo-600/30">
      <div className="res-card w-[20rem] h-[22rem] flex flex-col justify-start items-start gap-4">
        <div className="relative w-full h-44 overflow-hidden rounded-2xl shadow-xl dark:shadow-slate-900/50">
          <img 
            className="w-full h-full object-cover hover:scale-110 transition-all duration-700 ease-out" 
            src={cloudinaryImageId 
              ? "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + cloudinaryImageId
              : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=660&h=400&fit=crop&crop=center"
            } 
            alt={displayName}
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=660&h=400&fit=crop&crop=center";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="name-details flex flex-col justify-between items-start gap-3 w-full">
          <h3 className="resname font-bold text-xl text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 leading-tight">{displayName}</h3>
          <h6 className="cuisines text-slate-600 dark:text-slate-300 text-sm line-clamp-2 font-medium leading-relaxed">{displayCuisines.join(", ")}</h6>
        </div>

        <div className="flex flex-row gap-3 justify-between items-center w-full bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-500/50 shadow-sm dark:shadow-slate-900/30">
          <div className={`rating ${rateColor} px-3 py-2 flex flex-row items-center gap-1 font-bold text-xs text-white rounded-xl shadow-lg`}>
            <AiFillStar className='staricon text-yellow-200' />
            <span className="number">{displayRating}</span>
          </div>
          <div className="deliveryTime font-bold text-xs text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-600/80 px-3 py-2 rounded-xl border border-slate-200/50 dark:border-slate-500/50 shadow-sm dark:shadow-slate-900/30">
            ⚡ {displayTime} MINS
          </div>
          <div className="costOfTwo font-bold text-xs text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-600/80 px-3 py-2 rounded-xl border border-slate-200/50 dark:border-slate-500/50 shadow-sm dark:shadow-slate-900/30">
            💰 ₹{displayCost / 100}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard;