import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { Sidebar } from "./Sidebar"
import { ScrollArea } from "./ui/scroll-area"

const sidebarNavItems = [
  {
    title: "Dashboard",
    icon: "Home",
    href: "/dashboard",
  },
  {
    title: "Submit Complaint",
    icon: "FilePenLine",
    href: "/submit-complaint",
  },
  {
    title: "My Complaints",
    icon: "ClipboardList",
    href: "/my-complaints",
  },
]

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Header />
      <div className="flex h-[calc(100vh-4rem)] pt-16">
        <aside className="hidden w-64 border-r bg-background/80 backdrop-blur-sm md:block">
          <ScrollArea className="h-full">
            <Sidebar items={sidebarNavItems} />
          </ScrollArea>
        </aside>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}