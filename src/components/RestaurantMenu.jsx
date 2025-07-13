import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { MdOutlineTimelapse } from "react-icons/md";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { FaLeaf } from "react-icons/fa";
// import { MENU_IMG_API } from "../utils/constant";
// import { initialValue, reducerFunction } from "./reducer/reducer";
import ResMenu from "./ResMenu";
import ShimmerMenu from "./ShimmerMenu";
import axios from 'axios';

const ResturantMenu = () => {
    const [web, setWeb] = useState(true);
    const [menuData, setMenuData] = useState(null);
    const [offers, setOffers] = useState(null);
    const { resId } = useParams();



    // const fetchMenu = async () => {
    //     try {
    //         const baseUrl = import.meta.env.VITE_MENU_API;
    //         // const baseUrl = web ? import.meta.env.VITE_MENU_API : import.meta.env.VITE_MOBI_MENU_API;
    //         if (!baseUrl) {
    //             throw new Error('VITE_MENU_API or VITE_MOBI_MENU_API is not defined');
    //         }
    //         const apiUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`${baseUrl}${resId}`)}`;
    //         const response = await fetch(apiUrl);

    //         if (!response.ok) {
    //             throw new Error(`Network response was not ok: ${response.statusText}`);
    //         }

    //         const data = await response.json();
    //         const jsonString = data.contents;
    //         const parsedData = JSON.parse(jsonString);
    //         setMenuData(parsedData?.data?.cards[2]?.card?.card?.info);
    //         setOffers(parsedData.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers);
    //     } catch (err) {
    //         console.error('Error fetching data:', err);
    //     }
    // };



    const fetchMenu = async () => {
        try {
            const baseUrl = import.meta.env.VITE_MENU_API;
            // const baseUrl = web ? import.meta.env.VITE_MENU_API : import.meta.env.VITE_MOBI_MENU_API;
            if (!baseUrl) {
                throw new Error('VITE_MENU_API or VITE_MOBI_MENU_API is not defined');
            }
            const apiUrl = `${baseUrl}${resId}`;
            const response = await axios.get(apiUrl);

            if (response.status !== 200) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = response.data;
            setMenuData(data?.data?.cards[2]?.card?.card?.info);
            setOffers(data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };




    useEffect(() => {
        fetchMenu();
    }, [resId])

    useEffect(() => {
        let deviceWidth = window.innerWidth;
        if (deviceWidth < 660) {
            setWeb(false);
            fetchMenu();
        }
    }, [])




    if (menuData === null || undefined) return <ShimmerMenu className="" />

    const { name, cuisines, costForTwoMessage, areaName, avgRatingString, totalRatingsString } = menuData ?? {};
    const { lastMileTravelString, deliveryTime } = menuData ?? menuData.sla;

    return (
        <> {menuData &&
            <div className="main w-full flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen py-8 transition-all duration-300">
                <div className="mainBodyRestaurantMenu flex flex-col items-center  w-[51%] max-[800px]:w-full max-[800px]:px-3 ">
                    <div className="firstresNameDetails flex justify-between w-full p-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-xl dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-600/50 mb-6 transition-all duration-300">
                        <div className="left max-[800px]:w-[70%]">
                            <h1 className="name text-lg font-bold font-open max-[800px]:w-full text-slate-800 dark:text-slate-100 mb-2">{name}</h1>
                            <p className="text-slate-600 dark:text-slate-300 mb-1">{cuisines.join(", ")}</p>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">{areaName + " " + lastMileTravelString}</p>
                        </div>
                        <div className="right max-[700px]:max-h-24 flex flex-col justify-around p-3 items-center border border-slate-300 dark:border-slate-600 rounded-xl max-[800px]:w-[20%] bg-white/80 dark:bg-slate-700/80 shadow-sm dark:shadow-slate-900/30">
                            <div className="rating font-bold text-green-700 dark:text-green-400 flex justify-center items-center gap-[2px]">
                                <AiFillStar /> <span>{avgRatingString}</span>
                            </div>
                            <div className="krating font-open text-[0.65rem] font-semibold text-gray-500 dark:text-gray-400">
                                <p>{totalRatingsString}</p>
                            </div>
                        </div>
                    </div>
                    <div className="secondTimeAndOffers flex flex-col w-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-xl dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-600/50 p-6 mb-6 transition-all duration-300">
                        <div className="timeandprice w-full flex justify-start gap-5 p-3 max-[800px]:justify-around">
                            <div className="time flex items-center gap-2 font-open text-slate-700 dark:text-slate-200 font-bold">
                                <MdOutlineTimelapse className="timeicon text-2xl" />  <span className="dtime font-[750]">{deliveryTime} MINS</span>
                            </div>
                            <div className="price flex items-center gap-2 font-open text-slate-700 dark:text-slate-200 ">
                                <HiOutlineCurrencyRupee className="rupeeicon text-2xl font-thin" />  <span className="costmsg font-bold">{costForTwoMessage}</span>
                            </div>
                        </div>
                        <div className="offers flex w-full justify-start gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden py-2 my-2 max-[700px]:my-0">
                            {
                                offers?.map((res) => (
                                    <div key={res.info.offerIds} className="singleoffer min-w-[28%] border-2 border-slate-300 dark:border-slate-600 text-sm py-2 px-3 rounded-md flex flex-col justify-center items-start gap-2 max-[700px]:min-w-[50%] bg-white/80 dark:bg-slate-700/80 shadow-sm dark:shadow-slate-900/30">
                                        <div className="offerpercentage flex justify-center items-center gap-1 lg:gap-2 font-bold text-slate-700 dark:text-slate-200">
                                            <h1>{res.info.header}</h1> <img className="w-5  lg:w-6" src="https://i.postimg.cc/zGpWW9vq/5970436.png" alt="" />
                                        </div>
                                        <div className="offercode flex justify-around text-xs  gap-1 font-bold text-slate-600 dark:text-slate-300">
                                            <div>{res.info.couponCode}</div>
                                            {res.info.description &&

                                                <p>| {res.info.description}</p>
                                            }
                                        </div>
                                    </div>
                                )
                                )
                            }
                        </div>
                        <div className="div pt-6 ">
                            {
                                menuData?.veg ? <div className="text-green-700 dark:text-green-400 font-medium text-sm flex gap-3 justify-start items-center"><FaLeaf /><h1>PURE VEG</h1></div> : ''

                            }
                        </div>
                    </div>

                    <div className="items w-full flex flex-col gap-5 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-xl dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-600/50 p-6 transition-all duration-300">

                        <ResMenu />


                    </div>

                </div>

            </div>





        } </>
    )
}

export default ResturantMenu
