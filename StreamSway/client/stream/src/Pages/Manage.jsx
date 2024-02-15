import React from "react";
import SideBar from "../components/sideBar";
import HomeNavbar from "../components/HomeNavbar";
import ManageCard from "../components/manageCard";
import Navbar from "../components/navBar";
const Manage = ()=>{
    return(
        <div className="min-h-full h-screen w-full  overflow-y-auto ">
            <div className="w-full h-20">
            <Navbar/>
            </div>

           
                
                
                {/* <SideBar/> */}
                <div className="flex flex-col m-10     ">
                    <ManageCard/>
                </div>


            

        </div>

    )
}

export default Manage;