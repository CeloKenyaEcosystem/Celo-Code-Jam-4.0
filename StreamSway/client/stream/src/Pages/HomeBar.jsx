import React from "react";
import Bar from "../components/Bar";
import sitting from "../assets/sitting.svg"
import standing from "../assets/standing.svg"
import cusd from "../assets/cusd.svg"

const HomeBar = () => {
    return (
        <main className="min-h-full w-full flex">
            <div className="w-full h-full">
                <div className="flex w-full">
                    <Bar />
                </div>
                {/* cards */}
                <div className="flex flex-col justify-between  gap-16 md:gap-8 items-center h-full w-full ">
                    <div className="w-4/5 flex  md:justify-between text-white h-48 md:w-3/4 bg-[#2B392B] border-r-neutral-800 border border-black rounded-lg p-4 relative">
                        <img src={sitting} alt="sitting" width={130} h={20}/>
                        <span className="    top-1/3">Manage User</span>
                        {/* Content of your card goes here */}
                    </div>
                    <div className="w-4/5 flex  md:justify-between text-white h-48 md:w-3/4 bg-[#2B392B] border-r-neutral-800 border border-black rounded-lg p-4 relative">
                        <img src={cusd} alt="sitting" width={130} h={20}/>
                        <span className="    top-1/3">Accounts</span>
                        {/* Content of your card goes here */}
                    </div>
                    <div className="w-4/5 flex  md:justify-between text-white h-48 md:w-3/4 bg-[#2B392B] border-r-neutral-800 border border-black rounded-lg p-4 relative">
                        <img src={standing} alt="sitting" width={130} h={20}/>
                        <span className="    top-1/3">User Community</span>
                        {/* Content of your card goes here */}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default HomeBar;
