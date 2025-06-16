"use client"

import type React from "react"

import { useState } from "react"
import { Send, Moon, Sun, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTheme } from "next-themes"
import ReactMarkdown from "react-markdown"
import { toast } from "@/hooks/use-toast"


export default function Home() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset states
    setError(null)
    setResponse(null)

    // Basic URL validation
    if (!url) {
      setError("Please enter a YouTube URL")
      return
    }

    if (!url.includes("youtube.com/") && !url.includes("youtu.be/")) {
      setError("Please enter a valid YouTube URL")
      return
    }

    // Simulate processing
    setIsLoading(true)

    try {
      const videoId = extractYouTubeId(url)
      await fetch(`/api/explain?video_id=${videoId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.content)
          setResponse(data.content)
        })
    } catch (err: unknown) {
      setError(typeof err === "string" ? err : "An error occurred while processing your request")
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to extract YouTube video ID
  const extractYouTubeId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : "unknown"
  }
  
    const handleCopy = () => {
    if (response) {
      navigator.clipboard.writeText(response)
      toast({
        title: "Copied!",
        description: "Response copied to clipboard.",
      })
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background transition-colors">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="h-9 w-9"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">Explainium</h1>
          <p className="text-muted-foreground">Enter a YouTube URL to get an explanation of the content</p>
        </div>

        {/* Input Form */}
        <Card>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                placeholder="Paste YouTube URL here (e.g., https://www.youtube.com/watch?v=...)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  </div>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Response Section */}
        {isLoading && (
          <Card className="border">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
                <p className="mt-4 text-muted-foreground">Extracting details...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {response && !isLoading && (
          <Card className="border pt-2">
            <CardContent className="pt-4">
              <div className="prose prose-h2:mt-2 dark:prose-invert max-w-none">
                <div className="flex justify-end mb-2">
                </div>
                <div className="bg-muted p-4 rounded-md text-foreground">
                  <ReactMarkdown >{response}</ReactMarkdown>
                </div>
              </div>
            </CardContent>
            <div className="flex justify-end p-4 pt-0">
              <Button onClick={handleCopy} variant="outline" className="gap-2">
                <Copy className="h-4 w-4" />
                Copy Response
              </Button>
            </div>
          </Card>
        )}

        {!response && !isLoading && !error && (
          <Card className="border border-dashed border-muted bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                <p>Enter a YouTube URL above and click Send to get started</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
