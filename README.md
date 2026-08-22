# 🌾 THE FARMER'S GAMBLE
> **“Turn uncertainty into better farming decisions.”**

A full-stack, production-ready AgriTech decision platform engineered to empower both **Smartphone Farmers** (interactive web/mobile dashboard) and **Normal-Phone Farmers** (ordinary 2G phone calls with AI voice assistance and DTMF IVR).

---

## 🚀 Key Highlights & Architectural Features

| Pillar | Capability |
| :--- | :--- |
| 📱 **Smartphone Farmers** | Interactive web & mobile application with real-time weather radar, 30-day APMC mandi price trend charts, AI leaf photo disease detection, What-If profit simulators, and direct farmgate marketplace. |
| 📞 **Normal-Phone Farmers** | Complete telephony voice assistant accessible via ordinary phone calls. Features DTMF IVR (Dial 1 for prices, 2 for weather, 4 for fertilizer, 0 for AgriAI) and natural voice speech recognition in English and Telugu (తెలుగు). |
| 🔐 **Mandatory Mobile OTP** | 2-factor authentication flow with cryptographic SHA-256 hash storage, 5-minute expiry, max 3 attempts, 60s resend timer, and safe `DEV_OTP_ENABLED=true` quick-fill mode for frictionless reviewer testing. |
| 🌱 **AI Crop Recommendation** | Multi-variable agronomic engine evaluating Soil NPK, pH, season, irrigation, mandi prices, and production costs to rank crops by suitability percentage and estimated net profit. |
| 🧪 **Fertilizer Intelligence** | Precision soil-to-dosage calculator generating exact kg/acre and 50kg bag requirements of DAP, Urea, Potash, and Gypsum for every crop stage, plus eco-friendly bio-fertilizer alternatives. |
| 🦠 **AI Plant Doctor** | Dual-mode disease diagnostic: (1) Leaf photo upload with Computer Vision analysis, and (2) Interactive 5-step symptom questionnaire for farmers without camera access. |
| 🛒 **Smart Selling & Marketplace** | 1-click produce listing pre-filled directly from farm profile, structured digital buyer purchase bids, and privacy-protected masked phone call bridging (+91 80 4719 XXXX). |
| ⚡ **Hackathon Live Controller** | Sticky floating simulation bar allowing instant testing of storm warnings, price jumps (+₹3/kg), leaf diseases, proactive outbound calls, and buyer purchase offers. |

---

## 🛠️ Technology Stack

- **Frontend:** Next.js (Pages Router), React 18, TypeScript, Tailwind CSS, Chart.js, Lucide Icons, Canvas Confetti.
- **Backend:** Next.js API Routes (Serverless REST architecture).
- **Database & ORM:** PostgreSQL + Prisma ORM (with in-memory fallback for zero-dependency local portability).
- **Security:** Signed HTTP-Only JWT session cookies (`tfg_token`), crypto-secure OTP hashes, role-based authorization (`FARMER`, `BUYER`, `ADMIN`).
- **AI Engine:** Configurable provider abstraction (`services/ai.ts`) supporting Gemini 1.5, OpenAI, or the built-in High-Precision Agricultural Expert Rule Engine.
- **Telephony & Voice:** Twilio & Exotel compatible TwiML/IVR webhook architecture (`/api/voice/inbound`, `/api/voice/outbound`) + In-Browser Interactive Phone Simulator powered by the Web Speech API.

---

## 📦 Project Directory Structure

