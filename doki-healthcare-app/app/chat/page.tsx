"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Send, Bot, User, Languages, Heart, AlertTriangle, Mic, MicOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

const languages = [
  { code: "english", name: "English", flag: "🇬🇧" },
  { code: "swahili", name: "Kiswahili", flag: "🇰🇪" },
  { code: "kikuyu", name: "Kikuyu", flag: "🇰🇪" },
  { code: "luo", name: "Dholuo", flag: "🇰🇪" },
]

const quickQuestions = [
  { en: "What are the symptoms of malaria?", sw: "Dalili za malaria ni zipi?" },
  { en: "How can I prevent typhoid?", sw: "Ninawezaje kuzuia homa ya tumbo?" },
  { en: "When should I see a doctor?", sw: "Ni lini niende kwa daktari?" },
  { en: "What's the difference between flu and COVID-19?", sw: "Tofauti kati ya homa na COVID-19 ni nini?" },
  { en: "How do I treat a minor wound?", sw: "Ninawezaje kutibu jeraha dogo?" },
  { en: "What foods help boost immunity?", sw: "Chakula gani kinasaidia kuongeza kinga mwilini?" },
]

export default function ChatPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("english")
  const [isListening, setIsListening] = useState(false)
  const { toast } = useToast()

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat({
    api: "/api/chat",
    body: {
      language: selectedLanguage,
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    },
  })

  const handleQuickQuestion = (question: { en: string; sw: string }) => {
    const text = selectedLanguage === "swahili" ? question.sw : question.en
    setInput(text)
  }

  const startVoiceInput = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.lang = selectedLanguage === "swahili" ? "sw-KE" : "en-KE"
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
        toast({
          title: "Voice Input Error",
          description: "Could not capture voice input. Please try again.",
          variant: "destructive",
        })
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } else {
      toast({
        title: "Voice Input Not Supported",
        description: "Your browser doesn't support voice input.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Image
                src="/placeholder.svg"
                alt="Chat assistant illustration"
                width={320}
                height={180}
                className="rounded-xl shadow-lg object-cover w-full max-w-md h-auto"
                priority
              />
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">DOKI Health Assistant</h1>
            </div>
            <p className="text-lg text-gray-600 mb-4">
              Ask me anything about health in your preferred language. I'm here to help with health information and
              guidance.
            </p>

            {/* Language Selector */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Languages className="h-4 w-4 text-gray-600" />
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Disclaimer */}
            <Card className="bg-orange-50 border-orange-200 mb-6">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div className="text-left">
                    <h4 className="font-semibold text-orange-800 mb-1">Important Health Disclaimer</h4>
                    <p className="text-sm text-orange-700">
                      I provide general health information only. For medical emergencies or serious health concerns,
                      please consult a qualified healthcare professional or visit the nearest hospital immediately.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Quick Questions Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Quick Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full text-left h-auto p-3 text-sm justify-start"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {selectedLanguage === "swahili" ? question.sw : question.en}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/images/doki-logo.png" alt="DOKI" />
                      <AvatarFallback>
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">DOKI Health Assistant</CardTitle>
                      <p className="text-sm text-gray-600">
                        Online • Responding in {languages.find((l) => l.code === selectedLanguage)?.name}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.length === 0 && (
                      <div className="text-center py-8">
                        <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">
                          {selectedLanguage === "swahili"
                            ? "Karibu! Uliza swali lolote kuhusu afya."
                            : "Welcome! Ask me any health-related question."}
                        </p>
                      </div>
                    )}

                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "assistant" && (
                          <Avatar className="w-8 h-8">
                            <AvatarImage src="/images/doki-logo.png" alt="DOKI" />
                            <AvatarFallback>
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>

                        {message.role === "user" && (
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="/images/doki-logo.png" alt="DOKI" />
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="border-t p-4">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <div className="flex-1 relative">
                      <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder={
                          selectedLanguage === "swahili"
                            ? "Andika swali lako hapa..."
                            : "Type your health question here..."
                        }
                        className="pr-12"
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                        onClick={startVoiceInput}
                        disabled={isLoading || isListening}
                      >
                        {isListening ? (
                          <MicOff className="h-4 w-4 text-red-500" />
                        ) : (
                          <Mic className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                  {isListening && (
                    <p className="text-sm text-blue-600 mt-2 flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      {selectedLanguage === "swahili" ? "Sikiliza..." : "Listening..."}
                    </p>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Health Topics */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Health Topics</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { en: "Malaria Prevention", sw: "Kuzuia Malaria", icon: "🦟" },
                { en: "Child Health", sw: "Afya ya Mtoto", icon: "👶" },
                { en: "Maternal Care", sw: "Huduma za Mama", icon: "🤱" },
                { en: "Mental Health", sw: "Afya ya Akili", icon: "🧠" },
                { en: "Nutrition", sw: "Lishe", icon: "🥗" },
                { en: "Vaccination", sw: "Chanjo", icon: "💉" },
                { en: "First Aid", sw: "Huduma za Kwanza", icon: "🏥" },
                { en: "Hygiene", sw: "Usafi", icon: "🧼" },
              ].map((topic, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{topic.icon}</div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedLanguage === "swahili" ? topic.sw : topic.en}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
