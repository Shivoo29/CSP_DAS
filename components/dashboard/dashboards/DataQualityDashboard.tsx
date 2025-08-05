"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

const COLORS = ["#3B82F6", "#10B981", "#EF4444", "#F59E0B"]

const dataQualityMetrics = [
  { name: "Valid Records", value: 14890, color: "#10B981" },
  { name: "Duplicate Records", value: 320, color: "#EF4444" },
  { name: "Missing Fields", value: 150, color: "#F59E0B" },
  { name: "Invalid Formats", value: 60, color: "#EF4444" },
]

const validationProgress = [
  { field: "Part Numbers", total: 15420, valid: 15200, percentage: 98.6 },
  { field: "Supplier Codes", total: 15420, valid: 14950, percentage: 97.0 },
  { field: "Pricing Data", total: 15420, valid: 15100, percentage: 97.9 },
  { field: "Date Formats", total: 15420, valid: 15420, percentage: 100 },
  { field: "Mandatory Fields", total: 15420, valid: 14890, percentage: 96.6 },
]

const validationTrends = [
  { month: "Jan", validRecords: 12500, invalidRecords: 800, duplicates: 200 },
  { month: "Feb", validRecords: 13200, invalidRecords: 650, duplicates: 180 },
  { month: "Mar", validRecords: 14100, invalidRecords: 520, duplicates: 150 },
  { month: "Apr", validRecords: 14500, invalidRecords: 480, duplicates: 120 },
  { month: "May", validRecords: 14800, invalidRecords: 420, duplicates: 100 },
  { month: "Jun", validRecords: 14890, invalidRecords: 380, duplicates: 150 },
]

export function DataQualityDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Data Quality Dashboard</h1>
          <p className="text-slate-400 mt-2">Overview of data validation and cleaning results</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Total Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">15,420</div>
            <p className="text-xs text-slate-400 mt-1">Original dataset</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Cleaned Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">14,890</div>
            <p className="text-xs text-slate-400 mt-1">96.6% success rate</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Removed Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">530</div>
            <p className="text-xs text-slate-400 mt-1">3.4% of total</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Data Quality Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">96.6%</div>
            <p className="text-xs text-slate-400 mt-1">Excellent quality</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Data Quality Breakdown</CardTitle>
            <CardDescription className="text-slate-400">Distribution of record validation results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataQualityMetrics}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dataQualityMetrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
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

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Field Validation Status</CardTitle>
            <CardDescription className="text-slate-400">Validation progress by data field</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {validationProgress.map((field) => (
              <div key={field.field} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-300">{field.field}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">
                      {field.valid}/{field.total}
                    </span>
                    <Badge
                      variant={
                        field.percentage >= 98 ? "default" : field.percentage >= 95 ? "secondary" : "destructive"
                      }
                    >
                      {field.percentage}%
                    </Badge>
                  </div>
                </div>
                <Progress value={field.percentage} className="bg-slate-700" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Validation Trends Over Time</CardTitle>
          <CardDescription className="text-slate-400">Monthly validation results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={validationTrends}>
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
                <Area
                  type="monotone"
                  dataKey="validRecords"
                  stackId="1"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.6}
                  name="Valid Records"
                />
                <Area
                  type="monotone"
                  dataKey="invalidRecords"
                  stackId="1"
                  stroke="#EF4444"
                  fill="#EF4444"
                  fillOpacity={0.6}
                  name="Invalid Records"
                />
                <Area
                  type="monotone"
                  dataKey="duplicates"
                  stackId="1"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.6}
                  name="Duplicates"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Data Issues Summary</CardTitle>
          <CardDescription className="text-slate-400">
            Common data quality issues found during processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-slate-700 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-white">Missing Supplier Codes</h4>
                <p className="text-sm text-slate-400">470 records missing supplier identification codes</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-700 rounded-lg">
              <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-white">Duplicate Entries</h4>
                <p className="text-sm text-slate-400">
                  320 duplicate records removed based on part number and supplier combination
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-700 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-white">Date Format Standardization</h4>
                <p className="text-sm text-slate-400">All date formats successfully standardized to ISO format</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
