"use client";

import Image from "next/image";

export const TopBar = () => {
    return(
        <div className="sticky left-[250px] top-0 right-0 w-full h-[72px] bg-white border-b border-solid border-[#EDEDED] flex items-center justify-between px-10">
            
            {/* Title */}
            <span className="font-inter text-2xl leading-8 text-[#051635]">Dynamic Portfolio Dashboard</span>

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