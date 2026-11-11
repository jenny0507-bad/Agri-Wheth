import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, Wheat, Tractor, User, MessageSquare, Newspaper, 
  CloudSun, Mic, Search, Plus, MapPin, Star, 
  ArrowRight, LogIn, LogOut, Settings, Bell,
  Menu, X, Send, Camera, Paperclip, Phone, Video,
  TrendingUp, BookOpen, Droplets, Thermometer, Wind,
  ChevronRight, Languages, Volume2, Beaker, Map as MapIcon,
  Play, FileText, AlertTriangle, CheckCircle2, TrendingDown,
  Hammer, Wrench, Truck, Sprout, Recycle
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar,
  AreaChart, Area
} from 'recharts';
import { GoogleGenAI } from "@google/genai";
import { 
  User as UserType, Crop, Worker, NewsItem, ThemeMode, UserRole,
  CropIntelligence, SoilHealth, Machinery, AgriService, AgriShop
} from './types';
import { 
  CropIntelligenceCard, SoilHealthWidget, PricePredictionCard, 
  DiseaseWarningWidget, ChatInterface 
} from './components/Features';
import { 
  CropMarketplace, MachineryMarketplace, ServiceMarketplace 
} from './components/Marketplaces';

// --- Constants & Mock Data ---
const LOGO_URL = "https://picsum.photos/seed/krishisetu/200/200";

const WEATHER_DATA = {
  temp: 28,
  humidity: 65,
  rain: 10,
  condition: "Partly Cloudy"
};

const SOIL_DATA: SoilHealth = {
  nitrogen: 45,
  phosphorus: 60,
  potassium: 55,
  organicMatter: 3.5,
  ph: 6.8,
  moisture: 40
};

// --- Components ---

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-agri-green"
    >
      <motion.img 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        src={LOGO_URL}
        alt="KrishiSetu Logo"
        className="w-32 h-32 rounded-3xl shadow-2xl mb-6"
      />
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-4xl font-bold text-white mb-2"
      >
        KrishiSetu
      </motion.h1>
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-white/80 text-lg"
      >
        Connecting Farmers to the Future
      </motion.p>
    </motion.div>
  );
};

