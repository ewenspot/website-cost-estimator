# Website Cost Estimator - Pricing Logic

This document outlines the complete pricing calculation logic used in the Website Cost Estimator application.

## Pricing Variables (USD Base)

### Base Prices by Website Type
```javascript
const basePrices = {
  landing: 300,      // Landing page
  business: 800,     // Business website
  ecommerce: 2500    // E-commerce site
};
```

### Feature Costs
```javascript
const featureCosts = {
  contactForm: 100,
  ecommerce: 400,
  adminDashboard: 600,
  auth: 200,
  payment: 300,
  apiIntegration: 200
};
```

### Design Complexity Multipliers
```javascript
const designMultiplier = {
  basic: 0.9,      // 10% discount
  standard: 1.0,   // No change
  premium: 1.4     // 40% premium
};
```

### Timeline Urgency Multipliers
```javascript
const urgencyMultiplier = {
  standard: 1.0,   // No rush
  fast: 1.15,      // +15%
  rush: 1.35       // +35%
};
```

### Additional Page Pricing
```javascript
const pagesCostPerPage = 25;  // USD per extra page beyond base

const basePagesForType = {
  landing: 1,
  business: 5,
  ecommerce: 8
};
```

## Calculation Formula

### Step 1: Calculate Base + Features + Pages
```javascript
base = basePrices[selectedType]
featuresTotal = sum(featureCosts for each checked feature)
extraPages = max(0, customPages - basePagesForType[selectedType])
pagesTotal = extraPages * pagesCostPerPage
```

### Step 2: Apply Design Multiplier
```javascript
subtotalUSD = (base + featuresTotal + pagesTotal) * designMultiplier[selectedDesign]
```

### Step 3: Apply Urgency Multiplier
```javascript
totalUSD = subtotalUSD * urgencyMultiplier[selectedUrgency]
```

### Step 4: Currency Conversion (if ETB selected)
```javascript
if (currency === "ETB") {
  totalDisplay = totalUSD * exchangeRate
} else {
  totalDisplay = totalUSD
}
```

## Timeline Calculation

### Base Timeline by Type
```javascript
const baseDaysForType = {
  landing: 3,      // days
  business: 10,    // days
  ecommerce: 25    // days
};
```

### Design Complexity Extra Days
```javascript
const designExtraDays = {
  basic: 0,
  standard: 3,
  premium: 7
};
```

### Timeline Formula
```javascript
checkedFeaturesCount = count of selected features
timelineDays = baseDaysForType[selectedType] + 
               (checkedFeaturesCount * 2) + 
               designExtraDays[selectedDesign]

timelineWeeks = ceil(timelineDays / 7)
```

## Example Calculation

**Selected Options:**
- Website Type: Business ($800)
- Design: Premium (×1.4)
- Pages: 8 (3 extra pages = $75)
- Features: Contact Form ($100), User Auth ($200)
- Urgency: Fast (×1.15)
- Currency: ETB (rate: 120)

**Calculation:**
```
base = 800
featuresTotal = 100 + 200 = 300
pagesTotal = (8 - 5) × 25 = 75

subtotal = (800 + 300 + 75) × 1.4 = 1,645
totalUSD = 1,645 × 1.15 = 1,891.75
totalETB = 1,891.75 × 120 = 227,010

Timeline: 10 (base) + 4 (2 features × 2) + 7 (premium) = 21 days (3 weeks)
```

## Technology Stack Recommendations

The app automatically recommends tech stacks based on selections:

- **Landing page**: React, Tailwind CSS
- **Business site**: React, Tailwind CSS, Next.js
- **E-commerce**: React, Next.js, Stripe
- **With Auth/Admin**: + Firebase
- **With E-commerce/Payment**: + Stripe
- **Premium Design**: + Framer Motion

---

*This pricing logic is implemented in `/src/app/App.tsx` and can be customized to match your specific pricing structure.*
