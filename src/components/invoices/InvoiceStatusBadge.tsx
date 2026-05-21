import { InvoiceStatus } from "@/types"
import { getStatusLabel, getStatusClasses } from "@/lib/utils/formatters"

export default function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClasses(status)}`}>
      {getStatusLabel(status)}
    </span>
  )
}