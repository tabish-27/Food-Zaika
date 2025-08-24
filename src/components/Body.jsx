import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import RestaurantCard from "./RestaurantCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";
import ShimmerBody from "./ShimmerBody";
import axios from "axios";
import resList from "../utils/mockData";
import useInfiniteScroll from "../utils/hooks/useInfiniteScroll";
import useDebounce from "../utils/hooks/useDebounce"; // A new hook for professional search

// Helper functions for data processing
const getTopCuisines = (restaurants, count = 8) => {
  const cuisineCount = {};
  restaurants?.forEach((r) => {
    (r.data.cuisines || []).forEach((cuisine) => {
      cuisineCount[cuisine] = (cuisineCount[cuisine] || 0) + 1;
    });
  });
  return Object.entries(cuisineCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([cuisine]) => cuisine);
};

const getFeaturedRestaurants = (restaurants, count = 6) => {
  return restaurants
    ?.filter((r) => r.data.promoted || r.data.avgRating >= 4.2)
    .slice(0, count);
};

const getRestaurantData = (re) => re?.info || re?.data || re;

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState(null);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 300); // Debounce search input
  const [displayCount, setDisplayCount] = useState(8);

  const fetchRestaurants = async () => {
    try {
      // Use the mock data as a fallback in case the API call fails or is not configured
      const apiUrl = import.meta.env.VITE_MAIN_API;
      const response = apiUrl ? await axios.get(apiUrl) : { data: { data: { cards: [{}, { card: { card: { gridElements: { infoWithStyle: { restaurants: resList } } } } }] } } };
      const restaurants = response.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      setListOfRestaurants(restaurants);
      setFilteredRestaurants(restaurants);
    } catch (err) {
      console.error("Error fetching restaurant data:", err);
      setListOfRestaurants(resList);
      setFilteredRestaurants(resList);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (!listOfRestaurants) return;
    if (debouncedSearchText.trim() === "") {
      setFilteredRestaurants(listOfRestaurants);
    } else {
      const filtered = listOfRestaurants.filter((re) => {
        const restaurantData = getRestaurantData(re);
        const name = restaurantData?.name?.toLowerCase() || "";
        const cuisines = (restaurantData?.cuisines || []).map(c => c.toLowerCase()).join(" ");
        return name.includes(debouncedSearchText.toLowerCase()) || cuisines.includes(debouncedSearchText.toLowerCase());
      });
      setFilteredRestaurants(filtered);
    }
    setDisplayCount(8);
  }, [debouncedSearchText, listOfRestaurants]);

  const loadMore = useCallback(() => {
    if (filteredRestaurants && displayCount < filteredRestaurants.length) {
      setTimeout(() => {
        setDisplayCount(prev => prev + 4);
      }, 500);
    }
  }, [displayCount, filteredRestaurants]);

  const lastElementRef = useInfiniteScroll(loadMore, filteredRestaurants && displayCount < filteredRestaurants.length);

  if (!listOfRestaurants) return <ShimmerBody />;

  return (
    <div className="parent w-full lg:mb-5">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-16 bg-white dark:bg-slate-900 transition-all duration-300 mb-8 border-b border-slate-200 dark:border-slate-700">
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 text-center tracking-tight" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Discover Delicious Food Near You
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium mb-8 text-center max-w-2xl" style={{ fontFamily: "Inter, sans-serif" }}>
          Order from the best restaurants in your city. Fast delivery, exclusive offers, and a taste adventure awaits!
        </p>
        <div className="flex gap-4 z-10">
          <a
            href="#restaurants"
            className="px-7 py-3 rounded-full bg-indigo-600 text-white font-bold shadow-md hover:bg-indigo-700 transition-all duration-200 text-lg"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Explore Restaurants
          </a>
          <a
            href="#how-it-works"
            className="px-7 py-3 rounded-full border border-indigo-600 text-indigo-700 dark:text-indigo-200 font-bold shadow-md hover:bg-indigo-50 dark:hover:bg-slate-800 transition-all duration-200 text-lg"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            How it Works
          </a>
        </div>
      </section>
      {/* How it Works Section with Food Background */}
      <section id="how-it-works" className="relative w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Delicious food assortment"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-gray-900/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-orange-400 to-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wider">
              FOOD ZAIKA EXPERIENCE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">Food Zaika</span> Works
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              From craving to satisfaction in just three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
                title: "Discover Restaurants",
                description: "Browse through 500+ curated restaurants with authentic reviews",
                color: "text-amber-300",
                bg: "bg-white/5 backdrop-blur-sm border border-white/10",
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Order in Minutes",
                description: "Customize your meal with special requests and dietary preferences",
                color: "text-orange-300",
                bg: "bg-white/5 backdrop-blur-sm border border-white/10",
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                ),
                title: "Fast Delivery",
                description: "Track your order in real-time with our optimized delivery network",
                color: "text-amber-200",
                bg: "bg-white/5 backdrop-blur-sm border border-white/10",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl p-8 ${item.bg} transition-all duration-500 hover:shadow-lg hover:-translate-y-2 hover:bg-white/10`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 mx-auto`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-3">
                    <span className="bg-gradient-to-r from-amber-400 to-amber-400 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                      {item.title}
                    </span>
                  </h3>
                  <p className="text-white/80 text-center leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-6 flex justify-center">
                    <span className="inline-flex items-center text-sm font-medium text-amber-300">
                      Step {index + 1}
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="body w-full flex flex-col justify-center items-center gap-6">
        {/* Search & Filters */}
        <div className="filters w-[90%] flex justify-center items-center mt-4 gap-10 pr-5 p-4 max-[760px]:flex-col max-[760px]:w-full max-[760px]:gap-4 max-[760px]:pr-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl dark:shadow-slate-900/50 border border-blue-200/40 dark:border-slate-600/40 transition-all duration-300 hover:shadow-blue-200/20 dark:hover:shadow-slate-700/30">
          <div className="Search w-full flex justify-center items-center gap-3">
            <input
              type="text"
              placeholder="Search for restaurants..."
              className="search-input p-3 px-4 bg-white/95 dark:bg-slate-700/95 backdrop-blur-sm border-2 border-indigo-300/40 dark:border-slate-500/40 rounded-lg focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200/40 dark:focus:ring-indigo-500/30 shadow-md dark:shadow-slate-900/30 transition-all duration-300 w-full text-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 font-medium"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && (
              <button
                className="clear-button flex justify-center items-center gap-2 p-3 px-5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-lg text-sm text-white font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform border border-red-500/30"
                onClick={() => setSearchText("")}
              >
                CLEAR
              </button>
            )}
          </div>
        </div>
        {/* Restaurant Cards Grid */}
        <div
          id="restaurants"
          className="res-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-[95%] max-[800px]:gap-4 max-[730px]:w-full max-[660px]:justify-center p-4"
        >
          {filteredRestaurants?.slice(0, displayCount).map((restaurant, index) => {
            const restaurantData = getRestaurantData(restaurant);
            const isLastElement = index === Math.min(displayCount, filteredRestaurants.length) - 1;
            return (
              <div
                key={restaurantData?.id}
                ref={isLastElement ? lastElementRef : null}
                className="transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-2xl"
              >
                <Link to={"/restaurants/" + restaurantData?.id}>
                  <RestaurantCard resData={restaurantData} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Cuisines Section */}
      <section className="w-full max-w-5xl mx-auto py-8 flex flex-col items-center gap-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Top Cuisines
        </motion.h2>

        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.07 },
            },
          }}
        >
          {getTopCuisines(listOfRestaurants || resList).map((cuisine, idx) => (
            <motion.span
              key={cuisine}
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.08, boxShadow: "0px 4px 15px rgba(0,0,0,0.15)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="px-5 py-2 rounded-full text-white font-semibold shadow-md border border-white/20 text-base cursor-pointer"
              style={{
                fontFamily: "Inter, sans-serif",
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              }}
            >
              {cuisine}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* Featured Restaurants Carousel */}
      <section className="w-full max-w-6xl mx-auto py-8 flex flex-col items-center gap-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Featured Restaurants
        </h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          pagination={{ clickable: true }}
          modules={[Pagination, Navigation]}
          className="w-full"
        >
          {getFeaturedRestaurants(listOfRestaurants || resList).map((r, idx) => (
            <SwiperSlide key={r.data.id || idx}>
              <div className="flex justify-center">
                <RestaurantCard resData={r.data} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

         {/* What Our Customers Say*/}
    <section className="w-full max-w-7xl mx-auto py-12 flex flex-col items-center gap-8 px-4 
        bg-gradient-to-br from-green-300 to-gray-500 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl transition-all duration-300">
        <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 text-center"
            style={{ fontFamily: "Montserrat, sans-serif" }}
        >
            What Our Customers Say
        </h2>
        <p
            className="text-lg text-gray-600 dark:text-gray-300 font-medium text-center max-w-2xl"
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            Don't just take our word for it. Hear what our happy customers have to say about their experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
                {
                    emoji: "💚",
                    text: "Absolutely love the fresh food and quick delivery! The quality is top-notch, and the app is so easy to use. Highly recommended!",
                    author: "Priya Sharma"
                },
                {
                    emoji: "😋",
                    text: "The best food delivery service in town. The variety is amazing, and every meal I've ordered has been delicious and arrived hot.",
                    author: "Rahul Singh"
                },
                {
                    emoji: "✨",
                    text: "Fantastic service! The customer support is excellent, and the offers are a great bonus. My go-to for all food cravings.",
                    author: "Ananya Mishra"
                },
            ].map((testimonial, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center justify-between gap-4 p-6 
                        bg-white dark:bg-gray-800 
                        rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700
                        transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                    <span className="text-5xl mb-2">{testimonial.emoji}</span>
                    <p
                        className="text-gray-700 dark:text-gray-200 text-center text-base font-medium flex-grow"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        "{testimonial.text}"
                    </p>
                    <span
                        className="font-semibold text-indigo-600 dark:text-indigo-300 mt-4"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                        - {testimonial.author}
                    </span>
                </div>
            ))}
        </div>
    </section>

    </div>
  );
};

export default Body;