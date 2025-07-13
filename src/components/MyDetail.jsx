
import { useNavigate } from "react-router-dom";
const MyDetail = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full text-xs lg:text-xl font-semibold bg-orange-200 dark:bg-orange-800 flex justify-center items-center gap-1 hover:bg-black/60 dark:hover:bg-gray-800/80 hover:text-white dark:hover:text-orange-200 transition-all duration-300" onClick={() => navigate("/aboutme")}>
            <img className="w-8 p-1 lg:w-10" src="https://i.postimg.cc/52rzsznP/210545.png" alt="" />
        </div>
    )
}

export default MyDetail
