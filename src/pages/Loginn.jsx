import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import loginHandler from "../utils/store/services/loginServices";

const Loginn = () => {

    const loginToken = useSelector(store => store?.login?.loginToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (loginToken) {
            navigate(-1)
        }
    })



    return (
        <div className="min-h-screen flex justify-center items-center bg-[#f8f6f1] dark:bg-[#181818] py-12 px-2">
            <div className="w-full max-w-md bg-white dark:bg-[#232323] rounded-2xl shadow-xl border border-[#e5e2d8] dark:border-[#333] p-8 flex flex-col items-center">
                <h1 className="text-3xl font-serif font-bold text-[#222] dark:text-[#f8f6f1] tracking-wide mb-6">Login</h1>
                <form onSubmit={loginHandler} className="w-full flex flex-col gap-5">
                    <label htmlFor="username" className="flex flex-col gap-1 text-[#222] dark:text-[#f8f6f1] font-serif text-base">
                        Username
                        <input required type="text" name="username" id="username" placeholder="@johndoe" className="rounded-lg py-2 px-3 text-[#222] bg-[#faf8f3] dark:bg-[#232323] border border-[#bfa76a] focus:outline-none focus:border-[#bfa76a] font-serif" />
                    </label>
                    <label htmlFor="password" className="flex flex-col gap-1 text-[#222] dark:text-[#f8f6f1] font-serif text-base">
                        Password
                        <input required type="password" name="password" id="password" placeholder="*******" className="rounded-lg py-2 px-3 text-[#222] bg-[#faf8f3] dark:bg-[#232323] border border-[#bfa76a] focus:outline-none focus:border-[#bfa76a] font-serif" />
                    </label>
                    <label className="checkbox flex gap-2 items-center cursor-pointer text-[#222] dark:text-[#f8f6f1] font-serif">
                        <input type="checkbox" name="remember" id="remember" className="w-4 h-4" />
                        Remember Me
                    </label>
                    <button type="button" className="border border-[#bfa76a] text-[#bfa76a] font-serif px-6 py-2 rounded-lg hover:bg-[#faf8f3] dark:hover:bg-[#232323] transition-all duration-200" onClick={() => dispatch(loginHandler())}>Guest Mode</button>
                    <button type="submit" className="bg-[#bfa76a] text-white font-serif px-6 py-2 rounded-lg hover:bg-[#a68d4a] transition-all duration-200">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default Loginn;

