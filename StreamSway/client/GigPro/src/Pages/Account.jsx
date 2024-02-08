import React from "react";
import SideBar from "../components/sideBar";
import HomeNavbar from "../components/HomeNavbar";
import AddCard from "../components/addCard";
import AccountCards from "../components/accountCards";
import Navbar from "../components/navBar";
import { ethers } from "ethers";
import {Framework} from "@superfluid-finance/sdk-core";
const Account = ()=>{
  
    return(
        <div className="min-h-full h-screen w-full fixed bg-green-600  ">
            <div className="w-full ">
            <Navbar/>
            </div>

            
                
                
                {/* <SideBar/> */}
                <div className="w-full  h-1/2 ml-10 ">
                    
                    <AccountCards/>
                


            </div>

        </div>

    )
}

export default Account;