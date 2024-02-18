import React from "react";
import SideBar from "../components/sideBar";
import HomeNavbar from "../components/HomeNavbar";
import MyFreelancerCard from "../components/myfreelancerCard";
import Navbar from "../components/navBar";

const MyFreeLancers = () => {
    return (
        <div className="min-h-full h-screen w-full overflow-y-auto">
            <div className="h-20 w-full">
                <Navbar />
            </div>

            {/* <SideBar /> */}
            <div className=" flex flex-col ml-10 mr-10 w-full ">
                <MyFreelancerCard />
            </div>
        </div>
    );
}

export default MyFreeLancers;
