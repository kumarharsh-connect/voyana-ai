'use client';
import { Send, Sparkles, Loader2, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Message {
  role: 'USER' | 'ASSISTANT';
  content: string;
}

export default function AIAssistant({
  tripId,
  messages,
  setMessages,
  onItineraryUpdate,
}: {
  tripId: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onItineraryUpdate: (itinerary: any) => void;
}) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setLoading(true);

    setMessages((prev) => [...prev, { role: 'USER', content: userMessage }]);

    try {
      const res = await fetch(`/api/trips/${tripId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      if (data.itinerary) {
        onItineraryUpdate(data.itinerary);
      }

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: 'ASSISTANT', content: data.reply },
        ]);
      }
    } catch (error) {
      console.error('Chat failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed bottom-6 right-6 z-60'>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className='group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all'
        >
          <Sparkles className='h-6 w-6 transition-transform group-hover:rotate-12' />
          <span className='absolute right-16 scale-0 group-hover:scale-100 transition-all origin-right bg-foreground text-background text-[10px] font-bold py-2 px-3 rounded-xl whitespace-nowrap shadow-xl uppercase tracking-widest'>
            Refine with AI
          </span>
        </button>
      )}

      {open && (
        <div className='w-[380px] sm:w-[400px] flex flex-col rounded-[2.5rem] border border-white/20 bg-background/80 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500'>
          <div className='flex items-center justify-between px-6 py-5 border-b border-white/10 bg-background/40'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary'>
                <Sparkles className='h-5 w-5' />
              </div>
              <div className='leading-tight'>
                <p className='text-sm font-bold'>Voyana AI</p>
                <div className='flex items-center gap-1.5'>
                  <span className='h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse' />
                  <p className='text-[11px] text-muted-foreground font-medium'>
                    Live Assistant
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className='rounded-xl p-2 text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors'
            >
              <XIcon className='h-5 w-5' />
            </button>
          </div>

          <div
            ref={scrollRef}
            className='p-6 space-y-6 h-[400px] overflow-y-auto scroll-smooth'
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  m.role === 'USER' ? 'items-end' : 'items-start'
                }`}
              >
                <span
                  className={`text-[10px] font-bold tracking-widest uppercase mb-1.5 opacity-40 ${
                    m.role === 'USER' ? 'mr-1' : 'ml-1'
                  }`}
                >
                  {m.role === 'USER' ? 'You' : 'Voyana AI'}
                </span>
                <div
                  className={`max-w-[85%] rounded-[1.25rem] px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    m.role === 'USER'
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'bg-muted/60 text-foreground rounded-tl-none border border-border/40'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className='flex flex-col items-start'>
                <span className='text-[10px] font-bold tracking-widest uppercase mb-1.5 opacity-40 ml-1'>
                  Voyana AI
                </span>
                <div className='flex items-center gap-2 px-4 py-3 rounded-[1.25rem] rounded-tl-none bg-muted/30 border border-border/20 text-[11px] font-medium text-muted-foreground animate-pulse'>
                  <Loader2 className='h-3 w-3 animate-spin' />
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className='p-4 border-t border-white/10 bg-background/40'>
            <div className='flex items-center gap-2 rounded-2xl border border-border/40 bg-background px-2 py-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all'>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Ask for changes...'
                className='flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground/50'
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className='rounded-xl bg-primary p-2 text-white disabled:opacity-30 transition-all active:scale-90 shadow-lg shadow-primary/20'
                disabled={loading || !input.trim()}
              >
                <Send className='h-4 w-4' />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
