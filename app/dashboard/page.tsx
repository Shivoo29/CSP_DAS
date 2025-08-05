"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { DashboardContent } from "@/components/dashboard/DashboardContent"
import { SidebarProvider } from "@/components/ui/sidebar"

export type ReportType =
  | "data-quality"
  | "cost-analysis"
  | "supplier-performance"
  | "ip-posting-timeline"
  | "savings-projection"
  | "pn-3-6-3"
  | "ip-copy-sap"
  | "ip-posting-date"
  | "buying-price-comparison"
  | "graewe-payout"
  | "scaled-pricing"
  | "supplier-code-check"
  | "price-reduction-cases"
  | "po-picks"
  | "price-reduction-sap"
  | "cost-condition-value"
  | "savings-projection-forecast"
  | "supplier-volume-value"

export default function DashboardPage() {
  const [selectedReport, setSelectedReport] = useState<ReportType>("data-quality")

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-slate-900">
        <Sidebar selectedReport={selectedReport} onReportSelect={setSelectedReport} />
        <DashboardContent selectedReport={selectedReport} />
      </div>
    </SidebarProvider>
  )
}
