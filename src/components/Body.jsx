import { useEffect, useState, useRef } from "react";
import RestaurantCard from "./RestaurantCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";
import ShimmerBody from "./ShimmerBody";
import { BiSearchAlt } from "react-icons/bi"
import axios from 'axios';
import resList from '../utils/mockData';
import useInfiniteScroll from '../utils/hooks/useInfiniteScroll';
import useLocalStorage from '../utils/hooks/useLocalStorage';

const getTopCuisines = (restaurants, count = 8) => {
    const cuisineCount = {};
    restaurants?.forEach(r => {
        (r.data.cuisines || []).forEach(cuisine => {
            cuisineCount[cuisine] = (cuisineCount[cuisine] || 0) + 1;
        });
    });
    return Object.entries(cuisineCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, count)
        .map(([cuisine]) => cuisine);
};

const getFeaturedRestaurants = (restaurants, count = 6) => {
    return restaurants?.filter(r => r.data.promoted || r.data.avgRating >= 4.2).slice(0, count);
};

const Body = () => {
    const [noOfItems, setNoOfItems] = useState(4);
    const [searchText, setSearchText] = useState("");
    const [listOfRestaurants, setListOfRestaurants] = useState(null);
    const [carousel, setCarousel] = useState(null);
    const [filterListOfRestaurants, setFilterListOfRestaurants] = useState(null);
    const [isFiltered, setIsFiltered] = useState(false);
    const [displayCount, setDisplayCount] = useState(8); // Start with 8 restaurants
    const searchTimeout = useRef();

    // Custom hooks
    const [userPreferences, setUserPreferences] = useLocalStorage('userPreferences', {
        theme: 'light',
        location: 'Noida, Uttar Pradesh, India',
        filters: []
    });

    const getData = async () => {
        try {
            const apiUrl = import.meta.env.VITE_MAIN_API;
            if (!apiUrl) {
                setListOfRestaurants(resList);
                setFilterListOfRestaurants(resList);
                return;
            }
            const response = await axios.get(apiUrl);
            const pinky = response.data;
            setListOfRestaurants(pinky?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            setFilterListOfRestaurants(pinky?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        } catch (err) {
            setListOfRestaurants(resList);
            setFilterListOfRestaurants(resList);
        }
    };

    function filterData(searchText, listOfRestaurants) {
        const filterData = listOfRestaurants?.filter((re) => {
            const restaurantData = re?.info || re;
            return restaurantData?.name?.toUpperCase()?.includes(searchText?.toUpperCase());
        });
        return filterData;
    }

    useEffect(() => {
        getData();
    }, [])
    useEffect(() => {
        let deviceWidth = window.innerWidth;
        if (deviceWidth < 660 && deviceWidth > 300) {
            setNoOfItems(2);
        }
    }, [])

    // Debounced instant search
    useEffect(() => {
        if (!listOfRestaurants) return;
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            if (searchText.trim() === "") {
                setFilterListOfRestaurants(listOfRestaurants);
                setIsFiltered(false);
            } else {
                const filtered = listOfRestaurants.filter((re) => {
                    const restaurantData = re?.info || re;
                    return restaurantData?.name?.toUpperCase()?.includes(searchText.toUpperCase());
                });
                setFilterListOfRestaurants(filtered);
                setIsFiltered(true);
            }
            setDisplayCount(8);
        }, 200);
        return () => clearTimeout(searchTimeout.current);
    }, [searchText, listOfRestaurants]);

    // Infinite scroll callback
    const loadMore = () => {
        if (filterListOfRestaurants && filterListOfRestaurants.length < (listOfRestaurants?.length || 0)) {
            setTimeout(() => {
                setDisplayCount(prev => prev + 4);
            }, 500);
        }
    };

    // Infinite scroll hook
    const lastElementRef = useInfiniteScroll(loadMore, 
        filterListOfRestaurants && filterListOfRestaurants.length < (listOfRestaurants?.length || 0)
    );

    return (
        listOfRestaurants ? (
            <div className="parent w-full lg:mb-5">
                {/* Hero Section */}
                <section className="w-full flex flex-col items-center justify-center py-16 bg-white dark:bg-slate-900 transition-all duration-300 mb-8 border-b border-slate-200 dark:border-slate-700">
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 text-center tracking-tight" style={{fontFamily: 'Montserrat, sans-serif'}}>Discover Delicious Food Near You</h1>
                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium mb-8 text-center max-w-2xl" style={{fontFamily: 'Inter, Open Sans, sans-serif'}}>Order from the best restaurants in your city. Fast delivery, exclusive offers, and a taste adventure awaits!</p>
                    <div className="flex gap-4 z-10">
                        <a href="#restaurants" className="px-7 py-3 rounded-full bg-indigo-600 text-white font-bold shadow-md hover:bg-indigo-700 transition-all duration-200 text-lg" style={{fontFamily: 'Montserrat, sans-serif'}}>Explore Restaurants</a>
                        <a href="#how-it-works" className="px-7 py-3 rounded-full border border-indigo-600 text-indigo-700 dark:text-indigo-200 font-bold shadow-md hover:bg-indigo-50 dark:hover:bg-slate-800 transition-all duration-200 text-lg" style={{fontFamily: 'Montserrat, sans-serif'}}>How it Works</a>
                    </div>
                </section>
                {/* How it Works Section */}
                <section id="how-it-works" className="w-full max-w-5xl mx-auto py-12 md:py-20 flex flex-col items-center gap-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2" style={{fontFamily: 'Montserrat, sans-serif'}}>How Food Zaika Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        <div className="flex flex-col items-center text-center gap-3 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <span className="text-4xl">🔍</span>
                            <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100" style={{fontFamily: 'Montserrat, sans-serif'}}>Browse Restaurants</h3>
                            <p className="text-slate-600 dark:text-slate-300 text-base" style={{fontFamily: 'Inter, Open Sans, sans-serif'}}>Find the best food places near you with our curated list and smart search.</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <span className="text-4xl">🛒</span>
                            <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100" style={{fontFamily: 'Montserrat, sans-serif'}}>Order Easily</h3>
                            <p className="text-slate-600 dark:text-slate-300 text-base" style={{fontFamily: 'Inter, Open Sans, sans-serif'}}>Add your favorite dishes to cart and place your order in just a few clicks.</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <span className="text-4xl">🚀</span>
                            <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100" style={{fontFamily: 'Montserrat, sans-serif'}}>Fast Delivery</h3>
                            <p className="text-slate-600 dark:text-slate-300 text-base" style={{fontFamily: 'Inter, Open Sans, sans-serif'}}>Sit back and relax while we deliver your food hot and fresh, super fast!</p>
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
                            {isFiltered && (
                                <button
                                    className="clear-button flex justify-center items-center gap-2 p-3 px-5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-lg text-sm text-white font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform border border-red-500/30"
                                    onClick={() => {
                                        setSearchText("");
                                        setFilterListOfRestaurants(listOfRestaurants);
                                        setIsFiltered(false);
                                        setDisplayCount(8);
                                    }}
                                >
                                    CLEAR
                                </button>
                            )}
                        </div>
                    </div>
                    {/* Restaurant Cards Grid */}
                    <div id="restaurants" className="res-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-[95%] max-[800px]:gap-4 max-[730px]:w-full max-[660px]:justify-center p-4">
                        {
                            filterListOfRestaurants &&
                            filterListOfRestaurants.slice(0, displayCount).map((restaurant, index) => {
                                const restaurantData = restaurant?.info || restaurant;
                                const isLastElement = index === Math.min(displayCount, filterListOfRestaurants.length) - 1;
                                return (
                                    <div key={restaurantData?.id} ref={isLastElement ? lastElementRef : null} className="transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-2xl">
                                        <Link to={"/restaurants/" + restaurantData?.id}>
                                            <RestaurantCard resData={restaurantData} />
                                        </Link>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                {/* Top Cuisines Section */}
                <section className="w-full max-w-5xl mx-auto py-8 flex flex-col items-center gap-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2" style={{fontFamily: 'Montserrat, sans-serif'}}>Top Cuisines</h2>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {getTopCuisines(listOfRestaurants || resList).map(cuisine => (
                            <span key={cuisine} className="px-5 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 font-semibold shadow-sm border border-indigo-100 dark:border-indigo-800 text-base hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-all duration-200" style={{fontFamily: 'Inter, Open Sans, sans-serif'}}>{cuisine}</span>
                        ))}
                    </div>
                </section>
                {/* Featured Restaurants Carousel */}
                <section className="w-full max-w-6xl mx-auto py-8 flex flex-col items-center gap-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2" style={{fontFamily: 'Montserrat, sans-serif'}}>Featured Restaurants</h2>
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
                {/* Testimonials Section */}
                <section className="w-full max-w-5xl mx-auto py-12 flex flex-col items-center gap-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2" style={{fontFamily: 'Montserrat, sans-serif'}}>What Our Customers Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        {[1,2,3].map(i => (
                            <div key={i} className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700">
                                <span className="text-4xl">{i === 1 ? '😍' : i === 2 ? '😋' : '👍'}</span>
                                <p className="text-slate-700 dark:text-slate-200 text-base font-medium" style={{fontFamily: 'Inter, Open Sans, sans-serif'}}>
                                    {i === 1 ? 'Amazing food and super fast delivery! Highly recommend Food Zaika.' : i === 2 ? 'Great variety of cuisines and easy to use app.' : 'Customer support is excellent. Will order again!'}
                                </p>
                                <span className="font-semibold text-indigo-600 dark:text-indigo-300" style={{fontFamily: 'Montserrat, sans-serif'}}>
                                    {i === 1 ? 'Amit S.' : i === 2 ? 'Priya K.' : 'Rahul M.'}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        ) : (
            <div className="shimmer flex justify-center w-full">
                <ShimmerBody />
            </div>
        )
    )
}

export default Body;