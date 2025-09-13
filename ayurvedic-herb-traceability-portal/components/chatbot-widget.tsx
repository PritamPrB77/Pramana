"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

// Dummy AI responses for Ayurvedic herb queries
const getDummyResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase()

  if (message.includes("ashwagandha")) {
    return "Ashwagandha (Withania somnifera) is an adaptogenic herb known for stress relief and energy enhancement. It's commonly used in powder or capsule form. The optimal dosage is typically 300-600mg daily."
  }

  if (message.includes("turmeric") || message.includes("haldi")) {
    return "Turmeric contains curcumin, a powerful anti-inflammatory compound. For best absorption, consume with black pepper and healthy fats. Typical dosage is 500-1000mg of curcumin daily."
  }

  if (message.includes("triphala")) {
    return "Triphala is a combination of three fruits: Amalaki, Bibhitaki, and Haritaki. It's excellent for digestive health and detoxification. Take 1-2 grams before bedtime with warm water."
  }

  if (message.includes("brahmi")) {
    return "Brahmi (Bacopa monnieri) is renowned for cognitive enhancement and memory support. It may take 8-12 weeks to see full benefits. Typical dosage is 300-600mg daily with meals."
  }

  if (message.includes("neem")) {
    return "Neem has powerful antibacterial and antifungal properties. It's used for skin health and immune support. Can be taken as capsules (500mg daily) or applied topically as oil."
  }

  if (message.includes("quality") || message.includes("purity")) {
    return "Our herbs undergo rigorous quality testing including heavy metal analysis, microbial testing, and potency verification. All products are third-party lab tested and certified."
  }

  if (message.includes("dosage") || message.includes("how much")) {
    return "Dosages vary by herb and individual needs. Always start with the lowest recommended dose and consult with an Ayurvedic practitioner. Most herbs are best taken with meals to improve absorption."
  }

  if (message.includes("side effects") || message.includes("safe")) {
    return "While Ayurvedic herbs are generally safe, some may interact with medications or cause allergic reactions. Pregnant/nursing women and those with medical conditions should consult healthcare providers before use."
  }

  if (message.includes("storage") || message.includes("store")) {
    return "Store herbs in a cool, dry place away from direct sunlight. Keep containers tightly sealed. Most powdered herbs last 2-3 years, while whole herbs can last longer when stored properly."
  }

  if (message.includes("organic") || message.includes("certification")) {
    return "Our herbs are sourced from certified organic farms and undergo strict quality control. We maintain AYUSH, FSSAI, and GMP certifications to ensure the highest standards."
  }

  // Default responses
  const defaultResponses = [
    "I'm here to help with questions about Ayurvedic herbs, their benefits, dosages, and quality standards. What would you like to know?",
    "Feel free to ask about specific herbs like Ashwagandha, Turmeric, Triphala, or general Ayurvedic practices. I'm here to assist!",
    "I can provide information about herb quality, storage, dosages, and traditional uses. How can I help you today?",
  ]

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Ayurvedic herb assistant. I can help you with information about herbs, their benefits, dosages, and quality standards. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getDummyResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5" />
              Ayurvedic Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.sender === "bot" && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                      {message.sender === "user" && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about herbs, dosages, quality..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button onClick={sendMessage} disabled={!inputMessage.trim() || isTyping} size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-muted text-xs"
                  onClick={() => setInputMessage("Tell me about Ashwagandha benefits")}
                >
                  Ashwagandha
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-muted text-xs"
                  onClick={() => setInputMessage("What is the quality testing process?")}
                >
                  Quality
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-muted text-xs"
                  onClick={() => setInputMessage("How should I store herbs?")}
                >
                  Storage
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
