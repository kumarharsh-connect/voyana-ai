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
    <div className='fixed bottom-10 right-10 z-50'>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className='group flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all'
        >
          <Sparkles className='h-4 w-4 transition-transform group-hover:rotate-12' />
          <span>Refine with Voyana AI</span>
        </button>
      )}
      {open && (
        <div className='w-[400px] max-h-6vh flex flex-col rounded-[2.5rem] border border-white/20 bg-background/70 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500'>
          <div className='flex items-center justify-between px-5 py-4 border-b border-white/10 bg-background/40'>
            <div className='flex items-center gap-3'>
              <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary'>
                <Sparkles className='h-4 w-4' />
              </div>

              <div className='leading-tight'>
                <p className='text-sm font-semibold'>Voyana AI</p>
                <p className='text-[11px] text-muted-foreground'>
                  Your travel co-pilot
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className='rounded-lg px-2 py-1 text-sx font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition'
            >
              <XIcon className='h-5 w-5 text-red-500' />
            </button>
          </div>

          <div
            ref={scrollRef}
            className='p-4 space-y-4 max-h-[420px] overflow-y-auto scroll-smooth'
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  m.role === 'USER' ? 'items-end' : 'items-start'
                }`}
              >
                <span className='text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-1'>
                  {m.role === 'USER' ? 'You' : 'Voyana'}
                </span>
                <div
                  className={`max-w-[85%] rounded-3xl px-5 py-3.5 text-sm ${
                    m.role === 'USER'
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'bg-muted text-foreground rounded-tl-none border border-border/50'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className='flex items-center gap-2 text-xs text-muted-foreground animate-pulse'>
                <Loader2 className='h-3 w-3 animate-spin' />
                Voyana is thinking...
              </div>
            )}
          </div>

          <div className='border-t border-white/10 bg-background/50 p-3'>
            <div className='flex items-center gap-2 rounded-2xl border border-border/60 bg-background px-2 py-2 focus-within:ring-2 focus-within:ring-primary/30 transition'>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Ask Voyana to tweak your trip...'
                className='flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground'
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className='rounded-xl bg-primary p-2 text-white disabled:opacity-50 transition-transform active:scale-95'
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
