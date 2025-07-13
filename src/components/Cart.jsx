
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { incrQuantity, decrQuantity, removeItem, emptyItems } from "../utils/store/slices/cartSlice";
import { useDispatch } from "react-redux";
import EmptyCart from "./EmptyCart";
import { BsArrowRightSquareFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom";
// import Login from "../pages/Login";


const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let totalAmount = useRef(0);
    const items = useSelector(store => store?.cart?.items);
    const loginToken = useSelector(store => store?.login?.loginToken);


    totalAmount.current = 0;
    const totalHandler = (price, quantity) => {
        totalAmount.current = Number(totalAmount.current) + (price * quantity);
    }




    const handlePaymentSuccess = (payment) => {
        console.log("Payment Successful:", payment);
        dispatch(emptyItems());
        navigate('/success');
    };

    const handlePaymentError = (error) => {
        console.log("Payment Error:", error);
        // Handle payment errors
    };

    const makePayment = async (price) => {

        const options = {
            key: import.meta.env.VITE_rzp_Id,
            amount: price * 100,
            currency: "INR",
            name: "FOOD ZAIKA",
            description: "Thank you for your test purchase",
            image: '',
            handler: handlePaymentSuccess,
            prefill: {
                name: '',
                email: '',
                contact: ''
            },
            notes: {
                address: ''
            },
            theme: {
                color: "#0e5db3"
            }
        };
        // window.RazorpayCheckout.open(options);
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.on('payment.failed', handlePaymentError);
        razorpayInstance.open();
    };


    useEffect(() => {

        if (!loginToken) {
            navigate("/login")
        }


        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);







    return (
        items.length !== 0
            ?
            (
                <div className="parent w-full flex justify-center items-center bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-36 mt-5 min-h-screen transition-all duration-300">
                    <div className="childParent w-4/5 flex  justify-between  mt-8 max-[800px]:flex-col max-[800px]:w-full max-[800px]:justify-center max-[800px]:items-center gap-6">
                        <div className="left w-2/3  flex flex-col justify-center items-center max-[800px]:w-[90%] ">
                            <div className="topSticky bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm w-full z-10 max-[700px]:rounded-2xl lg:mb-6 shadow-xl border border-orange-200 dark:border-orange-400 transition-all duration-300">
                                <div className="firstresNameDetails flex justify-between w-full p-6">
                                    <div className="left">
                                        <h1 className="name text-2xl font-bold text-gray-800 dark:text-white mb-2">{items[0]?.resName}</h1>
                                        <p className="text-gray-600 dark:text-gray-300 font-medium mb-1">{items[0]?.cuisines?.join(", ")}</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">📍 {items[0]?.areaName + " " + items[0]?.deliveryDistance}</p>
                                    </div>
                                    <div className="res-img  w-24 h-24 items-center rounded-2xl overflow-hidden shadow-lg">

                                        <img src={import.meta.env.VITE_rzp_Id_MENU_IMG_API + items[0].image} alt="" className="w-full h-full object-cover" />

                                    </div>
                                </div>
                            </div>
                            <div className="middle w-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-100 dark:border-orange-700 transition-all duration-300">
                                {
                                    items.map((it) => {

                                        totalHandler(it?.price, it?.quantity)


                                        return (
                                            <div key={it?.id} className="flex items-center justify-between w-full gap-4 my-4 p-4 bg-white/80 dark:bg-gray-700/80 rounded-xl border border-orange-100 dark:border-orange-600 hover:shadow-md transition-all duration-300">
                                                <div className="py-1"> {it.veg === "VEG" ? <img width="24" height="24" src="https://img.icons8.com/color/48/vegetarian-food-symbol.png" alt="vegetarian-food-symbol" /> : (it.veg) === "NONVEG" ? <img width="24" height="24" src="https://img.icons8.com/color/48/non-vegetarian-food-symbol.png" alt="non-vegetarian-food-symbol" /> : ""}</div>
                                                <div className="namePrice flex justify-between items-center w-full px-4">
                                                    <div className="name w-[40%] font-bold text-gray-800 dark:text-white">
                                                        {it?.name}
                                                    </div>
                                                    <div className="btn flex justify-between items-center gap-4 py-2 px-4 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 rounded-xl border-2 border-orange-200 dark:border-orange-600 shadow-md">
                                                        <button className="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 font-bold" onClick={() => it?.quantity >= 2 ? dispatch(decrQuantity(it?.id)) : dispatch(removeItem(it?.id))}>-</button>
                                                        <div className="w-8 flex justify-center items-center font-bold text-gray-800 dark:text-white">{it.quantity}</div>
                                                        <button className="w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200 font-bold" onClick={() => dispatch(incrQuantity(it?.id))}>+</button>
                                                    </div>
                                                    <div className="price w-24 font-bold text-lg text-gray-800 dark:text-white">
                                                        ₹ {(it?.quantity * it?.price).toFixed(2)}
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="mt-6 sticky bottom-0 w-full">
                                <div className="bg-gradient-to-r from-green-500 to-green-600 w-full p-4 justify-between items-center text-white text-lg font-bold px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
                                    <div className="rate flex justify-start items-center w-2/4">
                                        💰 SUB-TOTAL
                                    </div>
                                    <div className="flex justify-end items-center w-2/4 text-xl"> ₹ {totalAmount?.current?.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="right p-5 w-1/3 items-center max-[800px]:w-full">

                            <div className="payment bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm w-full p-6 flex flex-col gap-4 rounded-2xl shadow-xl border border-orange-200 dark:border-orange-400 transition-all duration-300">
                                <div className="bill text-2xl font-bold text-gray-800 dark:text-white mb-4">📋 Bill Details</div>
                                <div className="price-det px-2 flex flex-col gap-4 my-2">
                                    <div className="item total flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-xl">
                                        <div className="head font-bold text-gray-700 dark:text-gray-200">
                                            🍽️ Item Total
                                        </div>
                                        <div className="price w-24 font-bold text-gray-800 dark:text-white">
                                            ₹ {totalAmount?.current?.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="delivery flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-xl">
                                        <div className="head font-bold text-gray-700 dark:text-gray-200">
                                            🚚 Delivery Fee | {items[0]?.deliveryDistance}
                                        </div>
                                        <div className="price w-20 font-bold text-gray-800 dark:text-white">
                                            ₹ 40
                                        </div>
                                    </div>
                                </div>
                                <div className="tax flex justify-between items-center my-2 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-xl">
                                    <div className="head font-bold text-gray-700 dark:text-gray-200">
                                        🏛️ GST and Restaurant Charges
                                    </div>
                                    <div className="price w-24 px-2 font-bold text-gray-800 dark:text-white">
                                        ₹ 10
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 sticky bottom-0 w-full max-[800px]:bottom-14" >
                                <button className="flex bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 w-full p-4 justify-between items-center text-white text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform" onClick={() => makePayment(totalAmount?.current + 50)}>
                                    <div className="rate flex gap-2 items-center">💳 PROCEED TO PAY <BsArrowRightSquareFill className="text-xl" /></div>
                                    <div className="w-32 p-2 text-xl">₹ {(totalAmount?.current + 50)?.toFixed(2)}</div>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )
            :
            (
                <div className="empty">
                    <EmptyCart />
                </div>
            )
    )
}

export default Cart;


