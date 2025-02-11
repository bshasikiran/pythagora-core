import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ClipboardList, MessageSquare } from "lucide-react"
import { getAllComplaints, updateComplaintStatus, sendMessageToUser } from "@/api/admin"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/useToast"

type Complaint = {
  _id: string
  title: string
  description: string
  category: string
  status: string
  createdAt: string
  user: {
    email: string
  }
}

export function AdminComplaintList() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await getAllComplaints()
        setComplaints(response.complaints)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch complaints",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateComplaintStatus(id, status)
      setComplaints(complaints.map(complaint =>
        complaint._id === id ? { ...complaint, status } : complaint
      ))
      toast({
        title: "Success",
        description: "Complaint status updated successfully",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update complaint status",
      })
    }
  }

  const handleMessageSubmit = async () => {
    if (!selectedComplaint || !message.trim()) return

    try {
      await sendMessageToUser(selectedComplaint.user.email, message, selectedComplaint._id)
      toast({
        title: "Success",
        description: "Message sent successfully",
      })
      setMessage("")
      setSelectedComplaint(null)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500"
      case "in progress":
        return "bg-blue-500/10 text-blue-500"
      case "resolved":
        return "bg-green-500/10 text-green-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          All Complaints
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow key={complaint._id}>
                  <TableCell className="font-medium">
                    {complaint.title}
                  </TableCell>
                  <TableCell>{complaint.category}</TableCell>
                  <TableCell>{complaint.user.email}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(complaint.status)}>
                      {complaint.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Select
                        value={complaint.status}
                        onValueChange={(value) => handleStatusChange(complaint._id, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Update status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setSelectedComplaint(complaint)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Send Message</DialogTitle>
                            <DialogDescription>
                              Send a message to {complaint.user.email} regarding their complaint.
                            </DialogDescription>
                          </DialogHeader>
                          <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message here..."
                            className="min-h-[100px]"
                          />
                          <DialogFooter>
                            <Button onClick={handleMessageSubmit}>Send Message</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}