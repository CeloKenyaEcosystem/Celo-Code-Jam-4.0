import React from "react";
import { FaBeer } from "react-icons/fa";
import {MdMenu} from "react-icons/md"
import { useNavigate } from "react-router-dom";


const Bar=()=>{
    const navigate = useNavigate();
    return(
        <>
        <div className="w-full flex items-start justify-center">
            <div className="w-full h-10 items-center ">
                <MdMenu className="h-full w-10" onClick={()=>{navigate("/home")}}/>
               
            </div>


        </div>
        
        </>
    )

}

export default Bar;