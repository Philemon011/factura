import Sidebar from "@/components/layout/Sidebar"
import PageTransition from "@/components/layout/PageTransition"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
    </div>
  )
}