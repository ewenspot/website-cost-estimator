import { Calculator } from "lucide-react";
import { Dropdown } from "./Dropdown";
import { Checkbox } from "./Checkbox";
import { ScrollReveal } from "./ui/ScrollReveal";

interface FormCardProps {
  websiteType: "landing" | "business" | "ecommerce";
  setWebsiteType: (type: "landing" | "business" | "ecommerce") => void;
  designComplexity: "basic" | "standard" | "premium";
  setDesignComplexity: (complexity: "basic" | "standard" | "premium") => void;
  urgency: "standard" | "fast" | "rush";
  setUrgency: (urgency: "standard" | "fast" | "rush") => void;
  customPages: number;
  setCustomPages: (pages: number) => void;
  features: {
    contactForm: boolean;
    ecommerce: boolean;
    adminDashboard: boolean;
    auth: boolean;
    payment: boolean;
    apiIntegration: boolean;
  };
  setFeatures: (features: any) => void;
  onCalculate: () => void;
  calculated: boolean;
}

export function FormCard({
  websiteType,
  setWebsiteType,
  designComplexity,
  setDesignComplexity,
  urgency,
  setUrgency,
  customPages,
  setCustomPages,
  features,
  setFeatures,
  onCalculate,
  calculated,
}: FormCardProps) {
  const websiteTypeOptions = [
    { value: "landing", label: "Landing Page" },
    { value: "business", label: "Business Website" },
    { value: "ecommerce", label: "E-Commerce Site" },
  ];

  const designOptions = [
    { value: "basic", label: "Basic" },
    { value: "standard", label: "Standard" },
    { value: "premium", label: "Premium" },
  ];

  const urgencyOptions = [
    { value: "standard", label: "Standard (No rush)" },
    { value: "fast", label: "Fast (+15%)" },
    { value: "rush", label: "Rush (+35%)" },
  ];

  return (
    <ScrollReveal
      direction="bottom_to_top"
      delay={170}
      className={`backdrop-blur-2xl border border-[#9494948a] ${
        calculated ? "" : "md:max-w-[800px] w-full mx-6"
      } rounded-xl p-6 lg:sticky lg:top-6`}
    >
      <h2 className="font-semibold mb-6">Project Details</h2>

      <div className="space-y-5">
        {/* Website Type */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Website Type <span className="text-[#ef4444]">*</span>
          </label>
          <Dropdown
            value={websiteType}
            onChange={(value) => setWebsiteType(value as any)}
            options={websiteTypeOptions}
          />
        </div>

        {/* Design Complexity */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Design Complexity <span className="text-[#ef4444]">*</span>
          </label>
          <Dropdown
            value={designComplexity}
            onChange={(value) => setDesignComplexity(value as any)}
            options={designOptions}
          />
        </div>

        {/* Custom Pages */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Number of Pages
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={customPages}
            onChange={(e) => setCustomPages(parseInt(e.target.value))}
            className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-4 py-2.5 text-[#e6e6e6] focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] transition-colors"
          />
          <p className="text-xs text-[#9ca3af] mt-1.5">
            Additional pages cost $25 each
          </p>
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Additional Features
          </label>
          <div className="space-y-2.5">
            <Checkbox
              label="Contact Form (+$100)"
              checked={features.contactForm}
              onChange={(checked) =>
                setFeatures({ ...features, contactForm: checked })
              }
            />
            <Checkbox
              label="E-Commerce Module (+$400)"
              checked={features.ecommerce}
              onChange={(checked) =>
                setFeatures({ ...features, ecommerce: checked })
              }
            />
            <Checkbox
              label="Admin Dashboard (+$600)"
              checked={features.adminDashboard}
              onChange={(checked) =>
                setFeatures({ ...features, adminDashboard: checked })
              }
            />
            <Checkbox
              label="User Authentication (+$200)"
              checked={features.auth}
              onChange={(checked) =>
                setFeatures({ ...features, auth: checked })
              }
            />
            <Checkbox
              label="Payment Integration (+$300)"
              checked={features.payment}
              onChange={(checked) =>
                setFeatures({ ...features, payment: checked })
              }
            />
            <Checkbox
              label="API Integration (+$200)"
              checked={features.apiIntegration}
              onChange={(checked) =>
                setFeatures({ ...features, apiIntegration: checked })
              }
            />
          </div>
        </div>

        {/* Timeline Urgency */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Timeline Urgency
          </label>
          <Dropdown
            value={urgency}
            onChange={(value) => setUrgency(value as any)}
            options={urgencyOptions}
          />
        </div>

        {/* Calculate Button */}
        <button
          onClick={onCalculate}
          className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] active:bg-[#0369a1] text-white font-medium py-3.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] mt-6"
        >
          <Calculator className="w-5 h-5" />
          Calculate Cost
        </button>
      </div>
    </ScrollReveal>
  );
}
