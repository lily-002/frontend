import Header from "./header/Header";
import SideNav from "./sideNav/SideNav";
import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Style

const Dashboard = () => {
  const { t } = useTranslation();
  const [collapse, setCollapse] = useState(() => {
    const toggler = localStorage.getItem("econ_collapse");
    if(toggler){ return JSON.parse(toggler); }
    return false;
  });

  useEffect(() => {

    localStorage.setItem("econ_collapse", JSON.stringify(collapse));

  }, [collapse]);

  return (
    <div className="w-full h-screen relative">
        
        {/* Header */}
        <div className={`w-full ${collapse ? "" : "md:w-[calc(100%-280px)]"} h-[100px] border-b absolute top-0 left-0 ${collapse ? "" : "md:left-[280px]"} z-20 py-2 flex justify-center items-center transition-all`}>
            <Header collapse={collapse} setCollapse={setCollapse} />
        </div>

        {/* Side Navigation */}
        <div className={`hidden w-[280px] h-[calc(100vh-70px)] ${collapse ? "" : "md:block"}  bg-primary text-white text-sm overflow-y-scroll overflow-x-hidden sticky left-0 transition-all`}>
            <SideNav collapse={collapse} />
        </div>

        {/* Main Section */}
        <div className={`w-full ${collapse ? "" : "md:w-[calc(100%-280px)]"} h-[calc(100vh-170px)] absolute top-[100px] left-0 ${collapse ? "" : "md:left-[280px]"} py-3 px-4 overflow-y-scroll overflow-x-hidden transition-all`}>
            <Outlet />
        </div>

        {/* Footer */}
        <div className="w-full h-[70px] bg-primary text-white absolute left-0 bottom-0 text-xs md:text-sm flex justify-center items-center py-2 px-16 transition-all">
            <p dangerouslySetInnerHTML={{__html: `&copy; ${new Date().getFullYear()} ${t("description.dashboard.all_rights_reserved_")} <span class="text-xl">&reg;</span>` }}></p>
        </div>
        
    </div>
  )

}

export default Dashboard;