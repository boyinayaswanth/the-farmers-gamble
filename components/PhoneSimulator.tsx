import React, { useState, useEffect, useRef } from 'react'
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Radio, 
  User, 
  Sparkles, 
  RotateCcw,
  Volume1,
  MessageSquare,
  Activity,
  Globe2,
  PhoneCall,
  CloudLightning,
  TrendingUp,
  FlaskConical,
  ShoppingBag
} from 'lucide-react'

export default function PhoneSimulator() {
  const [callState, setCallState] = useState<'IDLE' | 'DIALING' | 'CONNECTED'>('IDLE')
  const [callerMobile, setCallerMobile] = useState('+91 8555864859')
  const [callerName, setCallerName] = useState('Yaswanth (Groundnut Farmer, Anantapur)')
  const [duration, setDuration] = useState(0)
  const [transcript, setTranscript] = useState<{ role: 'AI' | 'FARMER' | 'SYSTEM'; text: string; time: string }[]>([])
  const [aiSpeaking, setAiSpeaking] = useState(false)
  const [micListening, setMicListening] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'te'>('en')
  const [ttsEnabled, setTtsEnabled] = useState(true)

  const transcriptEndRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<any>(null)
  const recognitionRef = useRef<any>(null)

  // Load authenticated user profile
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch('/api/me')
        const data = await res.json()
        if (data.authenticated && data.user) {
          const uName = data.user.name || 'Yaswanth'
          const uMobile = data.user.mobile || '+91 8555864859'
          setCallerName(`${uName} (Groundnut Farmer, Anantapur)`)
          setCallerMobile(uMobile)
        }
      } catch (e) {}
    }
    loadUser()
  }, [])

  // Scroll transcript to bottom
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [transcript, aiSpeaking])

  // Call duration timer
  useEffect(() => {
    if (callState === 'CONNECTED') {
      timerRef.current = setInterval(() => {
        setDuration(d => d + 1)
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
      setDuration(0)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [callState])

  // Web Speech API Text-to-Speech
  const speakText = (text: string) => {
    if (!ttsEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.95
    utterance.pitch = 1.0
    utterance.lang = selectedLanguage === 'te' ? 'te-IN' : 'en-IN'

    setAiSpeaking(true)
    utterance.onend = () => setAiSpeaking(false)
    utterance.onerror = () => setAiSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  // Start Inbound Call
  async function startCall() {
    setCallState('DIALING')
    setTranscript([
      {
        role: 'SYSTEM',
        text: `Connecting cellular telephone call from ${callerMobile} to AgriAI Toll-Free Gateway (+91 80 4719 5000)...`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ])

    setTimeout(async () => {
      setCallState('CONNECTED')
      try {
        const res = await fetch('/api/voice/inbound', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ callerMobile })
        })
        const data = await res.json()
        const greeting = selectedLanguage === 'te' && data.result?.teluguSpeechText
          ? data.result.teluguSpeechText
          : data.result?.speechText || `Welcome to The Farmer's Gamble. Namaskaram ${callerName.split(' ')[0]}! We have loaded your 3-acre farm in Anantapur.\nPress 1 for Mandi Prices.\nPress 2 for Weather alerts.\nPress 3 for Crop recommendation.\nPress 4 for Fertilizer dosage.\nPress 5 for Plant disease.\nPress 6 for Marketplace.\nOr press 0 to speak naturally with AgriAI.`

        setTranscript(prev => [
          ...prev,
          {
            role: 'AI',
            text: greeting,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ])
        speakText(greeting)
      } catch (e) {
        const fallback = `Namaskaram! Welcome to AgriAI voice assistant. Press 1 for Mandi prices, 2 for weather, 4 for fertilizer, or 0 to speak.`
        setTranscript(prev => [
          ...prev,
          { role: 'AI', text: fallback, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ])
        speakText(fallback)
      }
    }, 1200)
  }

  // End Call
  function endCall() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setAiSpeaking(false)
    setMicListening(false)
    setCallState('IDLE')
    setTranscript(prev => [
      ...prev,
      {
        role: 'SYSTEM',
        text: `Call completed. Total Duration: ${formatTime(duration)}. Call record & transcript logged to Gram Panchayat telemetry.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ])
  }

  // Handle DTMF Key Press (0-9, *, #)
  async function handleDtmf(digit: string) {
    if (callState !== 'CONNECTED') return

    const keyLabels: Record<string, string> = {
      '1': 'Pressed 1: Market Prices',
      '2': 'Pressed 2: Weather & Storm Alerts',
      '3': 'Pressed 3: AI Crop Recommendation',
      '4': 'Pressed 4: Fertilizer Dosage',
      '5': 'Pressed 5: Plant Disease Scanner',
      '6': 'Pressed 6: Farm Marketplace',
      '0': 'Pressed 0: Natural Voice Dialogue',
      '*': 'Pressed * (Back / Menu)',
      '#': 'Pressed # (Repeat)',
    }

    setTranscript(prev => [
      ...prev,
      {
        role: 'FARMER',
        text: keyLabels[digit] || `Pressed Key [${digit}]`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ])

    try {
      const res = await fetch('/api/voice/inbound', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callerMobile, dtmfDigits: digit })
      })
      const data = await res.json()
      const aiReply = selectedLanguage === 'te' && data.result?.teluguSpeechText
        ? data.result.teluguSpeechText
        : data.result?.speechText || `Information for option ${digit} retrieved successfully.`

      setTranscript(prev => [
        ...prev,
        {
          role: 'AI',
          text: aiReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
      speakText(aiReply)
    } catch (e) {
      console.error(e)
    }
  }

  // Handle Speech Recognition Microphone
  function toggleMic() {
    if (typeof window === 'undefined') return
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Speech recognition is supported in Chrome/Edge browsers.')
      return
    }

    if (micListening) {
      recognitionRef.current?.stop()
      setMicListening(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = selectedLanguage === 'te' ? 'te-IN' : 'en-IN'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => setMicListening(true)
    recognition.onresult = async (event: any) => {
      const speechQuery = event.results[0][0].transcript
      setMicListening(false)
      setTranscript(prev => [
        ...prev,
        {
          role: 'FARMER',
          text: `🎙️ "${speechQuery}"`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])

      try {
        const res = await fetch('/api/voice/inbound', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ callerMobile, speechResult: speechQuery })
        })
        const data = await res.json()
        const aiResponse = selectedLanguage === 'te' && data.result?.teluguSpeechText
          ? data.result.teluguSpeechText
          : data.result?.speechText || `I understood your query about "${speechQuery}".`

        setTranscript(prev => [
          ...prev,
          {
            role: 'AI',
            text: aiResponse,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ])
        speakText(aiResponse)
      } catch (e) {}
    }
    recognition.onerror = () => setMicListening(false)
    recognition.onend = () => setMicListening(false)

    recognitionRef.current = recognition
    recognition.start()
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* LEFT 5 COLS: 2G BASIC MOBILE PHONE HARDWARE SIMULATOR */}
      <div className="lg:col-span-5 flex justify-center">
        <div className="w-full max-w-[340px] rounded-[42px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-5 shadow-2xl border-4 border-slate-800 relative">
          
          {/* Phone Speaker Notch */}
          <div className="w-20 h-3.5 bg-slate-900 rounded-full mx-auto mb-4 border border-slate-800 flex items-center justify-center">
            <div className="w-8 h-1 bg-slate-700 rounded-full" />
          </div>

          {/* 2G Monochrome / LCD Screen */}
          <div className="rounded-2xl bg-slate-950 border-2 border-emerald-500/40 p-4 shadow-inner space-y-3 min-h-[170px] flex flex-col justify-between relative overflow-hidden">
            
            {/* Screen Header */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pb-1 border-b border-slate-800">
              <span className="flex items-center gap-1">
                <Radio className={`w-3 h-3 ${callState === 'CONNECTED' ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
                <span>2G GSM</span>
              </span>
              <span className="font-bold text-emerald-400">
                {callState === 'IDLE' ? 'READY' : callState === 'DIALING' ? 'DIALING...' : formatTime(duration)}
              </span>
            </div>

            {/* Caller Identity */}
            <div className="text-center space-y-1 py-1">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mx-auto text-emerald-400">
                <User className="w-4 h-4" />
              </div>
              <div className="font-heading font-black text-xs text-white truncate">
                {callerName}
              </div>
              <div className="text-[10px] font-mono text-emerald-300">
                {callerMobile}
              </div>
              <div className="text-[9px] text-slate-500">
                Normal Phone (IVR & Voice Activated)
              </div>
            </div>

            {/* Live Audio Waveform Animation when AI Speaks */}
            {callState === 'CONNECTED' && (
              <div className="flex items-center justify-center gap-1 pt-1 h-5">
                {[40, 70, 30, 90, 60, 100, 45, 80, 50, 65].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: aiSpeaking ? `${h}%` : '20%' }}
                    className={`w-1 rounded-full transition-all duration-150 ${
                      aiSpeaking ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Physical DTMF Keypad Grid */}
          <div className="grid grid-cols-3 gap-2.5 my-5">
            {[
              { num: '1', sub: 'PRICES' },
              { num: '2', sub: 'WEATHER' },
              { num: '3', sub: 'CROPS' },
              { num: '4', sub: 'FERTILIZER' },
              { num: '5', sub: 'DISEASE' },
              { num: '6', sub: 'MARKET' },
              { num: '7', sub: 'PQRS' },
              { num: '8', sub: 'TUV' },
              { num: '9', sub: 'WXYZ' },
              { num: '*', sub: 'STAR' },
              { num: '0', sub: 'AGRIAI' },
              { num: '#', sub: 'HASH' },
            ].map((k) => (
              <button
                key={k.num}
                onClick={() => handleDtmf(k.num)}
                disabled={callState !== 'CONNECTED'}
                className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-emerald-950/80 border border-slate-800 hover:border-emerald-500/40 text-center transition-all disabled:opacity-40 shadow-sm"
              >
                <div className="font-heading font-black text-sm text-white">{k.num}</div>
                <div className="text-[8px] font-bold text-slate-400 tracking-wider uppercase">{k.sub}</div>
              </button>
            ))}
          </div>

          {/* Call / End Main Buttons */}
          <div className="space-y-2">
            {callState === 'IDLE' ? (
              <button
                onClick={startCall}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs shadow-glow-green active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call AgriAI (+91 80 4719 5000)</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={toggleMic}
                  className={`py-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    micListening
                      ? 'bg-rose-600 border-rose-500 text-white animate-pulse'
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {micListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  <span>{micListening ? 'Listening...' : 'Speak'}</span>
                </button>

                <button
                  onClick={endCall}
                  className="py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>End Call</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* RIGHT 7 COLS: LIVE TELEPHONY TRANSCRIPT & DTMF DIRECTORY */}
      <div className="lg:col-span-7 space-y-4">
        
        {/* Architecture Banner & Language Bar */}
        <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live IVR Stream
            </span>
            <span className="text-xs text-slate-400">Twilio / Exotel Gateway</span>
          </div>

          {/* Controls: Audio Mute & Language Switch */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedLanguage(l => l === 'en' ? 'te' : 'en')}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-emerald-300 flex items-center gap-1.5"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>{selectedLanguage === 'en' ? 'English Voice' : 'తెలుగు (Telugu Voice)'}</span>
            </button>

            <button
              onClick={() => setTtsEnabled(t => !t)}
              className={`p-2 rounded-xl border text-xs font-semibold ${
                ttsEnabled ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
              title={ttsEnabled ? 'Audio Speech Active' : 'Audio Muted'}
            >
              {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* DTMF Directory Quick Guide */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {[
            { key: 'Key 1', title: 'Mandi Prices & Trends' },
            { key: 'Key 2', title: 'Emergency Weather Alerts' },
            { key: 'Key 3', title: 'Crop Suitability Advice' },
            { key: 'Key 4', title: 'Exact Fertilizer Bags' },
            { key: 'Key 5', title: 'Plant Disease Remedies' },
            { key: 'Key 6', title: 'Direct Buyer Offers' },
            { key: 'Key 7', title: 'Govt Subsidy / PM-KISAN' },
            { key: 'Key 0', title: 'Live Voice AI Talk' },
          ].map((d) => (
            <div key={d.key} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-0.5">
              <span className="font-heading font-black text-emerald-400 text-xs">{d.key}:</span>
              <div className="text-slate-300 text-[10px] font-semibold truncate">{d.title}</div>
            </div>
          ))}
        </div>

        {/* Live Audio Transcript Box */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl flex flex-col h-[340px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Live Telephony Audio Transcript
            </span>
            <button
              onClick={() => setTranscript([])}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Clear
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pt-3 pr-2 text-xs">
            {transcript.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2">
                <PhoneCall className="w-8 h-8 text-slate-700 animate-bounce" />
                <p>Click "Call AgriAI" on the phone simulator to begin live voice interaction.</p>
              </div>
            ) : (
              transcript.map((t, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    t.role === 'AI'
                      ? 'bg-slate-950 border border-slate-800 text-emerald-200'
                      : t.role === 'FARMER'
                      ? 'bg-emerald-950/80 border border-emerald-500/40 text-white ml-6'
                      : 'bg-slate-950/60 border border-slate-800/80 text-slate-400 italic text-[11px]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="font-bold uppercase tracking-wider">
                      {t.role === 'AI' ? '🤖 AgriAI Voice' : t.role === 'FARMER' ? '👨‍🌾 Farmer Voice / Keypad' : '⚙️ Telephony Bridge'}
                    </span>
                    <span>{t.time}</span>
                  </div>
                  <p className="whitespace-pre-line">{t.text}</p>
                </div>
              ))
            )}
            <div ref={transcriptEndRef} />
          </div>
        </div>

      </div>

    </div>
  )
}
