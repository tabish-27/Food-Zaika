import { useEffect, useState } from "react";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PercentIcon from '@mui/icons-material/Percent';
import SupportIcon from '@mui/icons-material/Support';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Badge from '@mui/material/Badge';
import { logoutHandler, updateLoginDetails } from "../utils/store/slices/loginSlice";
import { useDispatch } from "react-redux";
import { useTheme } from "../utils/ThemeContext";

const Navbar = () => {
    const [isLocationEditable, setIsLocationEditable] = useState(false);
    const [customLocation, setCustomLocation] = useState("Noida, Uttar Pradesh, India");
    const items = useSelector(store => store?.cart?.items)
    const loginToken = useSelector(store => store?.login?.loginToken)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isDarkMode, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem('user'))
        dispatch(updateLoginDetails(userDetails));
    }, [])

    // Helper to check if a route is active
    const isActive = (path) => {
        if (path === "/cart") return location.pathname.startsWith("/cart");
        if (path === "/aboutme") return location.pathname === "/aboutme";
        if (path === "/offers") return location.pathname === "/offers"; // If you have an offers route
        if (path === "/") return location.pathname === "/";
        return false;
    };

    // Nav actions as a component for reuse
    const NavActions = (
        <ul className="flex flex-col md:flex-row items-center gap-6 md:gap-8 bg-white/20 dark:bg-slate-800/30 backdrop-blur-xl rounded-2xl md:rounded-full border border-white/30 dark:border-slate-600/40 shadow-lg px-6 py-4 md:px-6 md:py-2">
            <li>
                <button
                    className={`flex items-center gap-2 px-3 py-1 rounded-full font-semibold hover:bg-gradient-to-r hover:from-indigo-400 hover:to-purple-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${isActive("/aboutme") ? "text-indigo-400 font-bold" : "text-white/90"}`}
                    aria-label="About Me"
                    onClick={() => { setMenuOpen(false); navigate('/aboutme'); }}
                >
                    <SupportIcon className="text-base" />
                    <span className="hidden sm:inline">About Me</span>
                </button>
            </li>
            <li>
                <button
                    className={`flex items-center gap-2 px-3 py-1 rounded-full font-semibold hover:bg-gradient-to-r hover:from-indigo-400 hover:to-purple-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${isActive("/offers") ? "text-indigo-400 font-bold" : "text-white/90"}`}
                    aria-label="Offers"
                >
                    <PercentIcon className="text-base" />
                    <span className="hidden sm:inline">Offers</span>
                </button>
            </li>
            <li>
                <Link
                    to="/cart"
                    className={`flex items-center gap-2 px-3 py-1 rounded-full font-semibold hover:bg-gradient-to-r hover:from-indigo-400 hover:to-purple-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${isActive("/cart") ? "text-indigo-400 font-bold" : "text-white/90"}`}
                    aria-label="Cart"
                    onClick={() => setMenuOpen(false)}
                >
                    <Badge badgeContent={items.length} color="primary" className="animate-pulse">
                        <ShoppingCartOutlinedIcon className="text-base" />
                    </Badge>
                    <span className="hidden sm:inline">Cart</span>
                </Link>
            </li>
            <li>
                <button
                    className={`flex items-center gap-2 px-3 py-1 rounded-full font-semibold hover:bg-gradient-to-r hover:from-indigo-400 hover:to-purple-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white/90`}
                    aria-label="Toggle theme"
                    onClick={() => { toggleTheme(); setMenuOpen(false); }}
                >
                    {isDarkMode ? <LightModeIcon className="text-base" /> : <DarkModeIcon className="text-base" />}
                    <span className="hidden sm:inline">{isDarkMode ? "Light" : "Dark"}</span>
                </button>
            </li>
            <li>
                <button
                    className={`flex items-center gap-2 px-3 py-1 rounded-full font-semibold hover:bg-gradient-to-r hover:from-indigo-400 hover:to-purple-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white/90`}
                    aria-label={loginToken ? "Logout" : "Login"}
                    onClick={() => { setMenuOpen(false); loginToken ? dispatch(logoutHandler()) : navigate('/login'); }}
                >
                    <PermIdentityIcon className="text-base" />
                    <span className="hidden sm:inline">{loginToken ? "Logout" : "Login"}</span>
                </button>
            </li>
        </ul>
    );

    // Location + Search as a component for reuse
    const LocationSearch = (
        <div className="flex items-center bg-white/30 dark:bg-slate-800/40 backdrop-blur-xl rounded-2xl md:rounded-full border border-white/30 dark:border-slate-600/40 shadow-lg px-4 py-3 md:px-4 md:py-2 gap-2 mt-4 md:mt-0">
            <LocationOnOutlinedIcon className="text-indigo-400 dark:text-indigo-300 text-lg" />
            {isLocationEditable ? (
                <div className="flex items-center gap-1">
                    <input
                        type="text"
                        value={customLocation}
                        onChange={e => setCustomLocation(e.target.value)}
                        className="text-xs md:text-sm text-slate-800 dark:text-slate-100 bg-indigo-100 dark:bg-slate-700 px-2 py-1 rounded-lg border-2 border-indigo-300 dark:border-slate-500 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500/30 shadow-sm"
                        autoFocus
                    />
                    <button
                        onClick={() => setIsLocationEditable(false)}
                        className="text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-2 py-1 rounded-lg text-xs transition-all duration-200 hover:scale-105 hover:shadow-lg font-bold"
                        aria-label="Save location"
                    >✓</button>
                </div>
            ) : (
                <button
                    className="text-xs md:text-sm text-white font-bold cursor-pointer hover:text-indigo-400 transition-all duration-300 hover:scale-105"
                    onClick={() => setIsLocationEditable(true)}
                    aria-label="Edit location"
                >{customLocation}</button>
            )}
            <div className="flex items-center gap-1 ml-3">
                <SearchIcon className="text-lg text-indigo-400 dark:text-indigo-300" />
                <span className="text-xs md:text-sm text-white font-semibold">Search</span>
            </div>
        </div>
    );

    return (
        <div className="parent w-full bg-gradient-to-r from-slate-900/80 via-indigo-900/80 to-purple-900/80 dark:from-slate-950/90 dark:via-slate-900/90 dark:to-slate-950/90 shadow-2xl dark:shadow-slate-900/50 border-b-4 border-indigo-400/40 dark:border-slate-600/40 transition-all duration-300 px-2 md:px-8 py-2 backdrop-blur-xl">
            <div className="flex items-center justify-between w-full">
                {/* Logo and Brand */}
                <Link to="/" className="flex items-center cursor-pointer hover:scale-105 transition-all duration-300 group">
                    <img
                        className="logo ml-2 md:ml-6 w-14 h-14 object-contain rounded-xl shadow-md bg-white"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNrzDrUGeoEd4gQlpmnL1bgIFX93hE9TY0OA&s"
                        alt="Food Zaika Logo"
                    />
                    <span
                        className="ml-3 text-2xl md:text-3xl font-black bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg dark:from-yellow-300 dark:via-fuchsia-400 dark:to-indigo-400 transition-all duration-300 select-none tracking-wider hover:scale-105 group-hover:animate-pulse"
                        style={{ fontFamily: 'Dancing Script, Noto Nastaliq Urdu, cursive', letterSpacing: '0.02em', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: '700' }}
                    >
                        <span className="relative">
                            <span className="text-purple-600 relative">
                                <span style={{ fontFamily: 'Dancing Script, cursive' }}>Food</span>
                                <span className="absolute -top-1 -right-1 text-xs text-pink-400">•</span>
                                <span className="absolute -bottom-1 left-2 text-xs text-amber-400">•</span>
                                <span className="absolute top-1/2 -right-2 text-xs text-indigo-400">•</span>
                            </span>
                            <span className="text-purple-600 relative ml-2">
                                <span style={{ fontFamily: 'Dancing Script, cursive' }}>Zaika</span>
                                <span className="absolute -top-1 -right-1 text-xs text-pink-400">•</span>
                                <span className="absolute -bottom-1 left-2 text-xs text-amber-400">•</span>
                                <span className="absolute top-1/2 -right-2 text-xs text-indigo-400">•</span>
                            </span>
                            <span className="absolute -top-2 -right-2 text-lg text-pink-400">•</span>
                        </span>
                    </span>
                </Link>

                {/* Hamburger for mobile */}
                <button
                    className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    aria-label="Toggle navigation menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>

                {/* Desktop nav actions and location/search */}
                <div className="hidden md:flex flex-1 justify-end items-center">
                    {NavActions}
                    <div className="ml-8">{LocationSearch}</div>
                </div>
            </div>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div className="md:hidden w-full flex flex-col items-center animate-fade-in-down z-50">
                    <div className="mt-4">{NavActions}</div>
                    <div className="mt-2 mb-2">{LocationSearch}</div>
                </div>
            )}
        </div>
    );
};

export default Navbar;