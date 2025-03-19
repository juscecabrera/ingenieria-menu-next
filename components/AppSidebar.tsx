import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import Plate from '../svg/plateSVG.svg'
import File from '../svg/fileSVG.svg'
import Informes from '../svg/informesSVG.svg'
import Logo from '../public/logoGastro.webp'
import Image from "next/image"
import Link from "next/link"
import { NavUser } from "./NavUser"
  

const userDataDemo = {
    name: "Jusce",
    email: "jusce@example.com",
    avatar: 'logoGastro.webp'
}

export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader className="flex items-center justify-center my-4">
            <Image 
                src={Logo}
                alt="logo"
                className="w-3/5"
            />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu className="gap-4">
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Link href="/platos" className="flex flex-row items-center justify-start gap-2 w-full">
                            <Image 
                                    src={Plate}
                                    alt="platossvg"
                                    width={30}
                                    height={30}
                                />
                                <span className="text-lg">Platos</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Link href="/costs" className="flex flex-row items-center justify-start gap-2 w-full">
                            <Image 
                                    src={File}
                                    alt="filesvg"
                                    width={30}
                                    height={30}
                                />
                                <span className="text-lg">Costos</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Link href="/informes" className="flex flex-row items-center justify-start gap-2 w-full">
                            <Image 
                                    src={Informes}
                                    alt="informessvg"
                                    width={30}
                                    height={30}
                                />
                                <span className="text-lg">Informes</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter>
            <NavUser user={userDataDemo}/>
        </SidebarFooter>
      </Sidebar>
    )
  }
  