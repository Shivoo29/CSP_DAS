"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Calendar, Clock, AlertTriangle } from "lucide-react"
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
} from "recharts"

const timelineData = [
  { month: "Jan", posted: 45, delayed: 8, onTime: 37, avgDelay: 2.3 },
  { month: "Feb", posted: 52, delayed: 12, onTime: 40, avgDelay: 3.1 },
  { month: "Mar", posted: 48, delayed: 6, onTime: 42, avgDelay: 1.8 },
  { month: "Apr", posted: 61, delayed: 15, onTime: 46, avgDelay: 4.2 },
  { month: "May", posted: 55, delayed: 9, onTime: 46, avgDelay: 2.7 },
  { month: "Jun", posted: 58, delayed: 11, onTime: 47, avgDelay: 3.0 },
]

const delayAnalysis = [
  { reason: "Documentation Issues", count: 25, percentage: 41.7 },
  { reason: "Approval Delays", count: 18, percentage: 30.0 },
  { reason: "System Errors", count: 10, percentage: 16.7 },
  { reason: "Supplier Response", count: 7, percentage: 11.7 },
]

const recentPostings = [
  {
    id: "IP-2024-001",
    partNumber: "PN-3456-789",
    supplier: "Supplier A",
    postDate: "2024-01-15",
    status: "On Time",
    delay: 0,
  },
  {
    id: "IP-2024-002",
    partNumber: "PN-1234-567",
    supplier: "Supplier B",
    postDate: "2024-01-14",
    status: "Delayed",
    delay: 3,
  },
  {
    id: "IP-2024-003",
    partNumber: "PN-7890-123",
    supplier: "Supplier C",
    postDate: "2024-01-13",
    status: "On Time",
    delay: 0,
  },
  {
    id: "IP-2024-004",
    partNumber: "PN-4567-890",
    supplier: "Supplier D",
    postDate: "2024-01-12",
    status: "Delayed",
    delay: 5,
  },
  {
    id: "IP-2024-005",
    partNumber: "PN-2345-678",
    supplier: "Supplier E",
    postDate: "2024-01-11",
    status: "On Time",
    delay: 0,
  },
]

const weeklyPostings = [
  { week: "Week 1", planned: 45, actual: 42, efficiency: 93.3 },
  { week: "Week 2", planned: 38, actual: 40, efficiency: 105.3 },
  { week: "Week 3", planned: 52, actual: 48, efficiency: 92.3 },
  { week: "Week 4", planned: 41, actual: 39, efficiency: 95.1 },
]

const postingsByDepartment = [
  { department: "Procurement", posted: 85, delayed: 12, avgDelay: 2.1 },
  { department: "Manufacturing", posted: 92, delayed: 8, avgDelay: 1.8 },
  { department: "Quality", posted: 67, delayed: 15, avgDelay: 3.2 },
  { department: "Logistics", posted: 75, delayed: 18, avgDelay: 2.9 },
]

export function IPPostingTimelineDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">IP Posting Timeline Dashboard</h1>
          <p className="text-slate-400 mt-2">Track IP posting schedules and analyze delays</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Total IP Postings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">319</div>
            <p className="text-xs text-slate-400 mt-1">This year</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">On-Time Postings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">258</div>
            <p className="text-xs text-slate-400 mt-1">80.9% success rate</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Delayed Postings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">61</div>
            <p className="text-xs text-slate-400 mt-1">19.1% of total</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Avg. Delay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">2.9</div>
            <p className="text-xs text-slate-400 mt-1">Days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Monthly IP Posting Trends</CardTitle>
            <CardDescription className="text-slate-400">Track posting volume and delays over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
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
                  <Line type="monotone" dataKey="posted" stroke="#3B82F6" strokeWidth={2} name="Total Posted" />
                  <Line type="monotone" dataKey="onTime" stroke="#10B981" strokeWidth={2} name="On Time" />
                  <Line type="monotone" dataKey="delayed" stroke="#EF4444" strokeWidth={2} name="Delayed" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Delay Root Cause Analysis</CardTitle>
            <CardDescription className="text-slate-400">Common reasons for IP posting delays</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={delayAnalysis} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9CA3AF" />
                  <YAxis dataKey="reason" type="category" stroke="#9CA3AF" width={120} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="count" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent IP Postings</CardTitle>
          <CardDescription className="text-slate-400">Latest IP posting activities and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-300">IP ID</th>
                  <th className="text-left py-3 px-4 text-slate-300">Part Number</th>
                  <th className="text-left py-3 px-4 text-slate-300">Supplier</th>
                  <th className="text-left py-3 px-4 text-slate-300">Post Date</th>
                  <th className="text-center py-3 px-4 text-slate-300">Status</th>
                  <th className="text-center py-3 px-4 text-slate-300">Delay (Days)</th>
                </tr>
              </thead>
              <tbody>
                {recentPostings.map((posting) => (
                  <tr key={posting.id} className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-white font-medium">{posting.id}</td>
                    <td className="py-3 px-4 text-slate-300">{posting.partNumber}</td>
                    <td className="py-3 px-4 text-slate-300">{posting.supplier}</td>
                    <td className="py-3 px-4 text-slate-300 flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-slate-400" />
                      {posting.postDate}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={posting.status === "On Time" ? "default" : "destructive"}>
                        {posting.status === "On Time" ? (
                          <Clock className="h-3 w-3 mr-1" />
                        ) : (
                          <AlertTriangle className="h-3 w-3 mr-1" />
                        )}
                        {posting.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-300">
                      {posting.delay > 0 ? (
                        <span className="text-red-400 font-medium">{posting.delay}</span>
                      ) : (
                        <span className="text-green-400">0</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Weekly Posting Efficiency</CardTitle>
          <CardDescription className="text-slate-400">Planned vs actual postings by week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyPostings}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9CA3AF" />
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
                <Bar dataKey="planned" fill="#3B82F6" name="Planned" />
                <Bar dataKey="actual" fill="#10B981" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Department-wise IP Posting Performance</CardTitle>
          <CardDescription className="text-slate-400">Posting performance by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={postingsByDepartment} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis dataKey="department" type="category" stroke="#9CA3AF" width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Bar dataKey="posted" fill="#10B981" name="Posted" />
                <Bar dataKey="delayed" fill="#EF4444" name="Delayed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
