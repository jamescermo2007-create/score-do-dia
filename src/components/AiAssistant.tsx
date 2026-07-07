import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, MessageSquare, Zap, Trash } from 'lucide-react';

interface AiAssistantProps {
  language: string;
}

export default function AiAssistant({ language }: AiAssistantProps) {
  const [messages, setMessages] = useState<any[]>([
    {
      role: 'bot',
      text: 'Hello! I am **FutIA**, your expert AI Football Coach and Analyst. Ask me anything about matches, player comparison stats, tactical definitions (like the offside rule), or match outcome predictions.'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    { label: 'Messi vs Ronaldo comparative', text: 'Provide a detailed statistical and tactical comparison between Lionel Messi and Cristiano Ronaldo, listing their career goals, assists, Ballon dOr awards, and stylistic play differences.' },
    { label: 'Explain the offside rule', text: 'Explain the football offside rule clearly, outlining the positions of players, the moment the pass is made, and any exceptions like throw-ins or corners.' },
    { label: 'Champions League Prediction', text: 'Analyze the major contenders for the current UEFA Champions League title and predict which team has the highest probability of winning based on their current squad depth and tactical form.' },
    { label: 'Explain Expected Goals (xG)', text: 'What is Expected Goals (xG) in football? How is it calculated, and why do modern tacticians and scouts value this statistic over simple shot counts?' }
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: textToSend,
          context: { type: 'chat' }
        })
      });
      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, { role: 'bot', text: data.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: 'I am currently optimizing my neural soccer engines. Please retry in a few seconds.' }]);
      }
    } catch (err) {
      console.error('AI Chat Error:', err);
      setMessages(prev => [...prev, { role: 'bot', text: 'I faced a small transmission error on the pitch. Please verify your connection and resubmit.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputValue);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'bot',
        text: 'Hello! I am **FutIA**, your expert AI Football Coach and Analyst. Ask me anything about matches, player comparison stats, tactical definitions (like the offside rule), or match outcome predictions.'
      }
    ]);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-10 flex flex-col gap-6 pb-20">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/25 p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-0 right-0 h-28 w-28 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/25">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">FutIA Analyst</h1>
              <p className="text-zinc-500 text-xs mt-0.5">Tactical breakdowns, prediction engines, and historical explanations.</p>
            </div>
          </div>

          <button
            onClick={clearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-xs text-zinc-500 hover:text-white transition-colors self-center sm:self-auto"
          >
            <Trash className="h-3.5 w-3.5" />
            <span>Reset Chat</span>
          </button>
        </div>
      </div>

      {/* Main chat log */}
      <div className="rounded-3xl border border-zinc-900 bg-zinc-900/10 p-5 flex flex-col gap-4 h-[420px] overflow-y-auto">
        {messages.map((msg, idx) => {
          const isBot = msg.role === 'bot';
          return (
            <div 
              key={idx}
              className={`flex gap-3 max-w-[85%] ${isBot ? 'self-start' : 'self-end flex-row-reverse'}`}
            >
              {/* Profile logo icon */}
              <div className={`h-8 w-8 rounded-lg shrink-0 flex items-center justify-center border text-white font-bold text-xs ${
                isBot ? 'bg-emerald-500 border-emerald-400/40' : 'bg-zinc-800 border-zinc-700'
              }`}>
                {isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>

              {/* Chat bubble body */}
              <div className={`p-3.5 rounded-2xl text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-wrap ${
                isBot 
                  ? 'bg-zinc-900/65 border border-zinc-800 text-zinc-300' 
                  : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/5'
              }`}>
                {msg.text}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 self-start max-w-[85%]">
            <div className="h-8 w-8 rounded-lg shrink-0 flex items-center justify-center border border-emerald-400/40 bg-emerald-500 text-white font-bold text-xs">
              <Bot className="h-4 w-4 animate-pulse" />
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-900/65 border border-zinc-800 text-zinc-500 text-xs sm:text-sm flex items-center gap-1.5 font-mono font-bold uppercase tracking-wider">
              <Sparkles className="h-4.5 w-4.5 text-emerald-500 animate-spin" />
              <span>Analyzing soccer tactics...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick suggest prompts */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider ml-1 flex items-center gap-1">
          <Zap className="h-3 w-3 text-emerald-500" />
          Quick Analytics Prompts
        </span>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt.text)}
              className="px-3 py-2 rounded-xl border border-zinc-800/80 bg-zinc-900/20 hover:bg-zinc-900/60 text-zinc-400 hover:text-emerald-400 text-xs font-semibold text-left transition-all"
            >
              {prompt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input row */}
      <div className="flex gap-3 mt-2">
        <input
          type="text"
          placeholder="Ask FutIA (e.g., 'Who is Phil Foden?', 'Compare Erling Haaland and Jude Bellingham')"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
        />
        <button
          onClick={() => handleSendMessage(inputValue)}
          className="px-5 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition-colors flex items-center justify-center"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
}
