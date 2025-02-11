import { UsersList } from "./UsersList"
import { AdminComplaintList } from "./AdminComplaintList"

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <AdminComplaintList />
        <UsersList />
      </div>
    </div>
  )
}