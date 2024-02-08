import React from "react";
import SideBar from "../components/sideBar";
import HomeNavbar from "../components/HomeNavbar";
import AddCard from "../components/addCard";
import Navbar from "../components/navBar";
const AddFreelancer = ()=>{
    return(
        <div className="min-h-full h-screen w-screen bg-green-600 fixed ">
<Navbar/>
            
                
                
                {/* <SideBar/> */}
                <div className="w-3/4  h-3/4 lg:w-3/4 md:h-3/4  ml-12 mt-5 ">
                    
                    <AddCard/>
                </div>


           

        </div>

    )
}

export default AddFreelancer;