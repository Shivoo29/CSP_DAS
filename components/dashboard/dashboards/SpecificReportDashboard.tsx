"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Download, FileText, Filter, Play, CheckCircle, Loader2 } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
} from "recharts"
import type { ReportType } from "@/app/dashboard/page"

interface SpecificReportDashboardProps {
  reportType: ReportType
}

const reportTitles: Record<ReportType, string> = {
  "pn-3-6-3": "Data with 3-6-3 PN Analysis",
  "ip-copy-sap": "IP Copy in SAP Analysis",
  "ip-posting-date": "IP Posting Date Analysis",
  "buying-price-comparison": "Buying Price Before/After Comparison",
  "graewe-payout": "Graewe Payout Analysis",
  "scaled-pricing": "Scaled Pricing Comparison",
  "supplier-code-check": "Supplier Code Validation",
  "price-reduction-cases": "Price Reduction Cases Analysis",
  "po-picks": "PO-based Analysis (3 Picks)",
  "price-reduction-sap": "SAP IP Price Reduction Analysis",
  "cost-condition-value": "Cost Condition Dollar Value Analysis",
  "savings-projection-forecast": "Savings Projection with Forecast",
  "supplier-volume-value": "Supplier Volume & Value Analysis",
  "data-quality": "Data Quality Dashboard",
  "cost-analysis": "Cost Analysis Dashboard",
  "supplier-performance": "Supplier Performance Dashboard",
  "ip-posting-timeline": "IP Posting Timeline Dashboard",
  "savings-projection": "Savings Projection Dashboard",
}

