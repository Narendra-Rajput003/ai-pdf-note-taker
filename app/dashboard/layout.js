import Sidebar from "@/app/dashboard/_components/Sidebar";
import Header from "@/app/dashboard/_components/Header";


function  DashboardLayout({children}){
    return (
        <div>
            <div className="md:w-64 h-screen fixed">
                <Sidebar/>
            </div>
            <div className="md:ml-64">
                <Header/>
                <div className="p-10">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;