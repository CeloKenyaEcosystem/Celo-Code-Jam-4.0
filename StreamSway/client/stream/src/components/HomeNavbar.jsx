import React from "react";
import { useNavigate } from "react-router-dom";

const HomeNavbar = ()=>{
    const navigate = useNavigate();

    return(
        <div className="h-10 w-full flex justify-between items-center text-white p-10 fixed">
<div className="animate-bounce text-2xl">
<h2 className="text-sm">StreamPay</h2>
</div>

<button onClick={()=>{navigate("/add")}} className="px-8 py-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600">
              Get Started
            </button>
        </div>

    )
}
export default HomeNavbar;