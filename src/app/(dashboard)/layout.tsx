import { Sidebar } from "./_layoutComponents/Sidebar";
import { TopBar } from "./_layoutComponents/TopBar";

interface DashboardLayoutProps{
    children: React.ReactNode;
};

const DashboardLayout = ( { children }: DashboardLayoutProps ) => {
    return(
        <div className="w-full h-screen flex bg-neutral-50 relative">
            <Sidebar/>
            <div className="ml-[250px] flex flex-col w-full overflow-hidden">
                <TopBar/>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout;