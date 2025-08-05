"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, Target } from "lucide-react"
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
  AreaChart,
  Area,
} from "recharts"

const savingsProjectionData = [
  { month: "Jan", actual: 35000, projected: 32000, target: 40000 },
  { month: "Feb", actual: 42000, projected: 38000, target: 45000 },
  { month: "Mar", actual: 38000, projected: 41000, target: 42000 },
  { month: "Apr", actual: 45000, projected: 44000, target: 48000 },
  { month: "May", actual: 52000, projected: 47000, target: 50000 },
  { month: "Jun", actual: 48000, projected: 51000, target: 52000 },
  { month: "Jul", actual: null, projected: 54000, target: 55000 },
  { month: "Aug", actual: null, projected: 57000, target: 58000 },
  { month: "Sep", actual: null, projected: 60000, target: 60000 },
  { month: "Oct", actual: null, projected: 62000, target: 62000 },
  { month: "Nov", actual: null, projected: 65000, target: 65000 },
  { month: "Dec", actual: null, projected: 68000, target: 68000 },
]

const departmentSavings = [
  { department: "Manufacturing", current: 125000, projected: 180000 },
  { department: "Procurement", current: 95000, projected: 140000 },
  { department: "Logistics", current: 68000, projected: 95000 },
  { department: "Quality", current: 42000, projected: 65000 },
  { department: "R&D", current: 35000, projected: 52000 },
]

const forecastDetails = [
  { category: "Material Cost Reduction", q1: 45000, q2: 52000, q3: 58000, q4: 65000 },
  { category: "Process Optimization", q1: 32000, q2: 38000, q3: 42000, q4: 48000 },
  { category: "Supplier Negotiation", q1: 28000, q2: 35000, q3: 40000, q4: 45000 },
  { category: "Waste Reduction", q1: 18000, q2: 22000, q3: 25000, q4: 28000 },
]

const roiAnalysis = [
  { category: "Process Improvement", investment: 50000, savings: 180000, roi: 260 },
  { category: "Technology Upgrade", investment: 120000, savings: 350000, roi: 192 },
  { category: "Supplier Optimization", investment: 80000, savings: 280000, roi: 250 },
  { category: "Waste Reduction", investment: 30000, savings: 95000, roi: 217 },
]

const riskAssessment = [
  { month: "Jul", conservative: 45000, optimistic: 65000, realistic: 54000 },
  { month: "Aug", conservative: 48000, optimistic: 68000, realistic: 57000 },
  { month: "Sep", conservative: 52000, optimistic: 72000, realistic: 60000 },
  { month: "Oct", conservative: 55000, optimistic: 75000, realistic: 62000 },
  { month: "Nov", conservative: 58000, optimistic: 78000, realistic: 65000 },
  { month: "Dec", conservative: 62000, optimistic: 82000, realistic: 68000 },
]

export function SavingsProjectionDashboard() {
  const totalCurrentSavings = departmentSavings.reduce((sum, dept) => sum + dept.current, 0)
  const totalProjectedSavings = departmentSavings.reduce((sum, dept) => sum + dept.projected, 0)
  const projectedIncrease = (((totalProjectedSavings - totalCurrentSavings) / totalCurrentSavings) * 100).toFixed(1)

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Savings Projection Dashboard</h1>
          <p className="text-slate-400 mt-2">Current savings and annual projections with forecast details</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Current Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${(totalCurrentSavings / 1000).toFixed(0)}K</div>
            <p className="text-xs text-slate-400 mt-1">Year to date</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Projected Annual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">${(totalProjectedSavings / 1000).toFixed(0)}K</div>
            <p className="text-xs text-slate-400 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-400" />+{projectedIncrease}% increase
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Monthly Target</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">$55K</div>
            <p className="text-xs text-slate-400 mt-1 flex items-center">
              <Target className="h-3 w-3 mr-1 text-blue-400" />
              Current month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Achievement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">94.2%</div>
            <p className="text-xs text-slate-400 mt-1">Target vs actual</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Savings Projection Timeline</CardTitle>
            <CardDescription className="text-slate-400">Actual vs projected savings with targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={savingsProjectionData}>
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
                    formatter={(value) => [`$${value?.toLocaleString()}`, ""]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#10B981"
                    strokeWidth={3}
                    name="Actual Savings"
                    connectNulls={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="projected"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Projected Savings"
                  />
                  <Line type="monotone" dataKey="target" stroke="#F59E0B" strokeWidth={2} name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Department-wise Savings</CardTitle>
            <CardDescription className="text-slate-400">Current vs projected savings by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentSavings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="department" stroke="#9CA3AF" />
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
                  <Bar dataKey="current" fill="#10B981" name="Current Savings" />
                  <Bar dataKey="projected" fill="#3B82F6" name="Projected Savings" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Quarterly Forecast Details</CardTitle>
          <CardDescription className="text-slate-400">
            Detailed savings forecast by category and quarter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-300">Category</th>
                  <th className="text-right py-3 px-4 text-slate-300">Q1 2024</th>
                  <th className="text-right py-3 px-4 text-slate-300">Q2 2024</th>
                  <th className="text-right py-3 px-4 text-slate-300">Q3 2024</th>
                  <th className="text-right py-3 px-4 text-slate-300">Q4 2024</th>
                  <th className="text-right py-3 px-4 text-slate-300">Total</th>
                </tr>
              </thead>
              <tbody>
                {forecastDetails.map((item) => {
                  const total = item.q1 + item.q2 + item.q3 + item.q4
                  return (
                    <tr key={item.category} className="border-b border-slate-700/50">
                      <td className="py-3 px-4 text-white font-medium">{item.category}</td>
                      <td className="py-3 px-4 text-right text-slate-300">${item.q1.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-slate-300">${item.q2.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-slate-300">${item.q3.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-slate-300">${item.q4.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-blue-400 font-bold">${total.toLocaleString()}</td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-600">
                  <td className="py-3 px-4 text-white font-bold">Total Projected</td>
                  <td className="py-3 px-4 text-right text-white font-bold">
                    ${forecastDetails.reduce((sum, item) => sum + item.q1, 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-white font-bold">
                    ${forecastDetails.reduce((sum, item) => sum + item.q2, 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-white font-bold">
                    ${forecastDetails.reduce((sum, item) => sum + item.q3, 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-white font-bold">
                    ${forecastDetails.reduce((sum, item) => sum + item.q4, 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-green-400 font-bold text-lg">
                    $
                    {forecastDetails
                      .reduce((sum, item) => sum + item.q1 + item.q2 + item.q3 + item.q4, 0)
                      .toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">ROI Analysis by Initiative</CardTitle>
          <CardDescription className="text-slate-400">Return on investment for savings initiatives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roiAnalysis}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="category" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value, name) => [
                    name === "roi" ? `${value}%` : `$${value.toLocaleString()}`,
                    name === "investment" ? "Investment" : name === "savings" ? "Savings" : "ROI",
                  ]}
                />
                <Legend />
                <Bar dataKey="investment" fill="#EF4444" name="Investment" />
                <Bar dataKey="savings" fill="#10B981" name="Savings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Risk-Adjusted Projections</CardTitle>
          <CardDescription className="text-slate-400">
            Conservative, realistic, and optimistic scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskAssessment}>
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
                  formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="optimistic"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                  name="Optimistic"
                />
                <Area
                  type="monotone"
                  dataKey="realistic"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.5}
                  name="Realistic"
                />
                <Area
                  type="monotone"
                  dataKey="conservative"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.7}
                  name="Conservative"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