```
├── components/
│   ├── DemoBar.tsx               # Sticky Hackathon Scenario Controller
│   ├── DiseaseScanner.tsx        # AI Leaf Photo CV Scanner
│   ├── FertilizerCalculator.tsx  # Precision Soil-to-Dosage Calculator
│   ├── Footer.tsx                # Agronomic Footer with Hotline Info
│   ├── Layout.tsx                # Master Layout Wrapper
│   ├── MarketTicker.tsx          # Real-time APMC Mandi Scrolling Ticker
│   ├── MaskedCallModal.tsx       # Privacy-Protected Call Bridge Modal
│   ├── Navbar.tsx                # Navigation, Alert Drawer, Bilingual Switcher
│   ├── PhoneSimulator.tsx        # In-Browser Phone Keypad & Web Speech Simulator
│   ├── SymptomWizard.tsx         # Step-by-step Symptom Diagnostic Wizard
│   └── WeatherWidget.tsx         # 5-Day Radar Forecast & Storm Alerts
├── lib/
│   ├── auth.ts                   # JWT & Cookie helpers
│   ├── db.ts                     # Unified data layer with PostgreSQL & Memory fallback
│   └── prisma.ts                 # Prisma Client singleton
├── pages/
│   ├── _app.tsx                  # Next.js App Component with Tailwind & Global Styles
│   ├── index.tsx                 # Cinematic Landing Page with ROI Preview
│   ├── login.tsx                 # Mandatory Mobile + OTP Portal with Role Selector
│   ├── profile.tsx               # Farmer Profile Wizard & Soil Health Calibration
│   ├── dashboard.tsx             # Central Farmer Command Center
│   ├── crop-recommendation.tsx   # AI Crop Advisor with What-If Scenario Sliders
│   ├── fertilizer.tsx            # Precision Fertilizer & Nutrient Advisory
│   ├── market.tsx                # APMC Mandi Prices & 30-Day Historical Trends
│   ├── plant-doctor.tsx          # AI Plant Doctor (CV Scanner + Symptom Wizard)
│   ├── voice-assistant.tsx       # Two-Way AI Voice Calling System (IVR & Phone)
│   ├── marketplace.tsx           # Farm-to-Buyer Marketplace & Smart Selling
│   ├── ai-chat.tsx               # Full-screen AgriAI Conversational Assistant
│   ├── demo.tsx                  # 20-Step End-to-End Demo Storyboard
│   ├── admin/index.tsx           # Admin Platform Command Center
│   ├── buyer/index.tsx           # Wholesale Agro Buyer Procurement Portal
│   └── api/
│       ├── auth/                 # send-otp, verify-otp, logout, me
│       ├── farmer/               # profile, crops, fertilizer, disease-detect, weather
│       ├── market/               # prices, high-demand
│       ├── marketplace/          # products, request, contact
│       ├── voice/                # inbound, outbound, call-logs
│       ├── ai/                   # chat, ask
│       ├── demo/                 # simulate
│       └── admin/                # overview
├── prisma/
│   └── schema.prisma             # Complete Prisma Schema
├── services/
│   ├── ai.ts                     # AgriAI reasoning engine & LLM provider abstraction
│   ├── crop-recommender.ts       # Multi-variable crop suitability & profit algorithms
│   ├── disease-cv.ts             # Leaf vision pathology & symptom diagnosis rules
│   ├── fertilizer.ts             # Phenological stage nutrient dosage calculator
│   ├── market.ts                 # Mandi price feeds & high-demand matching
│   ├── sms.ts                    # SMS dispatcher with DEV mode and Twilio hooks
│   ├── telephony.ts              # Twilio TwiML generator, IVR routing, outbound voice alerts
│   └── weather.ts                # Agro-meteorological risk and 5-day radar forecasting
├── styles/
│   └── globals.css               # Design system tokens, glassmorphism, fonts
├── .env.example                  # Configurable environment variable template
└── README.md
```

---

## 🏃 Local Setup & Quick Start

### 1. Prerequisites
- **Node.js** v18.0 or higher
- **npm** v9.0 or higher

