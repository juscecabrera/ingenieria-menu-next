

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar";
        
export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return(
        <div>
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger />
                {children}
            </SidebarProvider>
        </div>
    )

}
