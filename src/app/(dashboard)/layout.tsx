"use client"

import { useEffect, useState } from "react";
import { Sidebar } from "./_layoutComponents/Sidebar";
import { TopBar } from "./_layoutComponents/TopBar";

interface DashboardLayoutProps{
    children: React.ReactNode;
};

const DashboardLayout = ( { children }: DashboardLayoutProps ) => {

    const [ isSidebarOpen , setIsSidebarOpen ] = useState<boolean>(true);

    useEffect(() => {

        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false); 
            } else {
                setIsSidebarOpen(true); 
            }
        };

        handleResize(); 

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
      }, []
    );

    return(
        <div className="w-full h-screen flex bg-neutral-50 relative">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <div className="md:ml-[250px] flex flex-col w-full overflow-hidden">
                <TopBar setIsOpen={setIsSidebarOpen}/>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout;