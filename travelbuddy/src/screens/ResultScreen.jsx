import React, { useState } from "react";
import {
  MapPin, Wallet, Sparkles, Utensils, Plane, Train, Bus, Ship,
  Hotel, Star, ChevronDown, ChevronUp, Clock, Camera, Flame,
  Calendar, Navigation, Sun, CloudSun, Thermometer, Wifi,
  Phone, Globe, Heart, Share2, Download, CheckCircle, Info,
  ArrowRight, DollarSign, Users, AlertTriangle, Lightbulb
} from "lucide-react";

// Images and Data from TripPlannerResult.tsx
const heroImage = "https://images.unsplash.com/photo-1540660235365-083e8894cec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUaGFpbGFuZCUyMHRlbXBsZSUyMEJhbmdrb2slMjB0cmF2ZWx8ZW58MXx8fHwxNzcyODA1NzY5fDA&ixlib=rb-4.1.0&q=80&w=1080";
const foodImage = "https://images.unsplash.com/photo-1758346971174-9657d853e6fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUaGFpbGFuZCUyMHN0cmVldCUyMGZvb2QlMjBsb2NhbCUyMGN1aXNpbmV8ZW58MXx8fHwxNzcyODA1NzY5fDA&ixlib=rb-4.1.0&q=80&w=1080";
const hotelImage = "https://images.unsplash.com/photo-1696584776164-e0ca9ac8ff24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUaGFpbGFuZCUyMGhvdGVsJTIwcmVzb3J0JTIwYWNjb21tb2RhdGlvbnxlbnwxfHx8fDE3NzI4MDU3NzB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const islandImage = "https://images.unsplash.com/photo-1622374634412-f74966ee855a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQaGklMjBQaGklMjBpc2xhbmRzJTIwVGhhaWxhbmQlMjBhdHRyYWN0aW9ufGVufDF8fHx8MTc3MjgwNTc3MHww&ixlib=rb-4.1.0&q=80&w=1080";
const nightMarketImage = "https://images.unsplash.com/photo-1672590492193-bd569d22a6c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDaGlhbmclMjBNYWklMjBuaWdodCUyMG1hcmtldCUyMFRoYWlsYW5kfGVufDF8fHx8MTc3MjgwNTc3M3ww&ixlib=rb-4.1.0&q=80&w=1080";
const palaceImage = "https://images.unsplash.com/photo-1679341778859-ed9a630b36c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCYW5na29rJTIwZ3JhbmR8ZW58MXx8fHwxNzcyODA1Nzc0fDA&ixlib=rb-4.1.0&q=80&w=1080";

