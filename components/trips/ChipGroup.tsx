export function ChipGroup({
  icon,
  label,
  options,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
        {icon}
        {label}
      </div>

      <div className='flex flex-wrap gap-3'>
        {options.map((opt) => (
          <button
            key={opt}
            type='button'
            onClick={() => onChange(opt)}
            className={`rounded-full px-5 py-2 text-sm font-medium border transtion-all ${
              value === opt
                ? 'bg-primary text-white border-primary shadow-md'
                : 'bg-white/70 border-border hover:border-primary/40'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