// Sample data for different report types
const reportData = {
  "pn-3-6-3": {
    summary: { totalParts: 1247, activeSuppliers: 23, totalValue: 2400000, avgUnitCost: 1925 },
    chartData: [
      { category: "3-6-3-A", count: 456, value: 876000 },
      { category: "3-6-3-B", count: 389, value: 745000 },
      { category: "3-6-3-C", count: 402, value: 779000 },
    ],
    trendData: [
      { month: "Jan", parts: 1180, value: 2200000 },
      { month: "Feb", parts: 1205, value: 2280000 },
      { month: "Mar", parts: 1225, value: 2350000 },
      { month: "Apr", parts: 1240, value: 2380000 },
      { month: "May", parts: 1247, value: 2400000 },
    ],
    tableData: [
      { partNumber: "PN-3-6-3-001", supplier: "Supplier A", quantity: 1500, value: 45000, status: "Active" },
      { partNumber: "PN-3-6-3-002", supplier: "Supplier B", quantity: 2200, value: 66000, status: "Active" },
      { partNumber: "PN-3-6-3-003", supplier: "Supplier C", quantity: 800, value: 24000, status: "Review" },
      { partNumber: "PN-3-6-3-004", supplier: "Supplier D", quantity: 1800, value: 54000, status: "Active" },
      { partNumber: "PN-3-6-3-005", supplier: "Supplier E", quantity: 1200, value: 36000, status: "Active" },
    ],
  },
  "buying-price-comparison": {
    summary: { itemsAnalyzed: 3456, avgBeforePrice: 123.58, avgAfterPrice: 105.95, avgSavings: 14.3 },
    chartData: [
      { priceRange: "$0-50", beforeCount: 890, afterCount: 1120, savings: 18.2 },
      { priceRange: "$50-100", beforeCount: 1240, afterCount: 1380, savings: 15.8 },
      { priceRange: "$100-200", beforeCount: 980, afterCount: 720, savings: 12.4 },
      { priceRange: "$200+", beforeCount: 346, afterCount: 236, savings: 8.9 },
    ],
    trendData: [
      { month: "Jan", beforeAvg: 128.5, afterAvg: 112.3, savings: 12.6 },
      { month: "Feb", beforeAvg: 125.2, afterAvg: 108.7, savings: 13.2 },
      { month: "Mar", beforeAvg: 122.8, afterAvg: 105.9, savings: 13.8 },
      { month: "Apr", beforeAvg: 121.5, afterAvg: 104.2, savings: 14.2 },
      { month: "May", beforeAvg: 123.6, afterAvg: 105.9, savings: 14.3 },
    ],
    tableData: [
      {
        partNumber: "PN-001",
        beforePrice: 125.5,
        afterPrice: 98.75,
        savings: 21.3,
        shouldCostDate: "2024-01-15",
        supplier: "Supplier A",
      },
      {
        partNumber: "PN-002",
        beforePrice: 89.25,
        afterPrice: 76.8,
        savings: 13.9,
        shouldCostDate: "2024-01-20",
        supplier: "Supplier B",
      },
      {
        partNumber: "PN-003",
        beforePrice: 156.0,
        afterPrice: 142.3,
        savings: 8.8,
        shouldCostDate: "2024-01-25",
        supplier: "Supplier C",
      },
      {
        partNumber: "PN-004",
        beforePrice: 98.75,
        afterPrice: 82.5,
        savings: 16.5,
        shouldCostDate: "2024-02-01",
        supplier: "Supplier D",
      },
      {
        partNumber: "PN-005",
        beforePrice: 134.2,
        afterPrice: 115.8,
        savings: 13.7,
        shouldCostDate: "2024-02-05",
        supplier: "Supplier E",
      },
    ],
  },
  "supplier-volume-value": {
    summary: { totalSuppliers: 45, totalVolume: 185000, totalValue: 5200000, avgValuePerUnit: 28.1 },
    scatterData: [
      { x: 25000, y: 750000, name: "Supplier A" },
      { x: 32000, y: 960000, name: "Supplier B" },
      { x: 28000, y: 840000, name: "Supplier C" },
      { x: 22000, y: 660000, name: "Supplier D" },
      { x: 35000, y: 1050000, name: "Supplier E" },
    ],
    chartData: [
      { supplier: "Supplier A", volume: 25000, value: 750000 },
      { supplier: "Supplier B", volume: 32000, value: 960000 },
      { supplier: "Supplier C", volume: 28000, value: 840000 },
      { supplier: "Supplier D", volume: 22000, value: 660000 },
      { supplier: "Supplier E", volume: 35000, value: 1050000 },
    ],
    tableData: [
      {
        supplier: "Supplier A",
        volume: 25000,
        value: 750000,
        unitCost: 30.0,
        shouldCostEntry: "2024-01-10",
        savings: 45000,
      },
      {
        supplier: "Supplier B",
        volume: 32000,
        value: 960000,
        unitCost: 30.0,
        shouldCostEntry: "2024-01-15",
        savings: 58000,
      },
      {
        supplier: "Supplier C",
        volume: 28000,
        value: 840000,
        unitCost: 30.0,
        shouldCostEntry: "2024-01-20",
        savings: 52000,
      },
      {
        supplier: "Supplier D",
        volume: 22000,
        value: 660000,
        unitCost: 30.0,
        shouldCostEntry: "2024-01-25",
        savings: 38000,
      },
      {
        supplier: "Supplier E",
        volume: 35000,
        value: 1050000,
        unitCost: 30.0,
        shouldCostEntry: "2024-02-01",
        savings: 65000,
      },
    ],
  },
}

