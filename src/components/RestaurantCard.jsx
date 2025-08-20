import { AiFillStar } from "react-icons/ai";
import { FaRegClock, FaRupeeSign } from "react-icons/fa";

const RestaurantCard = ({ resData }) => {
    const data = resData || {};
    const { cloudinaryImageId, name, avgRating, cuisines, costForTwo, sla } = data;
    const { deliveryTime } = sla || {};

    const displayName = name || "Restaurant Name";
    const displayRating = avgRating || "0";
    const displayCuisines = cuisines?.join(", ") || "Cuisine";
    const displayCost = costForTwo || 0;
    const displayTime = deliveryTime || 30;

    const ratingColor = displayRating >= 4.0 ? "bg-green-600" : "bg-orange-500";
    const imageBaseUrl = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";
    const defaultImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=660&h=400&fit=crop&crop=center";
    const imageUrl = cloudinaryImageId ? `${imageBaseUrl}${cloudinaryImageId}` : defaultImage;

    return (
        <div className="res-card-container group 
            relative 
            bg-white dark:bg-gray-800 
            rounded-3xl shadow-xl 
            overflow-hidden 
            w-full h-[25rem] 
            transform transition-all duration-300 
            hover:scale-105 hover:shadow-2xl 
            focus-within:ring-4 focus-within:ring-indigo-500 dark:focus-within:ring-indigo-400 
            cursor-pointer 
            border border-gray-200 dark:border-gray-700">
            
            {/* Image Section */}
            <div className="relative w-full h-44 overflow-hidden">
                <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={imageUrl}
                    alt={displayName}
                    onError={(e) => { e.target.src = defaultImage; }}
                />
                {displayRating >= 4.5 && (
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10 animate-pulse">
                        🔥 Trending
                    </span>
                )}
            </div>

            {/* Card Content Section */}
            <div className="p-6 flex flex-col gap-3 h-[calc(100%-11rem)]">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {displayName}
                </h3>
                <h6 className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {displayCuisines}
                </h6>
                <div className="flex items-center justify-between mt-auto text-sm font-semibold">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white ${ratingColor} shadow-md`}>
                        <AiFillStar className="text-sm text-yellow-300" />
                        <span>{displayRating}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200">
                        <FaRegClock className="text-base text-indigo-500 dark:text-indigo-400" />
                        <span>{displayTime} MINS</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200">
                        <FaRupeeSign className="text-base text-yellow-500 dark:text-yellow-400" />
                        <span>{displayCost / 100} FOR TWO</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;