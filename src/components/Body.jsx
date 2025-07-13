import { useEffect, useState } from "react";
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

const Body = () => {
    const [noOfItems, setNoOfItems] = useState(4);
    const [searchText, setSearchText] = useState("");
    const [listOfRestaurants, setListOfRestaurants] = useState(null);
    const [carousel, setCarousel] = useState(null);
    const [filterListOfRestaurants, setFilterListOfRestaurants] = useState(null);
    const [isFiltered, setIsFiltered] = useState(false);
    const [displayCount, setDisplayCount] = useState(8); // Start with 8 restaurants

    
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
                // Use mock data if environment variable is not available
                console.log('Using mock data - VITE_MAIN_API not defined');
                console.log('Mock data:', resList);
                setListOfRestaurants(resList);
                setFilterListOfRestaurants(resList);
                return;
            }
            const response = await axios.get(apiUrl);
            const pinky = response.data;

            setListOfRestaurants(pinky?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            // setCarousel(pinky?.data?.cards[0]?.data?.data?.cards);
            setFilterListOfRestaurants(pinky?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        } catch (err) {
            console.log('API Error, using mock data:', err);
            // Fallback to mock data on error
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

    console.log('Rendering Body component, listOfRestaurants:', listOfRestaurants);
    console.log('filterListOfRestaurants:', filterListOfRestaurants);
    
    // Create display array with infinite scroll support
    const displayRestaurants = searchText || isFiltered
        ? filterListOfRestaurants?.slice(0, displayCount)
        : (filterListOfRestaurants && filterListOfRestaurants.length > 3) 
            ? filterListOfRestaurants.slice(0, -3).slice(0, displayCount)
            : filterListOfRestaurants?.slice(0, displayCount);

    // Infinite scroll callback
    const loadMore = () => {
        if (displayRestaurants && displayRestaurants.length < (filterListOfRestaurants?.length || 0)) {
            setTimeout(() => {
                setDisplayCount(prev => prev + 4);
            }, 500);
        }
    };

    // Infinite scroll hook
    const lastElementRef = useInfiniteScroll(loadMore, 
        displayRestaurants && displayRestaurants.length < (filterListOfRestaurants?.length || 0)
    );
    
    return (
        listOfRestaurants ? (
            <div className="parent w-full lg:mb-5">
                <div className="body w-full flex flex-col justify-center items-center gap-6">
                    <div className="filters w-[85%] flex justify-center items-center mt-4 gap-20 pr-5 p-4 max-[760px]:flex-col max-[760px]:w-full max-[760px]:gap-4 max-[760px]:pr-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-xl dark:shadow-slate-900/50 border border-blue-200/50 dark:border-slate-600/50 transition-all duration-300 hover:shadow-blue-200/20 dark:hover:shadow-slate-700/30">
                        <div className="Search w-[60%]  flex justify-center items-center gap-3 max-[760px]:w-full">
                            <input
                                type="text"
                                placeholder="Search for restaurants..."
                                className="search-input p-3 px-4 bg-white/95 dark:bg-slate-700/95 backdrop-blur-sm border-2 border-blue-300/50 dark:border-slate-500/50 rounded-lg focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200/50 dark:focus:ring-indigo-500/30 shadow-md dark:shadow-slate-900/30 transition-all duration-300 w-full text-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 font-medium"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        if (searchText.trim() === "") {
                                            setFilterListOfRestaurants(listOfRestaurants);
                                            setIsFiltered(false);
                                        } else {
                                            let data = filterData(searchText, listOfRestaurants);
                                            setFilterListOfRestaurants(data);
                                            setIsFiltered(true);
                                        }
                                        setDisplayCount(8);
                                    }
                                }}
                            />
                            <button
                                className="search-button flex justify-center items-center gap-2 p-3 px-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg text-sm text-white font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform border border-indigo-500/30"
                                onClick={() => {
                                    if (searchText.trim() === "") {
                                        // If search is empty, show all restaurants
                                        setFilterListOfRestaurants(listOfRestaurants);
                                        setIsFiltered(false);
                                    } else {
                                        // Perform search
                                        let data = filterData(searchText, listOfRestaurants);
                                        setFilterListOfRestaurants(data);
                                        setIsFiltered(true);
                                    }
                                    setDisplayCount(8); // Reset display count for new search
                                }}
                            >
                                <BiSearchAlt className="text-lg" />SEARCH
                            </button>
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



                    <div className="res-container flex flex-wrap justify-center items-start w-[90%] gap-6 max-[800px]:gap-4 max-[730px]:w-full max-[660px]:justify-center p-4">
                        {
                            listOfRestaurants &&
                            displayRestaurants?.map((restaurant, index) => {
                                const restaurantData = restaurant?.info || restaurant;
                                const isLastElement = index === displayRestaurants.length - 1;
                                
                                return (
                                    <div key={restaurantData?.id} ref={isLastElement ? lastElementRef : null}>
                                        <Link to={"/restaurants/" + restaurantData?.id}>
                                            <RestaurantCard resData={restaurantData} />
                                        </Link>
                                    </div>
                                );
                            })
                        }
                        

                    </div>
                </div>
            </div>
        ) : (
            <div className="shimmer flex justify-center w-full">
                <ShimmerBody />
            </div>
        )
    )
}

export default Body;