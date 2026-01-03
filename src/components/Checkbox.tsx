import { Check } from 'lucide-react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded border-2 transition-all ${
            checked
              ? 'bg-[#0ea5e9] border-[#0ea5e9] shadow-[0_0_10px_rgba(14,165,233,0.3)]'
              : 'bg-[#0a0a0a] border-[#1f1f1f] group-hover:border-[#0ea5e9]'
          }`}
        >
          {checked && (
            <Check className="w-full h-full p-0.5 text-white" strokeWidth={3} />
          )}
        </div>
      </div>
      <span className="text-sm text-[#e6e6e6] select-none">{label}</span>
    </label>
  );
}
