import React from "react";

const Offers = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#f8f6f1] dark:bg-[#181818] py-12 px-2">
            <div className="w-full max-w-lg bg-white dark:bg-[#232323] rounded-2xl shadow-xl border border-[#e5e2d8] dark:border-[#333] p-8 flex flex-col items-center">
                <h1 className="text-3xl font-serif font-bold text-[#bfa76a] tracking-wide mb-4">Exclusive Offers</h1>
                <p className="text-base font-serif text-gray-700 dark:text-gray-200 italic mb-6 text-center">“Good food is all the sweeter when shared with good offers.”</p>
                <div className="w-full flex flex-col gap-4">
                    <div className="p-4 rounded-xl border border-[#bfa76a] bg-[#faf8f3] dark:bg-[#232323] flex flex-col items-start">
                        <span className="font-bold text-[#bfa76a]">FLAT60</span>
                        <span className="text-gray-700 dark:text-gray-200">Get 60% OFF on your first order. <span className="font-semibold">Use code: FLAT60</span></span>
                    </div>
                    <div className="p-4 rounded-xl border border-[#bfa76a] bg-[#faf8f3] dark:bg-[#232323] flex flex-col items-start">
                        <span className="font-bold text-[#bfa76a]">FREEDISH</span>
                        <span className="text-gray-700 dark:text-gray-200">Order above ₹499 and get a free dessert. <span className="font-semibold">Use code: FREEDISH</span></span>
                    </div>
                    <div className="p-4 rounded-xl border border-[#bfa76a] bg-[#faf8f3] dark:bg-[#232323] flex flex-col items-start">
                        <span className="font-bold text-[#bfa76a]">DELIVERY30</span>
                        <span className="text-gray-700 dark:text-gray-200">30% OFF on delivery charges for all orders today. <span className="font-semibold">Use code: DELIVERY30</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offers; 