import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  RotateCcw, 
  Globe2, 
  ShieldCheck,
  MessageSquare,
  HelpCircle,
  FlaskConical,
  TrendingUp,
  Bug
} from 'lucide-react'

export default function AiChatPage() {
  const [farmerName, setFarmerName] = useState('Yaswanth')
  const [messages, setMessages] = useState<any[]>([
    {
      role: 'assistant',
      content: 'Namaskaram Yaswanth! I am AgriAI, your personal agricultural intelligence assistant. I have loaded your 3-acre Groundnut farm profile in Anantapur (Red Sandy Loam, pH 6.5).\n\nHow can I help your farming decisions today?',
      time: 'Just now'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState<'en' | 'te'>('en')

  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function handleSend(textToSend?: string) {
    const text = textToSend || input
    if (!text.trim() || loading) return

    const userMsg = {
      role: 'user',
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language })
      })
      const data = await res.json()
      if (data.ok) {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: data.response,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ])
      }
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an issue retrieving the agricultural data. Please try again.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const promptChips = [
    { label: '🌱 Best crop for my soil?', query: 'What crop is best for my 3-acre red soil in Anantapur?' },
    { label: '🧪 Fertilizer dosage?', query: 'How much DAP and Urea fertilizer do I need for 3 acres Groundnut?' },
    { label: '📈 Groundnut price today?', query: 'What is today groundnut mandi price in Anantapur?' },
    { label: '🦠 Yellow leaf spots cure?', query: 'Why are my groundnut leaves turning yellow with brown spots?' },
    { label: '⛈️ Is heavy rain coming?', query: 'Is heavy rain expected in Anantapur tomorrow?' }
  ]

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-glow-green">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-black text-xl text-white flex items-center gap-2">
                AgriAI Decision Assistant
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Profile Injected
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Context: {farmerName} • 3.0 Acres Groundnut • Anantapur (AP)
              </p>
            </div>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(l => l === 'en' ? 'te' : 'en')}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-300 flex items-center gap-1.5"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'English' : 'తెలుగు (Telugu)'}</span>
            </button>
            <button
              onClick={() => setMessages([messages[0]])}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              title="Reset Chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Terminal Box */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl flex flex-col h-[520px]">
          
          {/* Scrollable Conversation Stream */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((msg, idx) => {
              const isAi = msg.role === 'assistant'
              return (
                <div
                  key={idx}
                  className={`flex gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed ${
                      isAi
                        ? 'bg-slate-950 border border-slate-800 text-slate-100'
                        : 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="font-bold uppercase tracking-wider">
                        {isAi ? 'AgriAI Advisor' : `Farmer ${farmerName}`}
                      </span>
                      <span>{msg.time}</span>
                    </div>
                    <p className="whitespace-pre-line">{msg.content}</p>
                  </div>

                  {!isAi && (
                    <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 border border-slate-700">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              )
            })}

            {loading && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                  <span>AgriAI is analyzing soil chemistry and mandi pricing...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Prompt Chips */}
          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-slate-500 shrink-0 font-medium">Quick Prompts:</span>
            {promptChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip.query)}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 text-slate-300 shrink-0 transition-colors"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="mt-3 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask AgriAI about crops, fertilizer dosage, prices, or diseases..."
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold focus:border-emerald-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-glow-green disabled:opacity-50 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </Layout>
  )
}