const LoginScreen = ({ onLogin }: { onLogin: (user: UserType) => void }) => {
  const [role, setRole] = useState<UserRole>('Farmer');
  const [showVoiceHelp, setShowVoiceHelp] = useState(false);

  const playVoiceHelp = () => {
    const messages = [
      "Voice help icon is on the right side of the app. Click it if you cannot read the text.",
      "वॉयસ हेल्प आइकन ऐप के दाईं ओर है। यदि आप टेक्स्ट नहीं पढ़ सकते हैं तो उस पर क्लिक करें।",
      "વોઈસ હેલ્પ આઈકોન એપની જમણી બાજુએ છે. જો તમે ટેક્સ્ટ વાંચી શકતા નથી તો તેના પર ક્લિક કરો."
    ];
    console.log("Playing voice help in English, Hindi, Gujarati");
    setShowVoiceHelp(true);
    setTimeout(() => setShowVoiceHelp(false), 5000);
  };

  useEffect(() => {
    playVoiceHelp();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-agri-green/10 to-white">
      <div className="absolute top-6 right-6">
        <button 
          onClick={playVoiceHelp}
          className="p-4 bg-agri-green text-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Volume2 size={32} />
        </button>
        {showVoiceHelp && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-16 top-0 w-48 bg-white p-3 rounded-xl shadow-xl text-xs border border-agri-green"
          >
            Voice help active. English, Hindi, Gujarati.
          </motion.div>
        )}
      </div>

      <img src={LOGO_URL} alt="Logo" className="w-24 h-24 rounded-2xl shadow-lg mb-8" />
      <h2 className="text-3xl font-bold text-agri-green mb-2">Welcome to KrishiSetu</h2>
      <p className="text-soil-brown mb-8">Empowering Agriculture with AI</p>

      <div className="w-full max-w-sm space-y-4">
        <div className="grid grid-cols-2 gap-3 mb-6">
          {(['Farmer', 'Buyer', 'Worker', 'Shipping'] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`p-3 rounded-xl text-sm font-medium transition-all ${
                role === r ? 'bg-agri-green text-white shadow-md' : 'bg-white text-agri-green border border-agri-green/20'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <button 
          onClick={() => onLogin({ id: 'u1', name: 'Rajesh Kumar', email: 'rajesh@example.com', role })}
          className="w-full py-4 bg-agri-green text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-agri-green/90"
        >
          <LogIn size={20} /> Login with Google
        </button>

        <button 
          onClick={() => onLogin({ id: 'guest', name: 'Guest Farmer', email: 'guest@example.com', role: 'Farmer' })}
          className="w-full py-4 bg-white text-agri-green border-2 border-agri-green rounded-2xl font-bold flex items-center justify-center gap-2"
        >
          <User size={20} /> Continue as Guest
        </button>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);
  const [activeTab, setActiveTab] = useState('Home');
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [crops, setCrops] = useState<Crop[]>([]);
  const [machinery, setMachinery] = useState<Machinery[]>([]);
  const [services, setServices] = useState<AgriService[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [cropIntel, setCropIntel] = useState<CropIntelligence[]>([]);
  const [shops, setShops] = useState<AgriShop[]>([]);
  const [activeChat, setActiveChat] = useState(false);

  useEffect(() => {
    if (user) {
      fetch('/api/crops').then(res => res.json()).then(setCrops);
      fetch('/api/machinery').then(res => res.json()).then(setMachinery);
      fetch('/api/services').then(res => res.json()).then(setServices);
      fetch('/api/workers').then(res => res.json()).then(setWorkers);
      fetch('/api/news').then(res => res.json()).then(setNews);
      fetch('/api/crop-intelligence').then(res => res.json()).then(setCropIntel);
      fetch('/api/shops').then(res => res.json()).then(setShops);
    }
  }, [user]);

  if (loading) return <SplashScreen onFinish={() => setLoading(false)} />;
  if (!user) return <LoginScreen onLogin={setUser} />;

  const renderContent = () => {
    switch (activeTab) {
      case 'Home': return <HomeDashboard user={user} crops={crops} news={news} setActiveTab={setActiveTab} />;
      case 'Sell Crops': return <CropMarketplace crops={crops} />;
      case 'Machinery': return <MachineryMarketplace machinery={machinery} />;
      case 'Services': return <ServiceMarketplace services={services} />;
      case 'Workers': return <WorkerMarketplace workers={workers} onChat={() => setActiveChat(true)} />;
      case 'AI Assistant': return <AIAssistant />;
      case 'Market News': return <NewsSection news={news} />;
      case 'Crop Intel': return <CropIntelligenceScreen intel={cropIntel} />;
      case 'Soil Health': return <SoilHealthScreen data={SOIL_DATA} />;
      case 'Shops': return <ShopMapScreen shops={shops} />;
      case 'Profile': return <ProfileScreen user={user} onLogout={() => setUser(null)} setTheme={setTheme} theme={theme} />;
      default: return <HomeDashboard user={user} crops={crops} news={news} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className={`flex flex-col h-screen overflow-hidden ${theme}`}>
      <main className="flex-1 overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-4"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {activeChat && <ChatInterface onBack={() => setActiveChat(false)} />}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-agri-green/10 px-4 py-3 flex justify-between items-center z-40">
        {[
          { name: 'Home', icon: Leaf },
          { name: 'Sell Crops', icon: Wheat },
          { name: 'Workers', icon: Tractor },
          { name: 'AI Assistant', icon: MessageSquare },
          { name: 'Market News', icon: Newspaper },
          { name: 'Profile', icon: User },
        ].map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === tab.name ? 'text-agri-green scale-110' : 'text-soil-brown/60'
            }`}
          >
            <div className={`p-2 rounded-full ${activeTab === tab.name ? 'bg-agri-green/10' : ''}`}>
              <tab.icon size={activeTab === tab.name ? 28 : 24} />
            </div>
            <span className="text-[10px] font-medium">{tab.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

// --- Dashboard Sub-components ---

const HomeDashboard = ({ user, crops, news, setActiveTab }: { user: UserType, crops: Crop[], news: NewsItem[], setActiveTab: (tab: string) => void }) => {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-agri-green">Namaste, {user.name}</h1>
          <p className="text-soil-brown text-sm">Welcome back to your farm</p>
        </div>
        <div className="flex gap-2">
          <div className="p-3 glass-card rounded-2xl text-agri-green shadow-sm"><CloudSun size={24} /></div>
          <div className="p-3 glass-card rounded-2xl text-agri-green shadow-sm"><Bell size={24} /></div>
        </div>
      </header>

      {/* Weather Widget */}
      <div className="bg-gradient-to-br from-agri-green to-agri-green/80 p-6 rounded-3xl text-white shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-white/80 text-sm">Current Weather</p>
            <h3 className="text-4xl font-bold">{WEATHER_DATA.temp}°C</h3>
            <p className="text-white/90 font-medium">{WEATHER_DATA.condition}</p>
          </div>
          <CloudSun size={64} className="text-wheat-gold" />
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
          <div className="flex flex-col items-center"><Droplets size={18} className="mb-1" /><span className="text-xs">{WEATHER_DATA.humidity}% Hum</span></div>
          <div className="flex flex-col items-center"><Wind size={18} className="mb-1" /><span className="text-xs">12 km/h</span></div>
          <div className="flex flex-col items-center"><Thermometer size={18} className="mb-1" /><span className="text-xs">{WEATHER_DATA.rain}% Rain</span></div>
        </div>
      </div>

      {/* Advanced AI Insights */}
      <div className="space-y-4">
        <PricePredictionCard cropName="Tomato" currentPrice={2200} prediction={18} />
        <DiseaseWarningWidget />
        <SoilHealthWidget data={SOIL_DATA} />
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { name: 'Crop Intel', icon: Sprout, tab: 'Crop Intel' },
          { name: 'Soil Health', icon: Beaker, tab: 'Soil Health' },
          { name: 'Machinery', icon: Tractor, tab: 'Machinery' },
          { name: 'Services', icon: Wrench, tab: 'Services' },
          { name: 'Shops', icon: MapIcon, tab: 'Shops' },
          { name: 'Education', icon: BookOpen, tab: 'Market News' }
        ].map(action => (
          <button 
            key={action.name} 
            onClick={() => setActiveTab(action.tab)}
            className="p-3 glass-card rounded-2xl flex flex-col items-center gap-2 shadow-sm active:scale-95 transition-transform"
          >
            <div className="p-2 bg-agri-green/10 rounded-xl text-agri-green"><action.icon size={20} /></div>
            <span className="text-[10px] font-bold text-center">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const CropIntelligenceScreen = ({ intel }: { intel: CropIntelligence[] }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-agri-green">Crop Intelligence</h2>
    {intel.map(crop => <CropIntelligenceCard key={crop.id} crop={crop} />)}
  </div>
);

const SoilHealthScreen = ({ data }: { data: SoilHealth }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-agri-green">Soil Intelligence</h2>
    <SoilHealthWidget data={data} />
    <div className="glass-card p-5 rounded-3xl shadow-sm">
      <h3 className="font-bold text-agri-green mb-4">Nutrient Simulation (Digital Twin)</h3>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={[
            { month: 'Mar', n: 45, p: 60, k: 55 },
            { month: 'Apr', n: 42, p: 58, k: 54 },
            { month: 'May', n: 38, p: 55, k: 52 },
            { month: 'Jun', n: 35, p: 52, k: 50 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="month" hide />
            <YAxis hide />
            <Tooltip />
            <Line type="monotone" dataKey="n" stroke="#2E7D32" strokeWidth={2} />
            <Line type="monotone" dataKey="p" stroke="#F9A825" strokeWidth={2} />
            <Line type="monotone" dataKey="k" stroke="#8D6E63" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-soil-brown/60 mt-4">Predicted nutrient depletion over the next 4 months based on current crop cycle.</p>
    </div>
  </div>
);

const ShopMapScreen = ({ shops }: { shops: AgriShop[] }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-agri-green">Nearby Agri Shops</h2>
    <div className="h-64 bg-agri-green/5 rounded-3xl border-2 border-dashed border-agri-green/20 flex flex-col items-center justify-center text-agri-green/40">
      <MapIcon size={48} className="mb-2" />
      <p className="font-bold">Interactive Map View</p>
    </div>
    <div className="space-y-4">
      {shops.map(shop => (
        <div key={shop.id} className="glass-card p-4 rounded-3xl flex justify-between items-center shadow-sm">
          <div>
            <h4 className="font-bold text-agri-green">{shop.name}</h4>
            <p className="text-xs text-soil-brown/60">{shop.distance} km away</p>
          </div>
          <button className="p-3 bg-agri-green/10 text-agri-green rounded-2xl"><MapPin size={20} /></button>
        </div>
      ))}
    </div>
  </div>
);

const WorkerMarketplace = ({ workers, onChat }: { workers: Worker[], onChat: () => void }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-agri-green">Hire Workers</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {['All', 'Harvesting', 'Sowing', 'Pesticide', 'Irrigation', 'Technician'].map(cat => (
          <button key={cat} className="px-6 py-3 glass-card rounded-2xl whitespace-nowrap font-medium text-sm text-agri-green">{cat}</button>
        ))}
      </div>
      <div className="space-y-4">
        {workers.map(worker => (
          <div key={worker.id} className="glass-card p-4 rounded-3xl flex gap-4 shadow-sm">
            <div className="relative">
              <img src={worker.image} alt={worker.name} className="w-24 h-24 rounded-2xl object-cover" />
              <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-lg shadow-md flex items-center gap-1 text-[10px] font-bold text-agri-green"><Star size={12} fill="#2E7D32" /> {worker.rating}</div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-lg text-agri-green">{worker.name}</h4>
                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${worker.availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{worker.availability}</span>
              </div>
              <p className="text-sm text-soil-brown/70 font-medium">{worker.skill} • {worker.experience} yrs exp</p>
              <div className="flex items-center gap-4 mt-3">
                <div><p className="text-[10px] text-soil-brown/50 uppercase font-bold">Daily Wage</p><p className="font-bold text-agri-green">₹{worker.wage}</p></div>
                <div><p className="text-[10px] text-soil-brown/50 uppercase font-bold">Distance</p><p className="font-bold">{worker.distance} km</p></div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={onChat} className="flex-1 py-2 bg-agri-green/10 text-agri-green rounded-xl font-bold text-sm flex items-center justify-center gap-2"><MessageSquare size={16} /> Chat</button>
                <button className="flex-1 py-2 bg-agri-green text-white rounded-xl font-bold text-sm">Hire</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AIAssistant = () => {
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Hello! I am KrishiSetu AI. Scan your crop or ask me anything about farming.' }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: { systemInstruction: "You are KrishiSetu AI, an expert agricultural assistant. Provide practical, easy-to-understand advice for farmers in India. Focus on crops, soil health, pest control, and market trends. Keep answers concise and helpful." }
      });
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to AI. Please check your internet." }]);
    } finally { setIsTyping(false); }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-agri-green text-white rounded-2xl shadow-lg"><MessageSquare size={24} /></div>
        <div><h2 className="text-xl font-bold text-agri-green">AI Farming Expert</h2><p className="text-xs text-soil-brown/60">Online • Multilingual Support</p></div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 no-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl shadow-sm ${m.role === 'user' ? 'bg-agri-green text-white rounded-tr-none' : 'glass-card text-soil-brown rounded-tl-none'}`}>
              <p className="text-sm leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
        {isTyping && <div className="flex justify-start"><div className="glass-card p-4 rounded-3xl rounded-tl-none flex gap-1"><span className="w-2 h-2 bg-agri-green/40 rounded-full animate-bounce" /><span className="w-2 h-2 bg-agri-green/40 rounded-full animate-bounce [animation-delay:0.2s]" /><span className="w-2 h-2 bg-agri-green/40 rounded-full animate-bounce [animation-delay:0.4s]" /></div></div>}
        <div ref={scrollRef} />
      </div>
      <div className="glass-card p-3 rounded-3xl flex items-center gap-2 shadow-lg">
        <button className="p-2 text-soil-brown/60 hover:text-agri-green"><Camera size={24} /></button>
        <button className="p-2 text-soil-brown/60 hover:text-agri-green"><FileText size={24} /></button>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} type="text" placeholder="Ask about crops, soil, pests..." className="flex-1 bg-transparent border-none focus:outline-none text-sm px-2" />
        <button onClick={handleSend} className="p-3 bg-agri-green text-white rounded-2xl shadow-md"><Send size={20} /></button>
      </div>
    </div>
  );
};

const NewsSection = ({ news }: { news: NewsItem[] }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-agri-green">Market Intelligence</h2>
      <div className="space-y-4">
        {news.map(item => (
          <div key={item.id} className="glass-card p-5 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="px-3 py-1 bg-agri-green/10 text-agri-green text-[10px] font-bold rounded-full uppercase tracking-wider">{item.category}</span>
              <span className="text-xs text-soil-brown/50 font-medium">{item.date}</span>
            </div>
            <h3 className="text-lg font-bold text-agri-green mb-2">{item.title}</h3>
            <p className="text-sm text-soil-brown/70 leading-relaxed mb-4">{item.summary}</p>
            {item.trendData && (
              <div className="h-24 w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={item.trendData}>
                    <Line type="monotone" dataKey="value" stroke="#2E7D32" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            <button className="flex items-center gap-1 text-agri-green text-sm font-bold">Read More <ChevronRight size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileScreen = ({ user, onLogout, setTheme, theme }: { user: UserType, onLogout: () => void, setTheme: (t: ThemeMode) => void, theme: ThemeMode }) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center pt-6">
        <div className="relative">
          <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=2E7D32&color=fff`} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-white shadow-xl" />
          <button className="absolute bottom-0 right-0 p-3 bg-agri-green text-white rounded-full shadow-lg"><Camera size={20} /></button>
        </div>
        <h2 className="mt-6 text-2xl font-bold text-agri-green">{user.name}</h2>
        <p className="text-soil-brown font-medium">{user.role}</p>
      </div>
      <div className="space-y-4">
        <div className="glass-card p-6 rounded-3xl shadow-sm">
          <h3 className="font-bold text-agri-green mb-4 flex items-center gap-2"><Settings size={20} /> App Settings</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center"><span className="text-sm font-medium">Display Mode</span><div className="flex gap-2">{(['light', 'dark', 'warm'] as ThemeMode[]).map(t => (<button key={t} onClick={() => setTheme(t)} className={`px-3 py-1 rounded-lg text-xs font-bold capitalize ${theme === t ? 'bg-agri-green text-white' : 'bg-agri-green/10 text-agri-green'}`}>{t}</button>))}</div></div>
            <div className="flex justify-between items-center"><span className="text-sm font-medium">Language</span><button className="flex items-center gap-2 text-agri-green font-bold text-sm"><Languages size={18} /> English <ChevronRight size={16} /></button></div>
          </div>
        </div>
        <button onClick={onLogout} className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-sm"><LogOut size={20} /> Logout</button>
      </div>
    </div>
  );
};

