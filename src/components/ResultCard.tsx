import { FileDown, Mail, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { StackTag } from './StackTag';

interface ResultCardProps {
  calculated: boolean;
  totalDisplay: number;
  currency: 'USD' | 'ETB';
  timelineWeeks: number;
  timelineDays: number;
  breakdown: {
    basePrice: number;
    featuresTotal: number;
    pagesTotal: number;
    designMultiplier: number;
    urgencyMultiplier: number;
    exchangeRate: number;
  };
  websiteType: string;
  designComplexity: string;
  features: Record<string, boolean>;
}

export function ResultCard({
  calculated,
  totalDisplay,
  currency,
  timelineWeeks,
  timelineDays,
  breakdown,
  websiteType,
  designComplexity,
  features,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(totalDisplay.toFixed(2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getRecommendedStack = () => {
    const stacks = [];
    
    if (websiteType === 'landing') {
      stacks.push('React', 'Tailwind CSS');
    } else if (websiteType === 'business') {
      stacks.push('React', 'Tailwind CSS', 'Next.js');
    } else {
      stacks.push('React', 'Next.js', 'Stripe');
    }

    if (features.auth || features.adminDashboard) {
      stacks.push('Firebase');
    }

    if (features.ecommerce || features.payment) {
      if (!stacks.includes('Stripe')) stacks.push('Stripe');
    }

    if (designComplexity === 'premium') {
      stacks.push('Framer Motion');
    }

    return stacks;
  };

  const recommendedStack = getRecommendedStack();

  return (
    <div
      id="result-card"
      className={`bg-[#111111] border border-[#1f1f1f] rounded-xl p-6 lg:p-8 transition-all duration-500 ${
        calculated ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
      }`}
    >
      <h2 className="font-semibold mb-6">Estimated Cost</h2>

      {/* Price Display */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-[#0ea5e9]">
            <span className="text-sm font-medium">{currency}</span>
            <span className="ml-1.5">{currency === 'USD' ? '$' : 'Br'}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold tracking-tight">
              {totalDisplay.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 hover:bg-[#1f1f1f] rounded transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4 text-[#10b981]" />
              ) : (
                <Copy className="w-4 h-4 text-[#9ca3af]" />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#9ca3af]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]"></div>
          <span className="text-sm">
            Estimated Timeline: <span className="text-[#e6e6e6] font-medium">{timelineWeeks} {timelineWeeks === 1 ? 'Week' : 'Weeks'}</span> ({timelineDays} days)
          </span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-[#9ca3af] mb-3">Cost Breakdown</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[#9ca3af]">Base Price</span>
            <span className="text-[#e6e6e6]">${breakdown.basePrice}</span>
          </div>
          {breakdown.featuresTotal > 0 && (
            <div className="flex justify-between">
              <span className="text-[#9ca3af]">Features Total</span>
              <span className="text-[#e6e6e6]">+${breakdown.featuresTotal}</span>
            </div>
          )}
          {breakdown.pagesTotal > 0 && (
            <div className="flex justify-between">
              <span className="text-[#9ca3af]">Additional Pages</span>
              <span className="text-[#e6e6e6]">+${breakdown.pagesTotal}</span>
            </div>
          )}
          {breakdown.designMultiplier !== 1.0 && (
            <div className="flex justify-between">
              <span className="text-[#9ca3af]">Design Multiplier</span>
              <span className="text-[#e6e6e6]">×{breakdown.designMultiplier}</span>
            </div>
          )}
          {breakdown.urgencyMultiplier !== 1.0 && (
            <div className="flex justify-between">
              <span className="text-[#9ca3af]">Urgency Multiplier</span>
              <span className="text-[#e6e6e6]">×{breakdown.urgencyMultiplier}</span>
            </div>
          )}
          {currency === 'ETB' && (
            <div className="flex justify-between pt-2 border-t border-[#1f1f1f]">
              <span className="text-[#9ca3af]">Exchange Rate (USD → ETB)</span>
              <span className="text-[#e6e6e6]">{breakdown.exchangeRate}</span>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Stack */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-[#9ca3af] mb-3">Recommended Stack</h3>
        <div className="flex flex-wrap gap-2">
          {recommendedStack.map((tech) => (
            <StackTag key={tech} name={tech} />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 bg-[#8b5cf6] hover:bg-[#7c3aed] active:bg-[#6d28d9] text-white font-medium py-3 px-5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.25)] hover:shadow-[0_0_25px_rgba(139,92,246,0.35)]">
          <FileDown className="w-4 h-4" />
          Download PDF
        </button>
        <button className="flex-1 border border-[#1f1f1f] hover:border-[#0ea5e9] hover:bg-[#0ea5e9]/10 text-[#e6e6e6] font-medium py-3 px-5 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Mail className="w-4 h-4" />
          Contact Me
        </button>
      </div>
    </div>
  );
}