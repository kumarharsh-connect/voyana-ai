'use client';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function AIAssistant({
  tripId,
  onItineraryUpdate,
}: {
  tripId: string;
  onItineraryUpdate: (itinerary: any) => void;
}) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; content: string }[]
  >([]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setLoading(true);

    setMessages((m) => [...m, { role: 'user', content: userMessage }]);

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
        setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
      }
    } catch (error) {
      console.error('Chat failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed bottom-6 right-6 w-[360px] flex flex-col rounded-2xl border border-border bg-background shadow-2xl overflow-hidden'>
      <div className='flex items-center gap-2 px-4 py-3 border-b bg-muted/30'>
        <Sparkles className='h-4 w-4 text-primary' />
        <span className='font-semibold'>Voyana AI</span>
      </div>

      <div className='p-4 space-y-4 max-h-[400px] overflow-y-auto'>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col ${
              m.role === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <span className='text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-1'>
              {m.role === 'user' ? 'You' : 'Voyana'}
            </span>
            <div
              className={`text-sm p-3 rounded-2xl ${
                m.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-none'
                  : 'bg-muted text-foreground rounded-tl-none'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className='flex items-center gap-2 text-xs text-muted-foreground'>
            <Loader2 className='h-3 w-3 animate-spin' />
            Voyana is thinking...
          </div>
        )}
      </div>

      <div className='flex items-center gap-2 border-t p-3'>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Ask Voyana to tweak your trip...'
          className='flex-1 bg-transparent text-sm outline-none'
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
  );
}
