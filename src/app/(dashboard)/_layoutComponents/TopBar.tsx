"use client";

import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { MdMenu, MdMenuOpen } from "react-icons/md";

interface TopBarProps{
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const TopBar = ({ setIsOpen }: TopBarProps) => {
    return(
        <div className={`sticky md:left-[250px] left-0 top-0 right-0 w-full h-[72px] bg-white border-b border-solid border-[#EDEDED] flex items-center justify-between px-10`}>
            
            {/* Title */}
            <div className="flex items-center w-max h-max">
                <button className="md:hidden" onClick={()=>setIsOpen(true)}><MdMenu/></button>
                <span className="font-inter md:text-2xl text-sm ml-10 md:ml-0 md:w-fit  w-2xl truncate leading-8 text-[#051635]">Dynamic Portfolio Dashboard</span>
            </div>

            {/* Nav buttons */}
            <div className="w-max h-[40px] flex items-center gap-[12px]">

                    {/* search button */}
                    <div className="w-[40px] h-full rounded-[8px] border border-solid border-[#F1F2F4] flex items-center justify-center">
                        <Image src={'/search.png'} alt="search-icon" width={16} height={16} />
                    </div>

                    {/* notification button */}
                    <div className="w-[40px] h-full rounded-[8px] border border-solid border-[#F1F2F4] flex items-center justify-center">
                        <Image src={'/notification.png'} alt="notification-icon" width={16} height={16} />
                    </div>

                    {/* settings button */}
                    <div className="w-[40px] h-full rounded-[8px] border border-solid border-[#F1F2F4] flex items-center justify-center">
                        <Image src={'/settings.png'} alt="settings-icon" width={16} height={16} />
                    </div>

            </div>

        </div>
    )
}