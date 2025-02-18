import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Wallet,
  TrendingUp,
  Target,
  Moon,
  Sun,
  MessageCircle,
  X,
  Mic,
  Send,
} from "lucide-react";
import Card from "../Card";

const genAI = new GoogleGenerativeAI("AIzaSyC7958lvH9cC0y4E2qUV26o-0eBmDB1L70");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const Dashboard = () => {
  const id = useSelector((state) => state.id.value);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chartData, setChartData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.random() * 100;
      setChartData((prevData) => [
        ...prevData.slice(-9),
        { time: new Date().toLocaleTimeString(), value: newValue },
      ]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: "user" };
      setMessages([...messages, userMessage]);
      setInput("");

      try {
        const result = await model.generateContent(input);
        let aiMessageText = result.response.text().replaceAll("*", "");

        // Check for investment-related keywords
        const investmentKeywords = ["investment", "invest", "portfolio", "stocks", "bonds"];
        const isInvestmentRelated = investmentKeywords.some((keyword) =>
          input.toLowerCase().includes(keyword)
        );

        if (isInvestmentRelated) {
          let tempo = aiMessageText;
          aiMessageText = "Act like a chat bot on a financial app. suggest user to check investment page of our website. dont suggest any other company. give user a final answer instead of saying i cant help you with that. when ever asek who are you than answer that you are a financial chat bot and you are here to help user with their financial queries. answer acoording to previous commands for the query:";
          aiMessageText += tempo;
        }

        const aiMessage = {
          text: aiMessageText,
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        const fallbackMessage = {
          text: "I'm sorry, I couldn't process your request. Please try again.",
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, fallbackMessage]);
      }
    }
  };

  const startListening = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const speech = new recognition();
    speech.lang = "en-US";
    speech.start();
    setListening(true);

    speech.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    speech.onend = () => {
      setListening(false);
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
        } min-h-screen transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-4xl font-bold text-[#04AD83]"
          >
            Dashboard
          </motion.h1>
          <button onClick={toggleDarkMode} className="p-3 rounded-full bg-white shadow-lg dark:bg-gray-800">
            {darkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-600" />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/savings">
            <Card darkMode = {darkMode} title="Total Savings" description="Your current savings balance" icon={Wallet} value="₹85,400" trend={12.5} />
          </Link>
          <Link to="/investment">
            <Card darkMode = {darkMode} title="Investments" description="Current investment portfolio value" icon={TrendingUp} value="₹1,24,500" trend={-2.3} />
          </Link>
        </div>

        <motion.div className={darkMode?"bg-black text-white rounded-2xl shadow-lg p-6 mb-8":"bg-white text-black rounded-2xl shadow-lg p-6 mb-8"}>
          <h2 className="text-2xl font-semibold mb-6">Real-Time Financial Insights: Live Graph Updates</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#04AD83" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Chat Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-5 right-5 p-4 rounded-full shadow-lg bg-[#04AD83] text-white"
        >
          {isChatOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </motion.button>

        {/* Chatbot Popup */}
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-20 right-5 w-96 h-[500px] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden"
          >
            <div className="bg-[#04AD83] text-white p-4 font-semibold">
              Financial Assistant
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-[80%] ${message.sender === "user"
                      ? "bg-[#04AD83] text-white ml-auto"
                      : "bg-gray-100 text-gray-800"
                    }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-[#04AD83]"
                  placeholder="Ask anything..."
                />
                <button
                  onClick={startListening}
                  className={`p-2 rounded-full ${listening ? "bg-red-500" : "bg-gray-200"
                    }`}
                >
                  <Mic className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="p-2 rounded-full bg-[#04AD83] text-white"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