### 2. Installation
```bash
# Clone or navigate to the project directory
cd the-farmers-gamble

# Install dependencies
npm install
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

*(Note: The application has built-in mock/dev providers for SMS, Weather, Mandi Prices, and Voice Telephony so it runs with zero external API dependencies out of the box!)*

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Mandatory Mobile + OTP Authentication Flow

1. Navigate to `/login`.
2. Select your role (**Farmer**, **Buyer**, or **Admin**).
3. Enter your mobile number (Default sample: `+91 98765 43210`).
4. Click **"Send 6-Digit OTP"**.
5. In development mode (`DEV_OTP_ENABLED=true`), the generated code is safely logged to the console and displayed in the **Quick-Fill** box.
6. Enter the OTP code and click **"Verify OTP & Enter"**.
7. The backend verifies the SHA-256 hash, enforces rate limits, creates the user session, and issues a signed HTTP-Only JWT cookie.

---

## 📞 Normal-Phone Farmer Experience (Voice AI & IVR)

Farmers without smartphones or internet access can use the platform over ordinary voice phone calls:

### Inbound IVR Menu (Dial +91 80 4719 5000):
- **Press 1:** APMC Mandi Market Prices (e.g. Groundnut modal rate in Anantapur)
- **Press 2:** Weather & Storm Risk Forecasts
- **Press 3:** AI Crop Suitability Recommendations
- **Press 4:** Fertilizer Dosage Calculations
- **Press 5:** Plant Disease Assistance
- **Press 6:** Farm Marketplace & Active Buyer Bids
- **Press 0:** Talk directly with the AgriAI Voice Assistant in English or Telugu

### Proactive Outbound Alerts:
The platform automatically places outgoing telephone calls to registered farmers during critical agricultural events:
- ⛈️ **Storm Warnings:** "42mm rainfall expected tomorrow in Anantapur. Please check field drainage."
- 📈 **Price Surges:** "Groundnut rates rose by +₹3.50/kg in Anantapur Mandi today."
- 🧪 **Fertilizer Reminders:** "Your 45-day Gypsum top-dressing is due in 3 days."
- 🛒 **Buyer Bids:** "Sri Venkateswara Agro offered ₹84.50/kg for your 800 kg harvest."

---

## 🧪 Complete 20-Step Hackathon Verification Story

Navigate to `/demo` to view and execute the complete 20-step storyboard:

1. **Farmer opens app** (`/`)
2. **Enters mobile number** (`+91 98765 43210`)
3. **OTP is sent via SMS** (Crypto SHA-256 hash stored)
4. **Farmer enters OTP** (Verified against backend)
5. **Account is verified** (JWT session cookie established)
6. **Farmer creates profile** (`/profile`)
7. **Adds 3 acres + Groundnut + Soil NPK/pH data** (Red Sandy Loam, pH 6.5)
8. **Dashboard displays personalized data** (`/dashboard`)
9. **AI recommends fertilizer dosage** (`/fertilizer` — DAP, Urea, Potash, Gypsum)
10. **Market page shows price & trend** (`/market` — ₹86.50/kg, Rising)
11. **Farmer uploads diseased leaf photo** (`/plant-doctor`)
12. **AI analyzes disease** (Tikka Leaf Spot 93.8% confidence + Mancozeb treatment)
13. **Weather risk appears** (42mm heavy rain warning in Anantapur)
14. **System triggers outbound AI voice call** (`/voice-assistant`)
15. **Farmer calls AI assistant via phone simulator** (DTMF 1-6 & 0)
16. **AI answers contextually using farmer profile** (Bilingual English & Telugu)
17. **Farmer lists 800 kg Groundnut** (`/marketplace` — Smart Selling 1-click pre-fill)
18. **Buyer discovers listing** (`/buyer`)
19. **Buyer sends purchase offer** (₹84.50/kg)
20. **Farmer & Buyer communicate via protected masked call** (+91 80 4719 XXXX)

---

## 🛡️ Security & Privacy Architecture

- **Mandatory OTP Verification:** No backdoor bypasses; every session requires verified mobile authorization.
- **Privacy-Protected Masked Calling:** Farmers and wholesale buyers connect via platform-routed virtual proxy numbers without exposing personal cell numbers.
- **Role-Based Access Control:** Strict permission segregation between `FARMER`, `BUYER`, and `ADMIN` endpoints.
- **Safe Secrets Handling:** All external keys are managed strictly on the server through environment variables.

---

## 📜 Agricultural & Legal Disclaimer

> *AI recommendations generated by The Farmer's Gamble are agronomic guidance estimates based on historical yields, soil chemistry parameters, and APMC market feeds. Farmers should confirm critical chemical and financial decisions with a certified local agricultural officer or soil testing laboratory.*

---

**THE FARMER'S GAMBLE** — *Turn uncertainty into better farming decisions.*
