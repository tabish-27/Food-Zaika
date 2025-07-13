import { useState } from "react";
import { BsLockFill } from "react-icons/bs";
import { BsUnlockFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const AboutMe = () => {
    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (itemId) => {
        if (activeItem === itemId) {
            setActiveItem(null); // Collapse the clicked item if it's already active
        } else {
            setActiveItem(itemId); // Expand the clicked item
        }
    };


    const email = 'tabishjaved2030@gmail.com';
    const subject = 'Regarding [Subject]';
    const body = 'Hello,';

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const handleEmailClick = () => {
        window.location.href = mailtoLink;
    };

    return (
        <div className="main w-full flex flex-col justify-center items-center bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen py-8">
            <div className="mainBodyRestaurantMenu w-full flex flex-col items-center lg:w-[60%] max-[800px]:px-3 ">
                <div className="firstresNameDetails flex justify-between w-full px-2 my-4 lg:mx-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-orange-200 dark:border-orange-400">
                    <div className="left flex flex-col justify-center gap-2">
                        <h1 className="name text-lg font-bold font-open max-[800px]:w-full md:text-2xl text-gray-800 dark:text-white">TABISH</h1>
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-300">FRONTEND WEB DEVELOPER</p>
                    </div>
                    <div className="right flex flex-col justify-around bg-white/50 dark:bg-gray-700/50 items-center pr-2 rounded-xl p-2">
                        <img className="w-20 rounded-full" src="/src/images/bgre.png" alt="Tabish" />
                    </div>
                </div>
            </div>

            <div className="ACCORDIANS w-[90%] mb-5 flex flex-col justify-center items-center gap-1 lg:mb-10">
                <div
                    className="flex justify-between items-center px-2 bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600 rounded-xl mb-2 w-full py-1 max-[800px]:px-2 lg:w-[70%] cursor-pointer hover:shadow-lg transition-all duration-300"
                    onClick={() => handleItemClick("aboutme")}
                >
                    <span className="summary text-base pl-4 font-open font-bold py-1 lg:text-xl lg:p-3 text-white">ABOUT ME</span>
                    <span className="pr-4 text-white">{activeItem === "aboutme" ? <BsUnlockFill /> : <BsLockFill />}</span>
                </div>
                {activeItem === "aboutme" && (
                    <div className="flex mb-3 justify-center items-center font-sans bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl lg:w-[70%] border border-orange-200 dark:border-orange-400">
                        <div className="content px-4 text-sm font-medium py-4 p-2 text-gray-700 dark:text-gray-200">
                            I'm Tabish Javed, an engineering student and aspiring software developer passionate about full-stack web development and problem-solving. I have experience building projects using React, Tailwind CSS, JavaScript, and C++, with a growing focus on real-world applications like my recent project PicLingo, an AI-powered image caption generator.

                            I've completed a 5-month DSA course at CodeHelp and solved 150+ coding problems.
                        </div>
                    </div>
                )}
                <div
                    className="flex justify-between items-center px-2 bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600 rounded-xl mb-2 w-full py-1 max-[800px]:px-2 lg:w-[70%] cursor-pointer hover:shadow-lg transition-all duration-300"
                    onClick={() => handleItemClick("skills")}
                >
                    <span className="summary text-base pl-4 font-open font-bold py-1 lg:text-xl lg:p-3 text-white">SKILLS</span>
                    <span className="pr-4 text-white">{activeItem === "skills" ? <BsUnlockFill /> : <BsLockFill />}</span>
                </div>
                {activeItem === "skills" && (
                    <div className="flex mb-3 justify-around items-center font-sans bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl lg:w-[70%] border border-orange-200 dark:border-orange-400">
                        <div className="content px-4 text-sm p-2 flex justify-around flex-wrap gap-3 py-4">
                            <span className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 font-medium text-gray-700 dark:text-gray-200 rounded-md p-2 hover:bg-gradient-to-r hover:from-orange-200 hover:to-yellow-200 dark:hover:from-orange-800/70 dark:hover:to-yellow-800/70 transition-all duration-300 flex justify-center items-center lg:mx-5">REACT JS</span>
                            <span className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 font-medium text-gray-700 dark:text-gray-200 rounded-md p-2 hover:bg-gradient-to-r hover:from-orange-200 hover:to-yellow-200 dark:hover:from-orange-800/70 dark:hover:to-yellow-800/70 transition-all duration-300 flex justify-center items-center lg:mx-5">JAVASCRIPT</span>
                            <span className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 font-medium text-gray-700 dark:text-gray-200 rounded-md p-2 hover:bg-gradient-to-r hover:from-orange-200 hover:to-yellow-200 dark:hover:from-orange-800/70 dark:hover:to-yellow-800/70 transition-all duration-300 flex justify-center items-center lg:mx-5">TAILWIND</span>
                            <span className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 font-medium text-gray-700 dark:text-gray-200 rounded-md p-2 hover:bg-gradient-to-r hover:from-orange-200 hover:to-yellow-200 dark:hover:from-orange-800/70 dark:hover:to-yellow-800/70 transition-all duration-300 flex justify-center items-center lg:mx-5">CSS3</span>
                            <span className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 font-medium text-gray-700 dark:text-gray-200 rounded-md p-2 hover:bg-gradient-to-r hover:from-orange-200 hover:to-yellow-200 dark:hover:from-orange-800/70 dark:hover:to-yellow-800/70 transition-all duration-300 flex justify-center items-center lg:mx-5">HTML5</span>
                            <span className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 font-medium text-gray-700 dark:text-gray-200 rounded-md p-2 hover:bg-gradient-to-r hover:from-orange-200 hover:to-yellow-200 dark:hover:from-orange-800/70 dark:hover:to-yellow-800/70 transition-all duration-300 flex justify-center items-center lg:mx-5">C & C++</span>
                            <span className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 font-medium text-gray-700 dark:text-gray-200 rounded-md p-2 hover:bg-gradient-to-r hover:from-orange-200 hover:to-yellow-200 dark:hover:from-orange-800/70 dark:hover:to-yellow-800/70 transition-all duration-300 flex justify-center items-center lg:mx-5">DATA STRUCTURES & ALGORITHMS</span>
                            <span className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 font-medium text-gray-700 dark:text-gray-200 rounded-md p-2 hover:bg-gradient-to-r hover:from-orange-200 hover:to-yellow-200 dark:hover:from-orange-800/70 dark:hover:to-yellow-800/70 transition-all duration-300 flex justify-center items-center lg:mx-5">DBMS</span>
                            <span className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 font-medium text-gray-700 dark:text-gray-200 rounded-md p-2 hover:bg-gradient-to-r hover:from-orange-200 hover:to-yellow-200 dark:hover:from-orange-800/70 dark:hover:to-yellow-800/70 transition-all duration-300 flex justify-center items-center lg:mx-5">OS</span>
                            <span className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 font-medium text-gray-700 dark:text-gray-200 rounded-md p-2 hover:bg-gradient-to-r hover:from-orange-200 hover:to-yellow-200 dark:hover:from-orange-800/70 dark:hover:to-yellow-800/70 transition-all duration-300 flex justify-center items-center lg:mx-5">COMPUTER NETWORK</span>
                            <span className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 font-medium text-gray-700 dark:text-gray-200 rounded-md p-2 hover:bg-gradient-to-r hover:from-orange-200 hover:to-yellow-200 dark:hover:from-orange-800/70 dark:hover:to-yellow-800/70 transition-all duration-300 flex justify-center items-center lg:mx-5">GIT</span>
                            <span className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 font-medium text-gray-700 dark:text-gray-200 rounded-md p-2 hover:bg-gradient-to-r hover:from-orange-200 hover:to-yellow-200 dark:hover:from-orange-800/70 dark:hover:to-yellow-800/70 transition-all duration-300 flex justify-center items-center lg:mx-5">GITHUB</span>
                            <span className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 font-medium text-gray-700 dark:text-gray-200 rounded-md p-2 hover:bg-gradient-to-r hover:from-orange-200 hover:to-yellow-200 dark:hover:from-orange-800/70 dark:hover:to-yellow-800/70 transition-all duration-300 flex justify-center items-center lg:mx-5">OOPS</span>
                            <span className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 font-medium text-gray-700 dark:text-gray-200 rounded-md p-2 hover:bg-gradient-to-r hover:from-orange-200 hover:to-yellow-200 dark:hover:from-orange-800/70 dark:hover:to-yellow-800/70 transition-all duration-300 flex justify-center items-center lg:mx-5">PROBLEM SOLVING</span>
                        </div>
                    </div>
                )}
                <div
                    className="flex justify-between items-center px-2 bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600 rounded-xl mb-2 w-full py-1 max-[800px]:px-2 lg:w-[70%] cursor-pointer hover:shadow-lg transition-all duration-300"
                    onClick={() => handleItemClick("socials")}
                >
                    <span className="summary text-base pl-4 font-open font-bold py-1 lg:text-xl lg:p-3 text-white">SOCIALS</span>
                    <span className="pr-4 text-white">{activeItem === "socials" ? <BsUnlockFill /> : <BsLockFill />}</span>
                </div>
                {activeItem === "socials" && (
                    <div className="flex w-full mb-3 justify-center items-center font-sans bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl py-3 lg:w-[70%] border border-orange-200 dark:border-orange-400">
                        <div className="content px-4 text-sm p-2 flex justify-around w-full">
                            <Link to="https://www.linkedin.com/in/tabish-javed/" className="hover:scale-110 transition-transform duration-300"><img className="w-10" src="https://i.postimg.cc/ydvzTRdG/2504923.png" alt="LinkedIn" /></Link>
                            <Link to="https://github.com/tabish-27" className="hover:scale-110 transition-transform duration-300"><img className="w-10" src="https://i.postimg.cc/DZbMSbGs/2504911.png" alt="GitHub" /></Link>
                            <Link to="https://leetcode.com/u/Tabish_javed/" className="hover:scale-110 transition-transform duration-300"><img className="w-10" src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LeetCode" /></Link>
                            <a href="mailto:tabishjaved2030@gmail.com?subject=Hello%20Tabish&body=Hi%20Tabish,%0A%0AI%20would%20like%20to%20connect%20with%20you.%0A%0ABest%20regards," className="hover:scale-110 transition-transform duration-300"><img className="w-10" src="https://i.postimg.cc/bNv1Lf6V/10829119.png" alt="Email" /></a>
                            </div>
                    </div>
                )}

                <div
                    className="flex justify-between items-center px-2 bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600 rounded-xl mb-2 w-full py-1 max-[800px]:px-2 lg:w-[70%] cursor-pointer hover:shadow-lg transition-all duration-300"
                    onClick={() => handleItemClick("resume")}
                >
                    <span className="summary text-base pl-4 font-open font-bold py-1 lg:text-xl lg:p-3 text-white">RESUME</span>
                    <span className="pr-4 text-white">{activeItem === "resume" ? <BsUnlockFill /> : <BsLockFill />}</span>
                </div>
                {activeItem === "resume" && (
                    <div className="flex w-full mb-3 justify-center items-center font-sans bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-2 rounded-xl lg:w-[70%] border border-orange-200 dark:border-orange-400">
                        <div className="content px-4 text-sm p-2 w-full rounded-xl">
                            <a className="flex justify-center items-center" href="/src/RESUME/RESUME.pdf" download="RESUME.pdf">
                                <button className="flex justify-center gap-2 items-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg p-3 transition-all duration-300 hover:scale-105"><img className="w-6" src="https://i.postimg.cc/PqDG0cq1/1092004.png" alt="" /> <span className="font-semibold text-xl">Resume</span></button>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AboutMe
