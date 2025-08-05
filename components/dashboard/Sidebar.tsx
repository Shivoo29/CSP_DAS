"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  BarChart3,
  FileText,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { ReportType } from "@/app/dashboard/page"

interface SidebarProps {
  selectedReport: ReportType
  onReportSelect: (report: ReportType) => void
}

export function Sidebar({ selectedReport, onReportSelect }: SidebarProps) {
  const [dashboardsOpen, setDashboardsOpen] = useState(true)
  const [reportsOpen, setReportsOpen] = useState(true)

  const dashboards = [
    { id: "data-quality" as ReportType, label: "Data Quality Dashboard", icon: AlertCircle },
    { id: "cost-analysis" as ReportType, label: "Cost Analysis Dashboard", icon: DollarSign },
    { id: "supplier-performance" as ReportType, label: "Supplier Performance Dashboard", icon: Users },
    { id: "ip-posting-timeline" as ReportType, label: "IP Posting Timeline", icon: Calendar },
    { id: "savings-projection" as ReportType, label: "Savings Projection Dashboard", icon: TrendingUp },
  ]

  const reports = [
    { id: "pn-3-6-3" as ReportType, label: "Consider data with 3-6-3 PN only" },
    { id: "ip-copy-sap" as ReportType, label: "Find data that item having an IP, copy in SAP (Not accounted 0.01)" },
    { id: "ip-posting-date" as ReportType, label: "Find the date of IP posting" },
    {
      id: "buying-price-comparison" as ReportType,
      label: "Check for the Buying price before and after the should-cost entry date",
    },
    { id: "graewe-payout" as ReportType, label: "Check the data if it has Graewe payout from supplier + tax" },
    {
      id: "scaled-pricing" as ReportType,
      label: "If there is a scaled pricing company Supplier Cant Vs Supplier Cant / Same region",
    },
    {
      id: "supplier-code-check" as ReportType,
      label: "Check for the condition if there is a Supplier code (excluding standard supplier name region)",
    },
    {
      id: "price-reduction-cases" as ReportType,
      label:
        "Check for number of cases in which buying price has reduced with a different supplier more aligned to the should cost",
    },
    { id: "po-picks" as ReportType, label: "3 picks based on PO (PO#, Crepo Caron)" },
    {
      id: "price-reduction-sap" as ReportType,
      label: "Number of cases where the buying price has come down after posting the SAP IP",
    },
    {
      id: "cost-condition-value" as ReportType,
      label: "Dollar value of before and after cost condition and multiply with the overall purchased quantity",
    },
    { id: "savings-projection-forecast" as ReportType, label: "Get a savings projection with forecast details" },
    {
      id: "supplier-volume-value" as ReportType,
      label: "Supplier-wise Volume and Value where supplier cost is entered after the should-cost result",
    },
  ]

  return (
    <div className="w-80 bg-slate-800 border-r border-slate-700 flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-blue-400" />
          Supply Chain Analytics
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Collapsible open={dashboardsOpen} onOpenChange={setDashboardsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
              {dashboardsOpen ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2" />}
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboards
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 ml-6">
            {dashboards.map((dashboard) => {
              const Icon = dashboard.icon
              return (
                <Button
                  key={dashboard.id}
                  variant="ghost"
                  className={`w-full justify-start text-sm ${
                    selectedReport === dashboard.id
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-slate-400 hover:text-white hover:bg-slate-700"
                  }`}
                  onClick={() => onReportSelect(dashboard.id)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {dashboard.label}
                </Button>
              )
            })}
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={reportsOpen} onOpenChange={setReportsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
              {reportsOpen ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2" />}
              <FileText className="h-4 w-4 mr-2" />
              Specific Reports
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 ml-6">
            {reports.map((report) => (
              <Button
                key={report.id}
                variant="ghost"
                className={`w-full justify-start text-sm text-left h-auto py-2 px-3 ${
                  selectedReport === report.id
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "text-slate-400 hover:text-white hover:bg-slate-700"
                }`}
                onClick={() => onReportSelect(report.id)}
              >
                <div className="whitespace-normal leading-tight">{report.label}</div>
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}
