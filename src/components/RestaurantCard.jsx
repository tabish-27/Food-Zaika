/* eslint-disable react/prop-types */


import { AiFillStar } from "react-icons/ai";



const RestaurantCard = (props) => {
  const { resData } = props;
  const data = resData?.data || resData;
  const {
    cloudinaryImageId, name, avgRating, cuisines, costForTwo, deliveryTime,
  } = data || {};

  const displayName = name || "Restaurant Name";
  const displayRating = avgRating || "0";
  const displayCuisines = cuisines || ["Cuisine"];
  const displayCost = costForTwo || 0;
  const displayTime = deliveryTime || 30;

  const rateColor = displayRating >= 4 ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-gradient-to-r from-amber-500 to-orange-500";

  return (
    <div className="card bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl border border-slate-200/60 dark:border-slate-700/60 
        transition-all duration-300 p-5 cursor-pointer rounded-3xl 
        shadow-md hover:shadow-2xl hover:shadow-indigo-200/40 dark:shadow-slate-900/40 dark:hover:shadow-indigo-900/50 
        hover:border-indigo-500 dark:hover:border-indigo-400 
        hover:scale-[1.04] focus-within:scale-[1.04] 
        focus-within:border-indigo-500 dark:focus-within:border-indigo-400 
        outline-none group overflow-hidden">
      {/* Animated border glow on hover */}
      <div className="absolute -inset-1 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 z-0" style={{background: 'linear-gradient(120deg, #6366f1 0%, #818cf8 50%, #a5b4fc 100%)', filter: 'blur(10px)'}}></div>
      <div className="res-card w-[20rem] h-[22rem] flex flex-col justify-start items-start gap-4 relative z-10">
        <div className="relative w-full h-44 overflow-hidden rounded-2xl shadow-xl dark:shadow-slate-900/50">
          <img 
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out" 
            src={cloudinaryImageId 
              ? "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + cloudinaryImageId
              : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=660&h=400&fit=crop&crop=center"
            } 
            alt={displayName}
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=660&h=400&fit=crop&crop=center";
            }}
          />
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-pink-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          {/* Featured badge example */}
          {displayRating >= 4.5 && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-pink-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse z-20">★ Featured</span>
          )}
          {/* Trending badge if rating high */}
          {displayRating >= 4.7 && (
            <span className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">🔥 Trending</span>
          )}
          {/* Discount badge if cost low */}
          {displayCost < 300 && (
            <span className="absolute bottom-3 left-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">₹ Saver</span>
          )}
        </div>
        <div className="name-details flex flex-col justify-between items-start gap-3 w-full">
          <h3 className="resname font-extrabold text-xl text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 leading-tight tracking-tight drop-shadow-sm" style={{fontFamily: 'Montserrat, Pacifico, cursive'}}>
            {displayName}
          </h3>
          <h6 className="cuisines text-slate-600 dark:text-slate-300 text-sm line-clamp-2 font-medium leading-relaxed">{displayCuisines.join(", ")}</h6>
        </div>
        <div className="flex flex-row gap-3 justify-between items-center w-full bg-gradient-to-r from-slate-50/80 via-blue-50/80 to-indigo-50/80 dark:from-slate-700/80 dark:via-slate-600/80 dark:to-slate-700/80 p-4 rounded-2xl border border-slate-200/40 dark:border-slate-500/40 shadow-sm dark:shadow-slate-900/30">
          {/* Rating badge with shine and confetti */}
          <div className={`relative rating ${rateColor} px-3 py-2 flex flex-row items-center gap-1 font-bold text-xs text-white rounded-xl shadow-lg group-hover:scale-110 group-hover:shadow-amber-200/40 transition-all duration-300 animate-pulse`}> 
            <AiFillStar className='staricon text-yellow-200' />
            <span className="number shine">{displayRating}</span>
            {/* Confetti if rating is 4.7+ */}
            {displayRating >= 4.7 && (
              <span className="confetti" style={{left: '60%'}}></span>
            )}
          </div>
          {/* Delivery time neumorphic badge */}
          <div className="deliveryTime font-bold text-xs text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-700/90 px-3 py-2 rounded-xl border border-slate-200/40 dark:border-slate-500/40 shadow-inner dark:shadow-slate-900/20 group-hover:bg-indigo-50/90 group-hover:dark:bg-indigo-900/60 transition-all duration-300">
            ⚡ {displayTime} MINS
          </div>
          {/* Cost for two neumorphic badge */}
          <div className="costOfTwo font-bold text-xs text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-700/90 px-3 py-2 rounded-xl border border-slate-200/40 dark:border-slate-500/40 shadow-inner dark:shadow-slate-900/20 group-hover:bg-indigo-50/90 group-hover:dark:bg-indigo-900/60 transition-all duration-300">
            💰 ₹{displayCost / 100}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard;