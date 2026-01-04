import { useState } from "react";
import { Calculator, Mail, CircleAlert } from "lucide-react";
import { FormCard } from "./components/FormCard";
import { ResultCard } from "./components/ResultCard";
import { CurrencyToggle } from "./components/CurrencyToggle";
import { motion } from "framer-motion";
import { fadeIn } from "./utils/motion";
import Hero from "./components/Hero";

export default function App() {
  const [currency, setCurrency] = useState<"USD" | "ETB">("USD");
  const [exchangeRate, setExchangeRate] = useState(120);

  // Form state
  const [websiteType, setWebsiteType] = useState<
    "landing" | "business" | "ecommerce"
  >("business");
  const [designComplexity, setDesignComplexity] = useState<
    "basic" | "standard" | "premium"
  >("standard");
  const [urgency, setUrgency] = useState<"standard" | "fast" | "rush">(
    "standard"
  );
  const [customPages, setCustomPages] = useState(5);
  const [features, setFeatures] = useState({
    contactForm: false,
    ecommerce: false,
    adminDashboard: false,
    auth: false,
    payment: false,
    apiIntegration: false,
  });

  // Result state
  const [calculated, setCalculated] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Pricing configuration
  const basePrices = { landing: 300, business: 800, ecommerce: 2500 };
  const featureCosts = {
    contactForm: 100,
    ecommerce: 400,
    adminDashboard: 600,
    auth: 200,
    payment: 300,
    apiIntegration: 200,
  };
  const designMultiplier = { basic: 0.9, standard: 1.0, premium: 1.4 };
  const urgencyMultiplier = { standard: 1.0, fast: 1.15, rush: 1.35 };
  const pagesCostPerPage = 25;
  const basePagesForType = { landing: 1, business: 5, ecommerce: 8 };
  const baseDaysForType = { landing: 3, business: 10, ecommerce: 25 };
  const designExtraDays = { basic: 0, standard: 3, premium: 7 };

  // Calculate totals
  const base = basePrices[websiteType];
  const featuresTotal = Object.entries(features)
    .filter(([_, checked]) => checked)
    .reduce(
      (sum, [feature, _]) =>
        sum + featureCosts[feature as keyof typeof featureCosts],
      0
    );

  const extraPages = Math.max(0, customPages - basePagesForType[websiteType]);
  const pagesTotal = extraPages * pagesCostPerPage;

  const subtotalUSD =
    (base + featuresTotal + pagesTotal) * designMultiplier[designComplexity];
  const totalUSD = subtotalUSD * urgencyMultiplier[urgency];
  const totalDisplay = currency === "ETB" ? totalUSD * exchangeRate : totalUSD;

  const checkedFeaturesCount = Object.values(features).filter(Boolean).length;
  const timelineDays =
    baseDaysForType[websiteType] +
    checkedFeaturesCount * 2 +
    designExtraDays[designComplexity];
  const timelineWeeks = Math.ceil(timelineDays / 7);

  const handleCalculate = () => {
    setCalculated(true);

    if (urgency === "rush" && !showToast) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }

    // Scroll to result on mobile
    if (window.innerWidth < 768) {
      setTimeout(() => {
        document
          .getElementById("result-card")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const breakdown = {
    basePrice: base,
    featuresTotal,
    pagesTotal,
    designMultiplier: designMultiplier[designComplexity],
    urgencyMultiplier: urgencyMultiplier[urgency],
    exchangeRate: currency === "ETB" ? exchangeRate : 1,
  };

  return (
    <div className="min-h-screen  text-[#e6e6e6]">
      <div
        style={{
          backgroundImage: `url(/estimator-background.png)`,
          backgroundAttachment: "fixed", // This creates the "locked" feel
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "blur(0.4px)", // Your requested blur
        }}
        className="absolute inset-0 w-full h-full z-[-5]"
      />
      {/* Header */}
      <header className="w-full">
        <div className="w-full mx-auto px-6 py-3 flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4">
          <div className="flex flex-row gap-4">
            <Calculator className="w-6 h-6 text-[#0ea5e9]" />
            <div className="flex items-center gap-2.5">
              <h1 className="font-semibold">Website Cost Estimator</h1>
            </div>
          </div>

          <CurrencyToggle
            currency={currency}
            onToggle={setCurrency}
            exchangeRate={exchangeRate}
            onExchangeRateChange={setExchangeRate}
          />
        </div>
      </header>

      <Hero />
      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-8 md:py-12">
        <div
          className={`${
            calculated
              ? "grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-6"
              : "flex justify-center items-center w-full"
          } lg:gap-8 items-start`}
        >
          {/* Form Card */}
          <motion.div variants={fadeIn("left", "spring", 0.6, 0.75)}>
            <FormCard
              websiteType={websiteType}
              calculated={calculated}
              setWebsiteType={setWebsiteType}
              designComplexity={designComplexity}
              setDesignComplexity={setDesignComplexity}
              urgency={urgency}
              setUrgency={setUrgency}
              customPages={customPages}
              setCustomPages={setCustomPages}
              features={features}
              setFeatures={setFeatures}
              onCalculate={handleCalculate}
            />
          </motion.div>

          {/* Result Card */}
          {calculated && (
            <motion.div variants={fadeIn("right", "spring", 0.6, 0.75)}>
              <ResultCard
                calculated={calculated}
                totalDisplay={totalDisplay}
                currency={currency}
                timelineWeeks={timelineWeeks}
                timelineDays={timelineDays}
                breakdown={breakdown}
                websiteType={websiteType}
                designComplexity={designComplexity}
                features={features}
              />
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1f1f1f] mt-12">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#9ca3af]">
            <p className="flex items-center gap-2">
              <CircleAlert className="w-4 h-4" />
              All estimates are approximate. Final pricing may vary based on
              specific requirements.
            </p>
            <a
              href="mailto:contact@example.com"
              className="flex items-center gap-2 text-[#0ea5e9] hover:text-[#38bdf8] transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact for detailed quote
            </a>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-sm bg-[#8b5cf6] text-white px-5 py-3 rounded-lg shadow-lg animate-slide-up flex items-center gap-3 z-50">
          <CircleAlert className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">
            Rush jobs may incur additional costs — contact for confirmation
          </p>
        </div>
      )}
    </div>
  );
}
