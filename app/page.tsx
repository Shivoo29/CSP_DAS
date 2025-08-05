"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, FileSpreadsheet, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

type UploadState = "idle" | "uploading" | "cleaning" | "completed" | "error"

export default function HomePage() {
  const [uploadState, setUploadState] = useState<UploadState>("idle")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [fileName, setFileName] = useState("")
  const [fileDetails, setFileDetails] = useState<{
    size: string
    records: number
    cleanedRecords: number
  } | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleFileUpload = async (file: File) => {
    if (!file) return

    setFileName(file.name)
    setUploadState("uploading")
    setUploadProgress(0)

    // Simulate file upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          setUploadState("cleaning")
          startDataCleaning()
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const startDataCleaning = async () => {
    try {
      // Simulate data cleaning process
      await new Promise((resolve) => setTimeout(resolve, 3000))

      setFileDetails({
        size: "2.4 MB",
        records: 15420,
        cleanedRecords: 14890,
      })

      setUploadState("completed")
      toast({
        title: "Data Cleaning Completed",
        description: "Your data has been successfully processed and is ready for analysis.",
      })
    } catch (error) {
      setUploadState("error")
      toast({
        title: "Error",
        description: "Failed to process the uploaded file. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    const file = files[0]
    if (
      file &&
      (file.type.includes("excel") ||
        file.type.includes("csv") ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".csv"))
    ) {
      handleFileUpload(file)
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please upload an Excel (.xlsx) or CSV file.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Supply Chain Analytics</h1>
          <p className="text-slate-400 text-lg">Upload your supply chain data to begin analysis</p>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileSpreadsheet className="h-6 w-6 text-blue-400" />
              Data Upload & Processing
            </CardTitle>
            <CardDescription className="text-slate-400">
              Upload Excel or CSV files for automated data cleaning and analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {uploadState === "idle" && (
              <div
                className="border-2 border-dashed border-slate-600 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-lg text-slate-300 mb-2">Drag and drop your file here</p>
                <p className="text-slate-500 mb-4">or click to browse</p>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
                  Choose File
                </Button>
                <input
                  id="file-input"
                  type="file"
                  accept=".xlsx,.csv"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file)
                  }}
                />
              </div>
            )}

            {(uploadState === "uploading" || uploadState === "cleaning") && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-8 w-8 text-blue-400" />
                  <div className="flex-1">
                    <p className="text-white font-medium">{fileName}</p>
                    <p className="text-slate-400 text-sm">
                      {uploadState === "uploading" ? "Uploading..." : "Data Cleaning in Progress..."}
                    </p>
                  </div>
                  <Loader2 className="h-6 w-6 text-blue-400 animate-spin" />
                </div>

                {uploadState === "uploading" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Upload Progress</span>
                      <span className="text-slate-300">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="bg-slate-700" />
                  </div>
                )}

                {uploadState === "cleaning" && (
                  <div className="bg-slate-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />
                      <span className="text-white font-medium">Processing Data</span>
                    </div>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>✓ Removing duplicate entries</li>
                      <li>✓ Standardizing date formats</li>
                      <li>✓ Cleaning price data</li>
                      <li>✓ Validating supplier codes</li>
                      <li>⏳ Checking mandatory fields</li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {uploadState === "completed" && fileDetails && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                  <div className="flex-1">
                    <p className="text-white font-medium">{fileName}</p>
                    <p className="text-green-400 text-sm">Data cleaning completed successfully</p>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-3">Processing Summary</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-400">{fileDetails.records.toLocaleString()}</p>
                      <p className="text-slate-400 text-sm">Total Records</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-400">{fileDetails.cleanedRecords.toLocaleString()}</p>
                      <p className="text-slate-400 text-sm">Cleaned Records</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-400">
                        {(fileDetails.records - fileDetails.cleanedRecords).toLocaleString()}
                      </p>
                      <p className="text-slate-400 text-sm">Removed Records</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => router.push("/dashboard")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  View Reports Dashboard
                </Button>
              </div>
            )}

            {uploadState === "error" && (
              <div className="text-center py-8">
                <div className="text-red-400 mb-4">
                  <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <p className="text-white font-medium mb-2">Upload Failed</p>
                <p className="text-slate-400 mb-4">There was an error processing your file</p>
                <Button
                  onClick={() => setUploadState("idle")}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
