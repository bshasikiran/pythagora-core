import { ComplaintForm } from "./ComplaintForm"
import { ComplaintList } from "./ComplaintList"

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <ComplaintForm />
        <ComplaintList />
      </div>
    </div>
  )
}