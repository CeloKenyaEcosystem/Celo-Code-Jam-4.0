import React from "react";
import SideBar from "../components/sideBar";
import HomeNavbar from "../components/HomeNavbar";
import ManageCard from "../components/manageCard";
import Navbar from "../components/navBar";
const Manage = ()=>{
    return(
        <div className="min-h-full h-screen w-full bg-green-600 overflow-y-auto ">
<Navbar/>
            <div className="h-full w-full flex text-white gap-10">
                
                
                {/* <SideBar/> */}
                <div className="flex flex-col ml-10      ">
                    <ManageCard/>
                </div>


            </div>

        </div>

    )
}

export default Manage;