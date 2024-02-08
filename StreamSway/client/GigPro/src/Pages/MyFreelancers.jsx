import React from "react";
import SideBar from "../components/sideBar";
import HomeNavbar from "../components/HomeNavbar";
import MyFreelancerCard from "../components/myfreelancerCard";
import Navbar from "../components/navBar";
const MyFreeLancers = ()=>{
    return(
        <div className="min-h-full h-screen w-full bg-green-600  overflow-y-auto ">
<Navbar/>
           
                
                {/* <SideBar/> */}
                <div className="flex flex-col ml-10 mr-10    ">
                    <MyFreelancerCard/>
               


            </div>

        </div>

    )
}

export default MyFreeLancers;