const itinerary = [
  {
    day: 1,
    title: "Arrival in Bangkok",
    theme: "City Arrival & Temple Hopping",
    activities: [
      { time: "09:00 AM", activity: "Land at Suvarnabhumi Airport, check-in at hotel", icon: "✈️" },
      { time: "12:00 PM", activity: "Lunch at a local Thai restaurant — Tom Yum & Pad Thai", icon: "🍜" },
      { time: "02:00 PM", activity: "Visit Wat Phra Kaew (Temple of the Emerald Buddha)", icon: "🛕" },
      { time: "04:30 PM", activity: "Explore the Grand Palace complex", icon: "🏛️" },
      { time: "07:00 PM", activity: "Dinner at Asiatique The Riverfront", icon: "🌆" },
      { time: "09:00 PM", activity: "Evening stroll along the Chao Phraya River", icon: "🌙" },
    ],
  },
  {
    day: 2,
    title: "Bangkok Temples & Markets",
    theme: "Culture & Local Life",
    activities: [
      { time: "08:00 AM", activity: "Breakfast at local street stall — Jok (rice porridge)", icon: "🌅" },
      { time: "09:30 AM", activity: "Wat Arun (Temple of Dawn) by boat ferry", icon: "🛕" },
      { time: "11:30 AM", activity: "Explore Chinatown (Yaowarat) — street food & temples", icon: "🏮" },
      { time: "01:00 PM", activity: "Lunch at Or Tor Kor Market", icon: "🍱" },
      { time: "03:00 PM", activity: "Chatuchak Weekend Market for souvenirs & local crafts", icon: "🛍️" },
      { time: "07:30 PM", activity: "Rooftop dinner with panoramic Bangkok views", icon: "🌃" },
    ],
  },
  {
    day: 3,
    title: "Travel to Chiang Mai",
    theme: "Northern Culture & Temples",
    activities: [
      { time: "07:00 AM", activity: "Morning flight or overnight train to Chiang Mai", icon: "🚂" },
      { time: "11:00 AM", activity: "Check-in and freshen up at guesthouse", icon: "🏨" },
      { time: "12:30 PM", activity: "Khao Soi lunch — Northern Thai signature dish", icon: "🍛" },
      { time: "02:00 PM", activity: "Doi Suthep Temple trek with mountain views", icon: "⛰️" },
      { time: "05:00 PM", activity: "Old City walking tour inside the moat", icon: "🚶" },
      { time: "08:00 PM", activity: "Sunday Walking Street Night Market", icon: "🌙" },
    ],
  },
  {
    day: 4,
    title: "Chiang Mai Cultural Immersion",
    theme: "Ethical Experiences & Local Crafts",
    activities: [
      { time: "07:30 AM", activity: "Monk blessing & alms-giving ceremony at Wat Suan Dok", icon: "🙏" },
      { time: "10:00 AM", activity: "Elephant Sanctuary visit (ethical, no riding)", icon: "🐘" },
      { time: "01:00 PM", activity: "Lunch at the sanctuary — traditional hill tribe meal", icon: "🥘" },
      { time: "03:30 PM", activity: "Cooking class — learn to make Thai curry from scratch", icon: "👨‍🍳" },
      { time: "07:00 PM", activity: "Dinner with cooking class creations", icon: "🍽️" },
    ],
  },
  {
    day: 5,
    title: "Fly to Phuket / Krabi",
    theme: "Beaches & Island Vibes",
    activities: [
      { time: "08:00 AM", activity: "Morning flight to Phuket or Krabi", icon: "✈️" },
      { time: "11:30 AM", activity: "Seafood lunch at the beachside shack", icon: "🦞" },
      { time: "01:00 PM", activity: "Check-in at beachfront resort", icon: "🏖️" },
      { time: "03:00 PM", activity: "Relax at Patong or Railay Beach", icon: "🌊" },
      { time: "06:00 PM", activity: "Sunset cruise around the bay", icon: "🛥️" },
      { time: "08:00 PM", activity: "Night market dinner & live music", icon: "🎵" },
    ],
  },
  {
    day: 6,
    title: "Island Hopping",
    theme: "Phi Phi Islands & Snorkeling",
    activities: [
      { time: "07:00 AM", activity: "Early morning speedboat to Phi Phi Islands", icon: "🚤" },
      { time: "09:00 AM", activity: "Snorkeling at coral reefs — see tropical fish", icon: "🤿" },
      { time: "12:00 PM", activity: "Grilled seafood BBQ lunch on the beach", icon: "🔥" },
      { time: "02:00 PM", activity: "James Bond Island photo stop", icon: "📸" },
      { time: "04:30 PM", activity: "Return to mainland — sunset views", icon: "🌅" },
      { time: "07:30 PM", activity: "Thai massage & evening spa treatment", icon: "💆" },
    ],
  },
  {
    day: 7,
    title: "Departure Day",
    theme: "Last Sights & Farewell",
    activities: [
      { time: "08:00 AM", activity: "Final Thai breakfast — Roti with curry", icon: "🥞" },
      { time: "10:00 AM", activity: "Last-minute shopping for souvenirs", icon: "🛍️" },
      { time: "12:00 PM", activity: "Check out and head to airport", icon: "🧳" },
      { time: "03:00 PM", activity: "Fly home with beautiful memories", icon: "✈️" },
    ],
  },
];

const accommodations = [
  {
    name: "Mandarin Oriental Bangkok",
    type: "Luxury Heritage Hotel",
    rating: 4.9,
    price: "฿4,500/night",
    location: "Bangkok Riverside",
    highlights: ["River views", "Historic property", "World-class spa"],
    image: hotelImage,
  },
  {
    name: "137 Pillars House Chiang Mai",
    type: "Boutique Resort",
    rating: 4.8,
    price: "฿3,200/night",
    location: "Chiang Mai Old City",
    highlights: ["Colonial style", "Pool villa", "Cultural tours"],
    image: nightMarketImage,
  },
  {
    name: "Rayavadee Krabi",
    type: "Beach Resort",
    rating: 4.9,
    price: "฿6,000/night",
    location: "Railay Beach, Krabi",
    highlights: ["Private beach", "Sea view pavilions", "Snorkeling gear"],
    image: islandImage,
  },
];

