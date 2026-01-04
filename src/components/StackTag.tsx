import { Code, Palette, Zap, CreditCard, Database } from "lucide-react";

interface StackTagProps {
  name: string;
}

const iconMap: Record<string, any> = {
  React: Code,
  "Next.js": Zap,
  "Tailwind CSS": Palette,
  Firebase: Database,
  Stripe: CreditCard,
  "Framer Motion": Zap,
};

export function StackTag({ name }: StackTagProps) {
  const Icon = iconMap[name] || Code;

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg hover:border-[#0ea5e9] hover:shadow-[0_0_10px_rgba(14,165,233,0.2)] transition-all group cursor-default">
      <Icon className="w-3.5 h-3.5 text-[#0ea5e9] group-hover:text-[#38bdf8] transition-colors" />
      <span className="text-xs font-medium text-[#e6e6e6]">{name}</span>
    </div>
  );
}
