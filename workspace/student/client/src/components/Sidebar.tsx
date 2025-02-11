import { useNavigate } from "react-router-dom"
import { Home, FilePenLine, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    href: string
    title: string
    icon: string
  }[]
}

export function Sidebar({ className, items, ...props }: SidebarProps) {
  const navigate = useNavigate()
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Home":
        return Home
      case "FilePenLine":
        return FilePenLine
      case "ClipboardList":
        return ClipboardList
      default:
        return Home
    }
  }

  return (
    <div className="pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Navigation
          </h2>
          <div className="space-y-1">
            {items.map((item) => {
              const Icon = getIcon(item.icon)
              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate(item.href)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}