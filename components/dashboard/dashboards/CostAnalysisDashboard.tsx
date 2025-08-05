"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
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
  PieChart,
  Pie,
  Cell,
} from "recharts"

const costTrendData = [
  { month: "Jan", beforeCost: 2400, afterCost: 2100, savings: 300 },
  { month: "Feb", beforeCost: 2600, afterCost: 2200, savings: 400 },
  { month: "Mar", beforeCost: 2800, afterCost: 2300, savings: 500 },
  { month: "Apr", beforeCost: 3000, afterCost: 2400, savings: 600 },
  { month: "May", beforeCost: 3200, afterCost: 2500, savings: 700 },
  { month: "Jun", beforeCost: 3400, afterCost: 2600, savings: 800 },
]

const supplierCostData = [
  { supplier: "Supplier A", beforeCost: 45000, afterCost: 38000, savings: 7000 },
  { supplier: "Supplier B", beforeCost: 52000, afterCost: 46000, savings: 6000 },
  { supplier: "Supplier C", beforeCost: 38000, afterCost: 34000, savings: 4000 },
  { supplier: "Supplier D", beforeCost: 41000, afterCost: 37000, savings: 4000 },
  { supplier: "Supplier E", beforeCost: 29000, afterCost: 26000, savings: 3000 },
]

const savingsBreakdown = [
  { category: "Material Cost", value: 15000, color: "#3B82F6" },
  { category: "Labor Cost", value: 8000, color: "#10B981" },
  { category: "Overhead", value: 5000, color: "#F59E0B" },
  { category: "Transportation", value: 3000, color: "#EF4444" },
]

export function CostAnalysisDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Cost Analysis Dashboard</h1>
          <p className="text-slate-400 mt-2">Before vs After cost comparison and savings analysis</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Total Before Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$2.4M</div>
            <p className="text-xs text-slate-400 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-red-400" />
              Original costs
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Total After Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$2.0M</div>
            <p className="text-xs text-slate-400 mt-1 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-green-400" />
              Optimized costs
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Total Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">$400K</div>
            <p className="text-xs text-slate-400 mt-1 flex items-center">
              <DollarSign className="h-3 w-3 mr-1 text-green-400" />
              16.7% reduction
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Avg. Savings per Item</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">$27</div>
            <p className="text-xs text-slate-400 mt-1">Per part number</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Cost Trend Analysis</CardTitle>
            <CardDescription className="text-slate-400">Monthly before vs after cost comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={costTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="beforeCost" stroke="#EF4444" strokeWidth={2} name="Before Cost" />
                  <Line type="monotone" dataKey="afterCost" stroke="#10B981" strokeWidth={2} name="After Cost" />
                  <Line type="monotone" dataKey="savings" stroke="#3B82F6" strokeWidth={2} name="Savings" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Savings Breakdown</CardTitle>
            <CardDescription className="text-slate-400">Cost savings by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={savingsBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {savingsBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `$${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Supplier-wise Cost Breakdown</CardTitle>
          <CardDescription className="text-slate-400">Cost comparison and savings by supplier</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={supplierCostData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="supplier" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Legend />
                <Bar dataKey="beforeCost" fill="#EF4444" name="Before Cost" />
                <Bar dataKey="afterCost" fill="#10B981" name="After Cost" />
                <Bar dataKey="savings" fill="#3B82F6" name="Savings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
