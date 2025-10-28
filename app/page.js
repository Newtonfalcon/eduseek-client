"use client"
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {v4 as uuidv4} from "uuid"
import ReactMarkdown from "react-markdown";

export default function EduSeekAgent({  apiPath = "https://eduseek-server.vercel.app/" }) {
  const [prompt, setPrompt] = useState("");
  const [threadId, setThreadId] = useState(uuidv4());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendPrompt = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMsg = { role: "user", text: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt("");
    setLoading(true);
    setError(null);

    try {
      if(threadId == null || threadId == ""){
        const id = uuidv4()
        setThreadId(id)
      }
      const payload = { prompt: userMsg.text, threadid: threadId };
      const res = await axios.post(apiPath, payload, { headers: { "Content-Type": "application/json" } });

      const data = res.data || {};
      const assistantMsg = {
        role: "assistant",
        text: data || "No response received.",
      };
      if (data.threadId) setThreadId(data.threadId);

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setError(err.message || "Error connecting to server.");
      setMessages((prev) => [...prev, { role: "assistant", text: err.message }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white text-black">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-xl font-semibold">🎓 EduSeek AI</h1>
          <p className="text-xs text-slate-600">Your Scholarship Finder Assistant</p>
        </div>
        <button
          onClick={clearChat}
          className="text-sm px-3 py-1 rounded-lg border border-slate-300 hover:bg-slate-100 transition"
        >Clear</button>
      </div>

      {/* Chat Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 text-sm">
            <span className="text-4xl mb-2">💬</span>
            Ask me about scholarships, universities, or study grants!
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`flex  ${m.role === 'user' ? 'justify-end' : 'justify-start'} w-[100%]`}>
              <div
                className={`px-4 py-3 rounded-2xl w-max-[90%] overflow-x-hidden  text-sm wrap-break-word whitespace-pre-wrap  ${
                  m.role === 'user'
                    ? 'bg-slate-200 text-black rounded-br-none'
                    : 'bg-slate-100 text-black rounded-bl-none'
                }`}
              >

                <ReactMarkdown>{m.text}</ReactMarkdown>
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

   
      <form
        onSubmit={sendPrompt}
        className="w-full bg-white border-t px-4 py-3 flex items-center gap-2 sticky bottom-0"
      >
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 px-4 py-3 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 text-black"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 disabled:opacity-60 transition flex-shrink-0"
        >
          {loading ? "..." : "Send"}
        </button>
      </form>

   
      <div className="text-xs text-center text-slate-500 py-2 bg-white border-t">
        powered by Netech, creating solutions
      </div>
    </div>
  );
}