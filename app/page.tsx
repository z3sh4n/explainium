"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Send, Moon, Sun, Copy, Info } from "lucide-react"
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
  const [showTooltip, setShowTooltip] = useState(false)
  const [response, setResponse] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const loadingTexts = [
    "Extracting details...",
    "Processing information...",
    "Analyzing content...",
    "Almost ready...",
    "Finalizing results..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) =>
        (prevIndex + 1) % loadingTexts.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [loadingTexts.length]);

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
      // const videoId = extractYouTubeId(url)
      await new Promise((resolve) => setTimeout(resolve, 20000))
    } catch (err: unknown) {
      setError(typeof err === "string" ? err : "An error occurred while processing your request")
    } finally {
      setResponse(`## Agent Orchestration: A Data Engineer's Quiz

1.  The video positions data engineers as uniquely qualified for agent orchestration. What are *three* specific skills or areas of expertise that data engineers possess that directly translate to success in agent orchestration, according to the video?
2.  According to the video, many impressive AI demos fail to scale effectively. What is a *key reason* why, and what *two specific challenges* contribute to this issue?
3.  The video draws parallels between existing data engineering tools and AI agent orchestration frameworks. Briefly describe what each of these tools essentially *replicates* from a data engineering perspective: Langraph, Crew AI, and Autogen.
4.  The speaker suggests that AI engineering might just be data engineering with "smarter pieces." Explain this statement in your own words. What is the *core skill* the speaker believes is more important than just writing effective prompts in the context of AI engineering?
5.  What *specific actions* does the video encourage data engineers to take to prepare for the next evolution of data engineering and excel in the world of agent orchestration? Name at least *two*.`)
      setIsLoading(false)
    }
  }

  // Helper function to extract YouTube video ID
  // const extractYouTubeId = (url: string): string => {
  //   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  //   const match = url.match(regExp)
  //   return match && match[2].length === 11 ? match[2] : "unknown"
  // }

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
          <p className="text-muted-foreground">Enter a YouTube URL to get questions about the video!</p>
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
                <p
                  key={currentTextIndex}
                  className="mt-4 text-muted-foreground animate-pulse transition-opacity ease-in-out"
                >
                  {loadingTexts[currentTextIndex]}
                </p>
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
      <div className="fixed bottom-4 left-4 z-50 group">
        <div className="bg-accent text-accent-foreground rounded-full p-2 shadow-lg cursor-pointer" onClick={() => setShowTooltip(!showTooltip)}>
          <Info className="h-5 w-5" />
        </div>

        {/* Tooltip Content */}
        <div className={`prose dark:prose-invert absolute bottom-full left-0 mb-3 ${showTooltip ? '' : 'hidden'} group-hover:block w-80 bg-background border rounded-lg shadow-lg p-4`}>
          <h3 className="font-bold text-lg mb-2">What Is This Tool?</h3>
          <p className="mb-3">Turn YouTube videos into lasting knowledge.</p>
          <p className="mb-3">Watch a video, forget it later? This tool fixes that.</p>

          <h4 className="font-bold mb-2">How It Works</h4>
          <ol className="list-decimal pl-5 space-y-1 mb-3">
            <li>Paste any YouTube URL</li>
            <li>AI analyzes the video content</li>
            <li>Get smart questions that test your understanding</li>
            <li>Answer to truly remember what you learned</li>
          </ol>
          <p>Move from passive watching to active learning.</p>
          <p>Open source on <a href="https://github.com/z3sh4n/explainium/" target="_blank">Github</a> by <a href="https://x.com/zeesshhh_" target="_blank">@zeesshhh_</a>
          </p>
        </div>
      </div>
    </main>
  )
}
