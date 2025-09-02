import React, { useState, useRef, useEffect } from "react";
import { Send, MessageSquare, Sparkles } from "lucide-react"; // Assuming lucide-react is installed

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const BotQuery: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm BotQuery, your intelligent assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/chatbot/chat/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: userMessage.text }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response.output, // Assuming the backend still sends output in data.response.output
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Error: ${error.message || "An unexpected error occurred."}`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white font-sans antialiased">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-800 to-indigo-800 p-4 shadow-lg z-10">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">BotQuery</h1>
              <p className="text-sm text-purple-200">Your AI Assistant</p>
            </div>
          </div>
          <MessageSquare className="w-6 h-6 text-purple-300" />
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 max-w-2xl mx-auto w-full scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-purple-900">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] px-4 py-3 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform ${
                message.isUser
                  ? "bg-purple-600 text-white ml-4 animate-slide-in-right"
                  : "bg-gray-800 text-gray-100 mr-4 animate-slide-in-left"
              }`}
            >
              {!message.isUser && (
                <div className="flex items-center space-x-2 mb-1">
                  <Sparkles className="w-4 h-4 text-purple-300" />
                  <span className="text-xs text-gray-300">BotQuery</span>
                </div>
              )}
              {message.text.split("\n").map((line, lineIndex) => (
                <p key={lineIndex} className="text-sm leading-relaxed">
                  {line}
                </p>
              ))}
              <p
                className={`text-xs mt-2 ${
                  message.isUser ? "text-purple-100" : "text-gray-400"
                }`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-xs px-4 py-3 rounded-2xl shadow-lg bg-gray-800">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                </div>
                <span className="text-xs text-gray-400">
                  BotQuery is typing...
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="bg-gradient-to-r from-purple-800 to-indigo-800 p-4 border-t border-purple-500/30 shadow-2xl z-10">
        <div className="flex items-end space-x-3 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask BotQuery anything..."
              className="w-full p-3 pr-10 bg-gray-700 text-white placeholder-gray-400 rounded-xl border border-gray-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 focus:outline-none resize-none transition-all duration-200 max-h-40 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-700"
              rows={1}
              style={{ minHeight: "48px" }}
              disabled={isLoading}
            />
            <div className="absolute right-3 bottom-3 text-xs text-gray-500">
              {inputText.length}/500
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-3">
          BotQuery is powered by Gemini and designed to help you.
        </p>
      </footer>
    </div>
  );
};

export default BotQuery;
