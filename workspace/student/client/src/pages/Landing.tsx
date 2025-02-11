import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogIn, UserPlus, ShieldCheck } from "lucide-react"

export function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-lg backdrop-blur-sm bg-background/80">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500">
            Student Redressal System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">
            Welcome to CMR Technical Campus Student Redressal System
          </p>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            <TabsContent value="student" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Button
                  size="lg"
                  className="w-full transition-all hover:scale-105"
                  onClick={() => navigate("/login")}
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Login
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full transition-all hover:scale-105"
                  onClick={() => navigate("/register")}
                >
                  <UserPlus className="mr-2 h-5 w-5" />
                  Register
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="admin">
              <Button
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105"
                onClick={() => navigate("/login?role=admin")}
              >
                <ShieldCheck className="mr-2 h-5 w-5" />
                Admin Login
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}