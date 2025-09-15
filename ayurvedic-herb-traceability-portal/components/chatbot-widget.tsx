"use client";

import React, { useState, useEffect, useRef } from "react";
import { Bot, User, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatWithHerbBot } from "../app/services/herbApi";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);

    try {
      const botReply = await chatWithHerbBot(null, inputMessage);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botReply,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Bot Icon Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white border rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="bg-green-600 text-white p-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">Herb AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5 text-white hover:text-gray-200" />
            </button>
          </div>

          {/* Chat Body */}
          <div
            ref={chatContainerRef}
            className="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 break-words whitespace-pre-wrap ${
                    message.sender === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === "bot" && (
                      <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    )}
                    {message.sender === "user" && (
                      <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                        {message.text}
                      </p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-center text-sm text-gray-500">
                Thinking...
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t flex items-center gap-2">
            <Input
              placeholder="Ask about an herb..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} disabled={loading}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
