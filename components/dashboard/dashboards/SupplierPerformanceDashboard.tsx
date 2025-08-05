"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Star, MapPin } from "lucide-react"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  AreaChart,
  Area,
} from "recharts"

const supplierPerformanceData = [
  { supplier: "Supplier A", volume: 15000, value: 450000, rating: 4.8, region: "North America" },
  { supplier: "Supplier B", volume: 12000, value: 380000, rating: 4.6, region: "Europe" },
  { supplier: "Supplier C", volume: 18000, value: 520000, rating: 4.9, region: "Asia" },
  { supplier: "Supplier D", volume: 8000, value: 240000, rating: 4.2, region: "North America" },
  { supplier: "Supplier E", volume: 22000, value: 660000, rating: 4.7, region: "Asia" },
]

const regionalData = [
  { region: "North America", suppliers: 12, volume: 45, value: 1350 },
  { region: "Europe", suppliers: 8, volume: 32, value: 960 },
  { region: "Asia", suppliers: 15, volume: 68, value: 2040 },
  { region: "South America", suppliers: 5, volume: 15, value: 450 },
]

const performanceMatrix = [
  { supplier: "Supplier A", quality: 95, delivery: 88, cost: 92, overall: 91.7 },
  { supplier: "Supplier B", quality: 89, delivery: 94, cost: 87, overall: 90.0 },
  { supplier: "Supplier C", quality: 97, delivery: 91, cost: 89, overall: 92.3 },
  { supplier: "Supplier D", quality: 82, delivery: 85, cost: 94, overall: 87.0 },
  { supplier: "Supplier E", quality: 91, delivery: 89, cost: 88, overall: 89.3 },
]

const deliveryTrends = [
  { month: "Jan", onTime: 85, delayed: 15, cancelled: 2 },
  { month: "Feb", onTime: 88, delayed: 12, cancelled: 1 },
  { month: "Mar", onTime: 91, delayed: 9, cancelled: 1 },
  { month: "Apr", onTime: 87, delayed: 13, cancelled: 2 },
  { month: "May", onTime: 93, delayed: 7, cancelled: 1 },
  { month: "Jun", onTime: 89, delayed: 11, cancelled: 2 },
]

const volumeValueData = supplierPerformanceData.map((supplier) => ({
  x: supplier.volume,
  y: supplier.value,
  name: supplier.supplier,
  rating: supplier.rating,
}))

export function SupplierPerformanceDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Supplier Performance Dashboard</h1>
          <p className="text-slate-400 mt-2">Comprehensive supplier analysis and regional comparison</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Total Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">40</div>
            <p className="text-xs text-slate-400 mt-1">Active suppliers</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Total Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">160K</div>
            <p className="text-xs text-slate-400 mt-1">Units purchased</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$4.8M</div>
            <p className="text-xs text-slate-400 mt-1">Total procurement</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Avg. Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white flex items-center">
              4.5
              <Star className="h-5 w-5 text-yellow-400 ml-1 fill-current" />
            </div>
            <p className="text-xs text-slate-400 mt-1">Supplier rating</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Volume vs Value Analysis</CardTitle>
            <CardDescription className="text-slate-400">Supplier performance scatter plot</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={volumeValueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="x" stroke="#9CA3AF" name="Volume" />
                  <YAxis dataKey="y" stroke="#9CA3AF" name="Value" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    formatter={(value, name) => [
                      name === "x" ? `${value.toLocaleString()} units` : `$${value.toLocaleString()}`,
                      name === "x" ? "Volume" : "Value",
                    ]}
                  />
                  <Scatter dataKey="y" fill="#3B82F6" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Regional Analysis</CardTitle>
            <CardDescription className="text-slate-400">Procurement by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="region" stroke="#9CA3AF" />
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
                  <Bar dataKey="suppliers" fill="#3B82F6" name="Suppliers" />
                  <Bar dataKey="volume" fill="#10B981" name="Volume (K)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Top Supplier Performance</CardTitle>
          <CardDescription className="text-slate-400">Detailed supplier comparison table</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-300">Supplier</th>
                  <th className="text-left py-3 px-4 text-slate-300">Region</th>
                  <th className="text-right py-3 px-4 text-slate-300">Volume</th>
                  <th className="text-right py-3 px-4 text-slate-300">Value</th>
                  <th className="text-center py-3 px-4 text-slate-300">Rating</th>
                  <th className="text-center py-3 px-4 text-slate-300">Performance</th>
                </tr>
              </thead>
              <tbody>
                {supplierPerformanceData.map((supplier, index) => (
                  <tr key={supplier.supplier} className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-white font-medium">{supplier.supplier}</td>
                    <td className="py-3 px-4 text-slate-300 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                      {supplier.region}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-300">{supplier.volume.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-slate-300">${supplier.value.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-white">{supplier.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge
                        variant={
                          supplier.rating >= 4.7 ? "default" : supplier.rating >= 4.3 ? "secondary" : "destructive"
                        }
                      >
                        {supplier.rating >= 4.7 ? "Excellent" : supplier.rating >= 4.3 ? "Good" : "Needs Improvement"}
                      </Badge>
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
          <CardTitle className="text-white">Supplier Performance Matrix</CardTitle>
          <CardDescription className="text-slate-400">Quality, delivery, and cost performance scores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceMatrix}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="supplier" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value) => [`${value}%`, ""]}
                />
                <Legend />
                <Bar dataKey="quality" fill="#10B981" name="Quality Score" />
                <Bar dataKey="delivery" fill="#3B82F6" name="Delivery Score" />
                <Bar dataKey="cost" fill="#F59E0B" name="Cost Score" />
                <Bar dataKey="overall" fill="#8B5CF6" name="Overall Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Delivery Performance Trends</CardTitle>
          <CardDescription className="text-slate-400">Monthly delivery performance tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={deliveryTrends}>
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
                  formatter={(value) => [`${value}%`, ""]}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="onTime"
                  stackId="1"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.8}
                  name="On Time %"
                />
                <Area
                  type="monotone"
                  dataKey="delayed"
                  stackId="1"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.8}
                  name="Delayed %"
                />
                <Area
                  type="monotone"
                  dataKey="cancelled"
                  stackId="1"
                  stroke="#EF4444"
                  fill="#EF4444"
                  fillOpacity={0.8}
                  name="Cancelled %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