export function SpecificReportDashboard({ reportType }: SpecificReportDashboardProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const title = reportTitles[reportType] || "Report Analysis"
  const data = reportData[reportType as keyof typeof reportData]

  const runAnalysis = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setAnalysisComplete(false)
    setShowResults(false)

    // Simulate analysis progress
    const totalSteps = 100
    for (let i = 0; i <= totalSteps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50))
      setAnalysisProgress(i)
    }

    setIsAnalyzing(false)
    setAnalysisComplete(true)

    // Show results after a brief delay
    setTimeout(() => {
      setShowResults(true)
    }, 500)
  }

  const renderAnalysisResults = () => {
    if (!data || !showResults) return null

    switch (reportType) {
      case "pn-3-6-3":
        return (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-400">Total 3-6-3 Parts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{data.summary.totalParts.toLocaleString()}</div>
                  <p className="text-xs text-slate-400 mt-1">Active parts</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-400">Active Suppliers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{data.summary.activeSuppliers}</div>
                  <p className="text-xs text-slate-400 mt-1">Suppliers</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-400">Total Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    ${(data.summary.totalValue / 1000000).toFixed(1)}M
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Combined value</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-400">Avg. Unit Cost</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">${data.summary.avgUnitCost}</div>
                  <p className="text-xs text-slate-400 mt-1">Per unit</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">3-6-3 Category Distribution</CardTitle>
                  <CardDescription className="text-slate-400">Parts distribution by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="category" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="count" fill="#3B82F6" name="Part Count" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Monthly Trend Analysis</CardTitle>
                  <CardDescription className="text-slate-400">3-6-3 parts growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="parts" stroke="#3B82F6" strokeWidth={2} name="Parts Count" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Data Table */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Detailed 3-6-3 Parts Analysis</CardTitle>
                <CardDescription className="text-slate-400">Complete breakdown of 3-6-3 pattern parts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-slate-300">Part Number</th>
                        <th className="text-left py-3 px-4 text-slate-300">Supplier</th>
                        <th className="text-right py-3 px-4 text-slate-300">Quantity</th>
                        <th className="text-right py-3 px-4 text-slate-300">Value</th>
                        <th className="text-center py-3 px-4 text-slate-300">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.tableData.map((item: any, index) => (
                        <tr key={index} className="border-b border-slate-700/50">
                          <td className="py-3 px-4 text-white font-medium">{item.partNumber}</td>
                          <td className="py-3 px-4 text-slate-300">{item.supplier}</td>
                          <td className="py-3 px-4 text-right text-slate-300">{item.quantity.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-slate-300">${item.value.toLocaleString()}</td>
                          <td className="py-3 px-4 text-center">
                            <Badge variant={item.status === "Active" ? "default" : "secondary"}>{item.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "buying-price-comparison":
        return (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-400">Items Analyzed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{data.summary.itemsAnalyzed.toLocaleString()}</div>
                  <p className="text-xs text-slate-400 mt-1">Total items</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-400">Avg. Before Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">${data.summary.avgBeforePrice}</div>
                  <p className="text-xs text-slate-400 mt-1">Pre should-cost</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-400">Avg. After Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">${data.summary.avgAfterPrice}</div>
                  <p className="text-xs text-slate-400 mt-1">Post should-cost</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-400">Avg. Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">{data.summary.avgSavings}%</div>
                  <p className="text-xs text-slate-400 mt-1">Price reduction</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Price Range Analysis</CardTitle>
                  <CardDescription className="text-slate-400">
                    Before vs after distribution by price range
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="priceRange" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="beforeCount" fill="#EF4444" name="Before Count" />
                      <Bar dataKey="afterCount" fill="#10B981" name="After Count" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Monthly Savings Trend</CardTitle>
                  <CardDescription className="text-slate-400">Average price and savings over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="beforeAvg" stroke="#EF4444" strokeWidth={2} name="Before Avg" />
                      <Line type="monotone" dataKey="afterAvg" stroke="#10B981" strokeWidth={2} name="After Avg" />
                      <Line type="monotone" dataKey="savings" stroke="#3B82F6" strokeWidth={2} name="Savings %" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Data Table */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Price Comparison Details</CardTitle>
                <CardDescription className="text-slate-400">
                  Before vs after should-cost entry comparison
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-slate-300">Part Number</th>
                        <th className="text-right py-3 px-4 text-slate-300">Before Price</th>
                        <th className="text-right py-3 px-4 text-slate-300">After Price</th>
                        <th className="text-right py-3 px-4 text-slate-300">Savings</th>
                        <th className="text-left py-3 px-4 text-slate-300">Should-Cost Date</th>
                        <th className="text-left py-3 px-4 text-slate-300">Supplier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.tableData.map((item: any, index) => (
                        <tr key={index} className="border-b border-slate-700/50">
                          <td className="py-3 px-4 text-white font-medium">{item.partNumber}</td>
                          <td className="py-3 px-4 text-right text-slate-300">${item.beforePrice}</td>
                          <td className="py-3 px-4 text-right text-slate-300">${item.afterPrice}</td>
                          <td className="py-3 px-4 text-right text-green-400 font-medium">{item.savings}%</td>
                          <td className="py-3 px-4 text-slate-300">{item.shouldCostDate}</td>
                          <td className="py-3 px-4 text-slate-300">{item.supplier}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "supplier-volume-value":
        return (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-400">Total Suppliers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{data.summary.totalSuppliers}</div>
                  <p className="text-xs text-slate-400 mt-1">Active suppliers</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-400">Total Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{(data.summary.totalVolume / 1000).toFixed(0)}K</div>
                  <p className="text-xs text-slate-400 mt-1">Units</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-400">Total Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    ${(data.summary.totalValue / 1000000).toFixed(1)}M
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Total value</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-400">Avg. Value/Unit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">${data.summary.avgValuePerUnit}</div>
                  <p className="text-xs text-slate-400 mt-1">Per unit</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Volume vs Value Scatter Plot</CardTitle>
                  <CardDescription className="text-slate-400">Supplier positioning by volume and value</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart data={data.scatterData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="x" stroke="#9CA3AF" name="Volume" />
                      <YAxis dataKey="y" stroke="#9CA3AF" name="Value" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                        formatter={(value, name) => [
                          name === "x" ? `${value.toLocaleString()} units` : `$${value.toLocaleString()}`,
                          name === "x" ? "Volume" : "Value",
                        ]}
                      />
                      <Scatter dataKey="y" fill="#3B82F6" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Supplier Volume Analysis</CardTitle>
                  <CardDescription className="text-slate-400">Volume and value by supplier</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="supplier" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="volume" fill="#3B82F6" name="Volume" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Data Table */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Supplier Volume & Value Details</CardTitle>
                <CardDescription className="text-slate-400">Post should-cost entry analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-slate-300">Supplier</th>
                        <th className="text-right py-3 px-4 text-slate-300">Volume</th>
                        <th className="text-right py-3 px-4 text-slate-300">Value</th>
                        <th className="text-right py-3 px-4 text-slate-300">Unit Cost</th>
                        <th className="text-left py-3 px-4 text-slate-300">Should-Cost Entry</th>
                        <th className="text-right py-3 px-4 text-slate-300">Savings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.tableData.map((item: any, index) => (
                        <tr key={index} className="border-b border-slate-700/50">
                          <td className="py-3 px-4 text-white font-medium">{item.supplier}</td>
                          <td className="py-3 px-4 text-right text-slate-300">{item.volume.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-slate-300">${item.value.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-slate-300">${item.unitCost}</td>
                          <td className="py-3 px-4 text-slate-300">{item.shouldCostEntry}</td>
                          <td className="py-3 px-4 text-right text-green-400 font-medium">
                            ${item.savings.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  Analysis Complete
                </CardTitle>
                <CardDescription className="text-slate-400">
                  The analysis has been completed. Detailed results are being prepared.
                </CardDescription>
              </CardHeader>
              <CardContent className="py-12">
                <div className="text-center">
                  <div className="mx-auto w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-12 w-12 text-green-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Analysis Completed Successfully</h3>
                  <p className="text-slate-400 mb-6">
                    Your {title.toLowerCase()} has been processed. Results will be available in the detailed view.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <FileText className="h-4 w-4 mr-2" />
                    View Detailed Results
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <p className="text-slate-400 mt-2">Run comprehensive analysis on your supply chain data</p>
        </div>
        <div className="flex gap-3">
          {showResults && (
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          )}
        </div>
      </div>

      {!analysisComplete && !isAnalyzing && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-400" />
              Ready to Analyze
            </CardTitle>
            <CardDescription className="text-slate-400">
              Click the button below to run the {title.toLowerCase()} on your supply chain data.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-12">
            <div className="text-center">
              <div className="mx-auto w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                <Play className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Start Analysis</h3>
              <p className="text-slate-400 mb-6">
                This will analyze your uploaded supply chain data and generate comprehensive insights.
              </p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Configure Filters
                </Button>
                <Button onClick={runAnalysis} className="bg-blue-600 hover:bg-blue-700">
                  <Play className="h-4 w-4 mr-2" />
                  Run Analysis
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isAnalyzing && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
              Analysis in Progress
            </CardTitle>
            <CardDescription className="text-slate-400">
              Processing your supply chain data and generating insights...
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Progress</span>
              <span className="text-slate-300">{Math.round(analysisProgress)}%</span>
            </div>
            <Progress value={analysisProgress} className="bg-slate-700" />
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <div className="animate-pulse w-2 h-2 bg-blue-400 rounded-full"></div>
              Analyzing supply chain patterns and generating insights...
            </div>
          </CardContent>
        </Card>
      )}

      {analysisComplete && !showResults && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              Analysis Complete
            </CardTitle>
            <CardDescription className="text-slate-400">
              Your analysis has been completed successfully. Loading results...
            </CardDescription>
          </CardHeader>
          <CardContent className="py-8">
            <div className="text-center">
              <div className="animate-pulse w-8 h-8 bg-green-400 rounded-full mx-auto mb-4"></div>
              <p className="text-slate-300">Preparing detailed results...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {renderAnalysisResults()}
    </div>
  )
}
