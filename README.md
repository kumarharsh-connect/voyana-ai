# ✈️ Voyana AI

**Voyana AI** is an AI-powered travel itinerary platform that generates personalized, structured, and map-enriched travel plans.  
It goes beyond plain text by organizing trips into time-based activities, adding local tips, enriching locations with real-world coordinates, and exporting itineraries as beautiful PDFs.

🔗 **Live Demo:** https://voyana-ai.vercel.app

---

## ✨ Features

- 🧠 **AI-Generated Itineraries**
  - Day-wise activities
  - Clear descriptions
  - Balanced pacing

- 🕒 **Time Blocked Plans**
  - Morning / Afternoon / Evening segmentation
  - Improves readability & planning

- 💡 **Local Travel Tips**
  - One practical, location-specific tip per day

- 🗺️ **Map-Enriched Activities**
  - Real latitude/longitude
  - Accurate addresses
  - Distance validation from destination

- 📄 **One-Click PDF Export**
  - Professionally styled itinerary PDFs
  - Includes overview, time blocks & local tips

- 🔐 **Authentication**
  - Powered by Clerk
  - Secure user-specific trips

- ⚡ **Rate Limiting**
  - Protects AI endpoints from abuse

- 🎨 **Modern UI/UX**
  - Tailwind CSS
  - Component-driven design
  - Smooth transitions & loading states

---

## 🧩 Tech Stack

### Frontend
- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- **Lucide Icons**

### Backend & Infrastructure
- **Next.js API Routes**
- **Prisma ORM**
- **PostgreSQL**
- **Upstash Redis** (rate limiting)
- **Clerk Authentication**
- **Vercel Deployment**

### AI & Integrations
- **OpenAI API** – itinerary generation & enrichment
- **Geoapify API** – geocoding & maps
- **Unsplash API** – destination images
- **pdf-lib** – PDF generation

---

## 🧠 How Voyana AI Works

1. **Base Itinerary Generation**  
   AI generates a strict, schema-driven itinerary (days & activities).

2. **Map Enrichment**  
   Activities are enriched with real-world locations using geocoding and distance validation.

3. **UX Enrichment**  
   AI refines the itinerary by:
   - Assigning time blocks
   - Adding local tips
   - Preserving existing locations

4. **Persistence & Export**  
   - Stored in PostgreSQL
   - Exported as a styled PDF

This multi-step pipeline ensures **reliable AI outputs** and a strong user experience.

---

## 📂 Project Structure (Simplified)

app/

├── (app)          # Authenticated app routes (trips, onboarding, dashboard)

├── (auth)         # Authentication routes (Clerk)

├── (marketing)    # Landing & marketing pages

├── api/            # Backend API routes

├── layout.tsx      # Root layout

├── loading.tsx     # Global loading state

├── not-found.tsx   # 404 page

└── globals.css     # Global styles


lib/

├── ai/             # AI prompts, itinerary generation & enrichment

├── actions/        # Server actions (PDF export, trip actions)

├── maps/           # Geocoding & map enrichment logic

├── pdf/            # PDF generation logic

├── trips/          # Trip-related business logic

├── format/         # Formatting helpers

├── guards/         # Auth & access guards

├── queries/        # Database queries

├── ui/             # Shared UI helpers

├── prisma.ts       # Prisma client

├── rate-limit.ts   # API rate limiting

└── utils.ts        # Utility helpers


prisma/

└── schema.prisma   # Database schema


public/

├── hero/           # Landing page assets

├── feature/        # Feature illustrations

├── destinations/  # Destination images

├── steps/          # Onboarding visuals

└── ui/             # UI assets

---

## 🔐 Environment Variables

Create a `.env` file and configure the following:

```env
OPENAI_API_KEY=

GEOAPIFY_API_KEY=
UNSPLASH_ACCESS_KEY=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

DATABASE_URL=

MUX_TOKEN_ID=
MUX_TOKEN_SECRET=

⚠️ Authentication is intentionally kept in development mode since this is a portfolio project.

🛠️ Running Locally
git clone https://github.com/your-username/voyana-ai.git
cd voyana-ai

npm install
npx prisma generate
npx prisma migrate dev

npm run dev
App will be available at:
👉 http://localhost:3000

