import { Pencil } from "lucide-react";
import { useState } from "react";

interface CurrencyToggleProps {
  currency: "USD" | "ETB";
  onToggle: (currency: "USD" | "ETB") => void;
  exchangeRate: number;
  onExchangeRateChange: (rate: number) => void;
}

export function CurrencyToggle({
  currency,
  onToggle,
  exchangeRate,
  onExchangeRateChange,
}: CurrencyToggleProps) {
  const [isEditingRate, setIsEditingRate] = useState(false);
  const [tempRate, setTempRate] = useState(exchangeRate.toString());

  const handleSaveRate = () => {
    const newRate = parseFloat(tempRate);
    if (!isNaN(newRate) && newRate > 0) {
      onExchangeRateChange(newRate);
    } else {
      setTempRate(exchangeRate.toString());
    }
    setIsEditingRate(false);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Exchange Rate Editor */}
      {currency === "ETB" && (
        <div className="flex items-center gap-2">
          {isEditingRate ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={tempRate}
                onChange={(e) => setTempRate(e.target.value)}
                onBlur={handleSaveRate}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveRate();
                  if (e.key === "Escape") {
                    setTempRate(exchangeRate.toString());
                    setIsEditingRate(false);
                  }
                }}
                className="w-20 bg-[#0a0a0a] border border-[#0ea5e9] rounded px-2 py-1 text-sm text-[#e6e6e6] focus:outline-none"
                autoFocus
              />
              <span className="text-xs text-[#9ca3af]">ETB/USD</span>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingRate(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded hover:bg-[#1f1f1f] transition-colors group"
            >
              <span className="text-xs text-[#9ca3af]">
                Rate: {exchangeRate}
              </span>
              <Pencil className="w-3 h-3 text-[#9ca3af] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}
        </div>
      )}

      {/* Currency Toggle */}
      <div className="flex items-center gap-1 bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-1">
        <button
          onClick={() => onToggle("USD")}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
            currency === "USD"
              ? "bg-[#0ea5e9] text-white shadow-[0_0_10px_rgba(14,165,233,0.3)]"
              : "text-[#9ca3af] hover:text-[#e6e6e6]"
          }`}
        >
          USD
        </button>
        <button
          onClick={() => onToggle("ETB")}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
            currency === "ETB"
              ? "bg-[#0ea5e9] text-white shadow-[0_0_10px_rgba(14,165,233,0.3)]"
              : "text-[#9ca3af] hover:text-[#e6e6e6]"
          }`}
        >
          ETB
        </button>
      </div>
    </div>
  );
}
