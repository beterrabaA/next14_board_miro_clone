import { ReactNode } from "react";

import { Sidebar } from "@/components/sidebar";
import { OrgSidebar } from "@/components/sidebar/OrgSidebar";
import Navbar from "@/components/Navbar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-full">
      <Sidebar />
      <div className="pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <OrgSidebar />
          <div className="h-full flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
