import React from "react";
import SideBar from "../components/sideBar";
import HomeNavbar from "../components/HomeNavbar";
import StreamCard from "../components/streamcards";
import Navbar from "../components/navBar";
const Stream = ()=>{
    return(
        <div className="min-h-full h-screen w-full  overflow-y-auto ">
            <div className="h-20 w-full">
            <Navbar/>
            </div>

            
                
                
                
                {/* <SideBar/> */}
                
                    <div className="flex flex-col ml-10 mr-10   ">
                    <StreamCard/>
                    </div>
                   
                


           

        </div>

    )
}

export default Stream;