# ✈️ Voyana AI

**Voyana AI** is an AI-powered travel itinerary platform that generates personalized, structured, and map-enriched travel plans.  
It goes beyond plain text by organizing trips into time-based activities, adding local tips, enriching locations with real-world coordinates, and exporting itineraries as beautiful PDFs.

🔗 **Live Demo:** https://voyana-ai.vercel.app

---

## 🚀 Features

- 🧠 **AI-generated itineraries** with structured JSON output  
- ⏰ **Time-based planning** (Morning / Afternoon / Evening)  
- 💡 **Local travel tips** for better on-ground experience  
- 🗺️ **Map enrichment** with real-world geolocation data  
- 📄 **PDF export** for offline and shareable itineraries  
- 🔐 **Authentication & protected routes** (Clerk)  
- 🚦 **Rate limiting** to prevent abuse  
- ☁️ **Deployed on Vercel**

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

src/
├── app/ # App router pages & layouts
├── components/ # Reusable UI components
├── lib/
│ ├── ai/ # AI prompts & enrichment logic
│ ├── maps/ # Geocoding & distance logic
│ ├── prisma/ # Prisma client
│ ├── rate-limit/ # Redis rate limiting
│ └── actions/ # Server actions
├── styles/ # Global styles
└── utils/ # Helpers & formatters

yaml
Copy code

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
bash
Copy code
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run dev server
npm run dev
App will be available at:
👉 http://localhost:3000
