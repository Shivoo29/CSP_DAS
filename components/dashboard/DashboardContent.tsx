"use client"

import type { ReportType } from "@/app/dashboard/page"
import { DataQualityDashboard } from "./dashboards/DataQualityDashboard"
import { CostAnalysisDashboard } from "./dashboards/CostAnalysisDashboard"
import { SupplierPerformanceDashboard } from "./dashboards/SupplierPerformanceDashboard"
import { IPPostingTimelineDashboard } from "./dashboards/IPPostingTimelineDashboard"
import { SavingsProjectionDashboard } from "./dashboards/SavingsProjectionDashboard"
import { SpecificReportDashboard } from "./dashboards/SpecificReportDashboard"

interface DashboardContentProps {
  selectedReport: ReportType
}

export function DashboardContent({ selectedReport }: DashboardContentProps) {
  const renderDashboard = () => {
    switch (selectedReport) {
      case "data-quality":
        return <DataQualityDashboard />
      case "cost-analysis":
        return <CostAnalysisDashboard />
      case "supplier-performance":
        return <SupplierPerformanceDashboard />
      case "ip-posting-timeline":
        return <IPPostingTimelineDashboard />
      case "savings-projection":
        return <SavingsProjectionDashboard />
      default:
        return <SpecificReportDashboard reportType={selectedReport} />
    }
  }

  return <div className="flex-1 overflow-auto">{renderDashboard()}</div>
}