const cuisines = [
  { name: "Pad Thai", description: "Stir-fried rice noodles with shrimp, egg, tofu & tamarind", spice: "Mild", price: "฿80-150", must: true },
  { name: "Tom Yum Goong", description: "Spicy-sour prawn soup with lemongrass & kaffir lime", spice: "Hot", price: "฿120-200", must: true },
  { name: "Green Curry (Gaeng Keow Wan)", description: "Coconut milk curry with chicken, Thai basil & vegetables", spice: "Medium", price: "฿100-180", must: true },
  { name: "Khao Soi", description: "Northern Thai egg noodle curry soup — Chiang Mai specialty", spice: "Mild", price: "฿80-120", must: true },
  { name: "Som Tum (Papaya Salad)", description: "Green papaya salad with fish sauce, chili & peanuts", spice: "Hot", price: "฿60-100", must: false },
  { name: "Massaman Curry", description: "Rich, mild curry with potatoes, peanuts & tender meat", spice: "Mild", price: "฿120-200", must: false },
];

const attractions = [
  { name: "Wat Phra Kaew", city: "Bangkok", type: "Temple", rating: 4.9, entry: "฿500", duration: "2-3 hrs", image: palaceImage },
  { name: "Grand Palace", city: "Bangkok", type: "Historical", rating: 4.8, entry: "Included", duration: "2 hrs", image: heroImage },
  { name: "Doi Suthep Temple", city: "Chiang Mai", type: "Temple", rating: 4.7, entry: "฿30", duration: "2 hrs", image: nightMarketImage },
  { name: "Phi Phi Islands", city: "Krabi/Phuket", type: "Nature", rating: 4.9, entry: "฿800 (boat)", duration: "Full day", image: islandImage },
];

const transportModes = [
  {
    icon: <Plane className="w-6 h-6" />,
    title: "By Air",
    subtitle: "International Flights",
    description: "Fly into Suvarnabhumi (BKK) or Don Mueang (DMK). Major airlines like Emirates, Thai Airways, IndiGo, and Singapore Airlines offer regular flights.",
    tips: ["Book 2–3 months in advance for best prices", "Bangkok has 2 international airports — check which one your flight uses", "AirAsia & Thai Lion Air for budget domestic flights"],
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
  },
  {
    icon: <Train className="w-6 h-6" />,
    title: "By Train",
    subtitle: "Within Thailand",
    description: "Thailand has an extensive railway network. Overnight trains between Bangkok and Chiang Mai are scenic and comfortable for budget travelers.",
    tips: ["Book at railway.co.th or 12Go.Asia", "Overnight sleeper trains save hotel costs", "First-class AC coaches available at mid-range price"],
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
  },
  {
    icon: <Bus className="w-6 h-6" />,
    title: "By Road",
    subtitle: "Buses & Tuk-Tuks",
    description: "VIP buses connect major cities. Within cities, use tuk-tuks, metered taxis, or Grab app for convenient and affordable rides.",
    tips: ["Use Grab app (Thailand's Uber) — safer & metered", "Agree on price with tuk-tuk before boarding", "Songthaew (shared pickup trucks) are budget-friendly in Chiang Mai"],
    color: "from-orange-500 to-amber-600",
    bg: "bg-orange-50",
  },
  {
    icon: <Ship className="w-6 h-6" />,
    title: "By Ferry",
    subtitle: "Islands & Rivers",
    description: "For Phuket, Krabi, and the islands, ferries and speedboats are the main mode. Chao Phraya Express Boats are great for exploring Bangkok.",
    tips: ["Book island ferries in advance during peak season", "Speedboats are faster but pricier", "Life jackets are mandatory — ensure they are provided"],
    color: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-50",
  },
];

const travelTips = [
  { icon: "🧴", tip: "Always carry insect repellent & sunscreen SPF 50+" },
  { icon: "👘", tip: "Cover shoulders & knees when visiting temples" },
  { icon: "💊", tip: "Bring basic medications — anti-diarrhea, antihistamines" },
  { icon: "💳", tip: "Carry Thai Baht cash — many places don't accept cards" },
  { icon: "📱", tip: "Get a Thai SIM card at the airport for cheap data" },
  { icon: "🙏", tip: "Always remove shoes before entering temples and homes" },
  { icon: "🌡️", tip: "Best time to visit: November to April (cool & dry)" },
  { icon: "⚠️", tip: "Never disrespect the royal family — it's a legal offense" },
];

// Removed Type Annotations for JavaScript
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${s <= Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
        />
      ))}
      <span className="text-xs text-gray-600 ml-1">{rating}</span>
    </div>
  );
}

// Removed Type Annotations for JavaScript
function SpiceBadge({ spice }) {
  const colors = {
    Mild: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hot: "bg-red-100 text-red-700",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${colors[spice] || "bg-gray-100 text-gray-600"}`}>
      {spice === "Hot" ? "🌶️" : spice === "Medium" ? "🌶️" : "🍃"} {spice}
    </span>
  );
}

// Renamed and changed to default export for ResultScreen.jsx
export default function ResultScreen() {
  const [openDay, setOpenDay] = useState(1);
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner - Exact Reference */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={heroImage} alt="Thailand" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
            <Navigation className="w-4 h-4" />
            <span>AI-Generated Trip Plan</span>
          </div>
          <h1 className="text-white text-3xl md:text-5xl mb-2" style={{ fontWeight: 700 }}>
            🇹🇭 Thailand Adventure
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">
            A 7-day cultural journey through Bangkok, Chiang Mai & the islands — curated for mid-range travelers
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["7 Days", "3 Cities", "Mid-range Budget", "Cultural"].map((tag) => (
              <span key={tag} className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/30">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setSaved(!saved)}
            className={`p-2.5 rounded-full backdrop-blur-sm border border-white/30 transition-all ${saved ? "bg-red-500 text-white" : "bg-white/20 text-white"}`}
          >
            <Heart className={`w-4 h-4 ${saved ? "fill-white" : ""}`} />
          </button>
          <button className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Itinerary and Details */}
        <div className="flex-1 space-y-10">

          {/* Weather Stats Banner */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <CloudSun className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-xs text-gray-500">Best Season</p>
                <p className="text-sm text-gray-800" style={{ fontWeight: 600 }}>Nov – Apr (Cool & Dry)</p>
              </div>
            </div>
            <div className="w-px h-8 bg-amber-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-xs text-gray-500">Avg Temperature</p>
                <p className="text-sm text-gray-800" style={{ fontWeight: 600 }}>26°C – 34°C</p>
              </div>
            </div>
            <div className="w-px h-8 bg-amber-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-xs text-gray-500">Current Condition</p>
                <p className="text-sm text-gray-800" style={{ fontWeight: 600 }}>Perfect Travel Weather</p>
              </div>
            </div>
            <div className="ml-auto">
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full" style={{ fontWeight: 600 }}>
                ✅ Great Time to Visit
              </span>
            </div>
          </div>

          {/* Transport Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Navigation className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl text-gray-900" style={{ fontWeight: 700 }}>How to Reach Thailand</h2>
                <p className="text-sm text-gray-500">Multiple ways to get there and get around</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {transportModes.map((mode) => (
                <div key={mode.title} className={`${mode.bg} border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-11 h-11 bg-gradient-to-br ${mode.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                      {mode.icon}
                    </div>
                    <div>
                      <h3 className="text-gray-900" style={{ fontWeight: 600 }}>{mode.title}</h3>
                      <p className="text-xs text-gray-500">{mode.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{mode.description}</p>
                  <ul className="space-y-1.5">
                    {mode.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Accommodations Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Hotel className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl text-gray-900" style={{ fontWeight: 700 }}>Best Accommodations</h2>
                <p className="text-sm text-gray-500">Curated stays for cultural mid-range travelers</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5">
              {accommodations.map((hotel) => (
                <div key={hotel.name} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col sm:flex-row">
                  <div className="sm:w-48 h-40 sm:h-auto flex-shrink-0">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <h3 className="text-gray-900" style={{ fontWeight: 600 }}>{hotel.name}</h3>
                        <p className="text-xs text-purple-600 mb-1">{hotel.type}</p>
                      </div>
                      <span className="text-sm text-gray-800 bg-gray-100 px-2 py-1 rounded-lg whitespace-nowrap" style={{ fontWeight: 600 }}>
                        {hotel.price}
                      </span>
                    </div>
                    <StarRating rating={hotel.rating} />
                    <div className="flex items-center gap-1 mt-2 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">{hotel.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hotel.highlights.map((h) => (
                        <span key={h} className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">{h}</span>
                      ))}
                    </div>
                    <button className="mt-3 text-xs text-blue-600 flex items-center gap-1 hover:gap-2 transition-all" style={{ fontWeight: 500 }}>
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cuisine Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Utensils className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl text-gray-900" style={{ fontWeight: 700 }}>Local Cuisine</h2>
                <p className="text-sm text-gray-500">Must-try dishes for non-veg food lovers</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden mb-6">
              <img src={foodImage} alt="Thai food" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                <p className="text-white text-sm">
                  🏆 Thailand ranks among the <strong>Top 5 food destinations</strong> globally. Expect bold flavors, aromatic herbs & fresh ingredients.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cuisines.map((dish) => (
                <div key={dish.name} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-gray-900" style={{ fontWeight: 600 }}>{dish.name}</h3>
                    {dish.must && (
                      <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full ml-2 whitespace-nowrap" style={{ fontWeight: 500 }}>
                        Must Try
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <SpiceBadge spice={dish.spice} />
                    <span className="text-xs text-gray-600" style={{ fontWeight: 500 }}>Avg: {dish.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Attractions Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Camera className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl text-gray-900" style={{ fontWeight: 700 }}>Must-Visit Attractions</h2>
                <p className="text-sm text-gray-500">Top-rated experiences and activities</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {attractions.map((place) => (
                <div key={place.name} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
                  <div className="relative h-44 overflow-hidden">
                    <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-2 py-1 rounded-full" style={{ fontWeight: 500 }}>
                        {place.type}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-amber-400 text-white text-xs px-2 py-1 rounded-full" style={{ fontWeight: 600 }}>
                        ⭐ {place.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-900 mb-1" style={{ fontWeight: 600 }}>{place.name}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {place.city}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {place.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5" />
                        Entry: {place.entry}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Day-wise Accordion Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl text-gray-900" style={{ fontWeight: 700 }}>Day-wise Itinerary</h2>
                <p className="text-sm text-gray-500">Your complete 7-day Thailand roadmap</p>
              </div>
            </div>
            <div className="space-y-3">
              {itinerary.map((day) => {
                const isOpen = openDay === day.day;
                return (
                  <div
                    key={day.day}
                    className={`bg-white border rounded-2xl overflow-hidden transition-all ${isOpen ? "border-green-300 shadow-md" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <button
                      onClick={() => setOpenDay(isOpen ? null : day.day)}
                      className="w-full flex items-center gap-4 p-5 text-left"
                    >
                      <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${isOpen ? "bg-green-500 text-white" : "bg-green-50 text-green-600"}`}>
                        <span className="text-xs" style={{ fontWeight: 500 }}>Day</span>
                        <span className="text-lg leading-none" style={{ fontWeight: 700 }}>{day.day}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900" style={{ fontWeight: 600 }}>{day.title}</h3>
                        <p className="text-xs text-gray-500">{day.theme}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 flex-shrink-0">
                        <span>{day.activities.length} activities</span>
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5">
                        <div className="border-t border-gray-100 pt-4 space-y-3">
                          {day.activities.map((act, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                                <span className="text-xs text-gray-400 w-20 text-right leading-none">{act.time}</span>
                              </div>
                              <div className="relative flex flex-col items-center">
                                <div className="w-8 h-8 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center text-base flex-shrink-0">
                                  {act.icon}
                                </div>
                                {i < day.activities.length - 1 && (
                                  <div className="w-0.5 h-4 bg-green-100 mt-1" />
                                )}
                              </div>
                              <p className="text-sm text-gray-700 pt-1 leading-relaxed">{act.activity}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quick Tips Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-xl text-gray-900" style={{ fontWeight: 700 }}>Travel Tips & Essentials</h2>
                <p className="text-sm text-gray-500">Things to know before you go</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {travelTips.map((t, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 hover:shadow-sm transition-shadow">
                  <span className="text-xl flex-shrink-0">{t.icon}</span>
                  <p className="text-sm text-gray-700 leading-relaxed">{t.tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Emergency Section */}
          <section className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h2 className="text-lg text-gray-900" style={{ fontWeight: 700 }}>Emergency & Useful Contacts</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Tourist Police", number: "1155", icon: "🚓" },
                { label: "Ambulance", number: "1554", icon: "🚑" },
                { label: "TAT Helpline", number: "1672", icon: "ℹ️" },
                { label: "Embassy (India)", number: "+66 2 258 0300", icon: "🏛️" },
              ].map((c) => (
                <div key={c.label} className="bg-white rounded-xl p-3 text-center border border-red-100">
                  <div className="text-2xl mb-1">{c.icon}</div>
                  <p className="text-xs text-gray-500 mb-1">{c.label}</p>
                  <p className="text-sm text-red-600" style={{ fontWeight: 700 }}>{c.number}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Sidebar: Summary and Tools */}
        <div className="w-full lg:w-80 space-y-5 flex-shrink-0">
          <div className="sticky top-6 space-y-5">

            {/* Trip Summary Card */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-white" style={{ fontWeight: 700 }}>Trip Summary</h3>
                  <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">AI Curated</span>
                </div>
                <p className="text-white/70 text-xs">Your personalized travel plan</p>
              </div>
              <div className="p-5 space-y-4">
                {[
                  { icon: "📍", label: "Destination", value: "Thailand", sub: "Bangkok · Chiang Mai · Krabi" },
                  { icon: "💰", label: "Budget", value: "Mid-Range", sub: "฿3,000–6,000/night est." },
                  { icon: "✨", label: "Style", value: "Cultural", sub: "Temples, markets & heritage" },
                  { icon: "🍽️", label: "Food Pref.", value: "Non-Veg", sub: "Seafood, meats & Thai curries" },
                  { icon: "📅", label: "Duration", value: "7 Days", sub: "Nov – Apr recommended" },
                  { icon: "👤", label: "Trip Type", value: "Solo / Couple", sub: "Best for 1–2 travelers" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-sm text-gray-900" style={{ fontWeight: 600 }}>{item.value}</p>
                      <p className="text-xs text-gray-400 truncate">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 pb-5">
                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm py-3 rounded-xl hover:opacity-90 transition-opacity font-semibold" style={{ fontWeight: 600 }}>
                  Book This Trip
                </button>
              </div>
            </div>

            {/* Budget Visualization Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="w-5 h-5 text-green-600" />
                <h3 className="text-gray-900" style={{ fontWeight: 700 }}>Budget Breakdown</h3>
              </div>
              <div className="space-y-3">
                {[
                  { category: "Accommodation", amount: "฿21,000", percent: 35, color: "bg-purple-400" },
                  { category: "Flights & Transport", amount: "฿15,000", percent: 25, color: "bg-blue-400" },
                  { category: "Food & Dining", amount: "฿9,000", percent: 15, color: "bg-orange-400" },
                  { category: "Activities & Entry", amount: "฿7,200", percent: 12, color: "bg-red-400" },
                  { category: "Shopping & Misc", amount: "฿7,800", percent: 13, color: "bg-teal-400" },
                ].map((b) => (
                  <div key={b.category}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">{b.category}</span>
                      <span className="text-gray-800" style={{ fontWeight: 600 }}>{b.amount}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.percent}%` }} />
                    </div>
                  </div>
                ))}
                <div className="border-t border-gray-100 pt-3 flex justify-between">
                  <span className="text-sm text-gray-600" style={{ fontWeight: 600 }}>Total Estimate</span>
                  <span className="text-sm text-green-600" style={{ fontWeight: 700 }}>฿60,000</span>
                </div>
              </div>
            </div>

            {/* Quick Country Info Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-gray-900 mb-4" style={{ fontWeight: 700 }}>Quick Country Info</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { icon: <Globe className="w-4 h-4" />, label: "Currency", value: "Thai Baht (฿)" },
                  { icon: <Phone className="w-4 h-4" />, label: "Calling Code", value: "+66" },
                  { icon: <Wifi className="w-4 h-4" />, label: "Internet", value: "Fast & Cheap" },
                  { icon: <Users className="w-4 h-4" />, label: "Language", value: "Thai / English" },
                  { icon: <Flame className="w-4 h-4" />, label: "Religion", value: "Buddhism" },
                  { icon: <Info className="w-4 h-4" />, label: "Visa", value: "30-day on arrival" },
                ].map((q) => (
                  <div key={q.label} className="bg-gray-50 rounded-xl p-2.5">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                      {q.icon}
                      <span className="text-xs">{q.label}</span>
                    </div>
                    <p className="text-xs text-gray-800" style={{ fontWeight: 600 }}>{q.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Packing Checklist */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-gray-900 mb-4" style={{ fontWeight: 700 }}>Packig Checklist</h3>
              <div className="space-y-2">
                {[
                  "Lightweight cotton clothes",
                  "Temple-appropriate attire",
                  "Sunscreen & insect repellent",
                  "Waterproof sandals",
                  "Power adapter (Type A/B/C)",
                  "Cash in Thai Baht",
                  "Travel insurance docs",
                  "Portable power bank",
                ].map((item, i) => (
                  <label key={i} className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded accent-indigo-600" />
                    <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">{item}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}