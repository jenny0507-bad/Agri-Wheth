import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { 
  Droplets, Thermometer, Wind, AlertTriangle, CheckCircle2, 
  TrendingUp, TrendingDown, Calendar, MapPin, Phone, Video, 
  MessageSquare, Mic, Camera, FileText, Play, Languages,
  Tractor, Sprout, Beaker, Recycle, X, Paperclip
} from 'lucide-react';
import { CropIntelligence, SoilHealth, NewsItem, Worker, Crop, Machinery, AgriService, AgriShop } from '../types';

// --- Crop Intelligence ---
export const CropIntelligenceCard = ({ crop }: { crop: CropIntelligence }) => (
  <div className="glass-card p-5 rounded-3xl shadow-sm space-y-4">
    <div className="flex gap-4">
      <img src={crop.image} alt={crop.name} className="w-24 h-24 rounded-2xl object-cover" />
      <div>
        <h3 className="text-xl font-bold text-agri-green">{crop.name}</h3>
        <p className="text-xs text-soil-brown/70 leading-relaxed">{crop.description}</p>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-3 text-xs">
      <div className="p-3 bg-agri-green/5 rounded-xl">
        <p className="font-bold text-agri-green mb-1">Soil Suitability</p>
        <p>{crop.soilSuitability}</p>
      </div>
      <div className="p-3 bg-agri-green/5 rounded-xl">
        <p className="font-bold text-agri-green mb-1">Irrigation</p>
        <p>{crop.irrigationNeeds}</p>
      </div>
    </div>

    <div className="space-y-3">
      <h4 className="font-bold text-sm text-agri-green">Growth Trend</h4>
      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={crop.growthTrend}>
            <defs>
              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2E7D32" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="stage" hide />
            <YAxis hide />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#2E7D32" fillOpacity={1} fill="url(#colorVal)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

// --- Soil Health Advisor ---
export const SoilHealthWidget = ({ data }: { data: SoilHealth }) => {
  const indicators = [
    { label: 'Nitrogen', value: data.nitrogen, color: '#2E7D32' },
    { label: 'Phosphorus', value: data.phosphorus, color: '#F9A825' },
    { label: 'Potassium', value: data.potassium, color: '#8D6E63' },
  ];

  return (
    <div className="glass-card p-5 rounded-3xl shadow-sm space-y-4">
      <h3 className="font-bold text-lg flex items-center gap-2">
        <Beaker size={20} className="text-agri-green" /> Soil Health Advisor
      </h3>
      <div className="space-y-3">
        {indicators.map(ind => (
          <div key={ind.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium">{ind.label}</span>
              <span className="font-bold">{ind.value}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000" 
                style={{ width: `${ind.value}%`, backgroundColor: ind.color }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 bg-agri-green/5 rounded-2xl text-xs text-soil-brown/80">
        <p className="font-bold text-agri-green mb-1">Recommendation:</p>
        <p>Add 5kg/acre of organic compost to improve Nitrogen levels. Next irrigation scheduled in 2 days.</p>
      </div>
    </div>
  );
};

// --- Market Price Prediction ---
export const PricePredictionCard = ({ cropName, currentPrice, prediction }: { cropName: string, currentPrice: number, prediction: number }) => {
  const isUp = prediction > 0;
  return (
    <div className="glass-card p-5 rounded-3xl shadow-sm border-l-4 border-agri-green">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-bold text-agri-green">{cropName} Price Prediction</h4>
          <p className="text-xs text-soil-brown/60">Next 10 Days</p>
        </div>
        <div className={`flex items-center gap-1 font-bold ${isUp ? 'text-green-600' : 'text-red-600'}`}>
          {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {Math.abs(prediction)}%
        </div>
      </div>
      <p className="text-sm font-medium mb-3">
        {cropName} prices are expected to {isUp ? 'increase' : 'decrease'} by {Math.abs(prediction)}% within the next 10 days.
      </p>
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-soil-brown/50">Current: ₹{currentPrice}</span>
        <button className="px-4 py-2 bg-agri-green text-white text-xs font-bold rounded-xl">
          Best Time to Sell
        </button>
      </div>
    </div>
  );
};

// --- Disease Early Warning ---
export const DiseaseWarningWidget = () => (
  <div className="glass-card p-5 rounded-3xl shadow-sm bg-red-50/30 border border-red-100">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 bg-red-100 text-red-600 rounded-xl">
        <AlertTriangle size={20} />
      </div>
      <div>
        <h4 className="font-bold text-red-700">Disease Early Warning</h4>
        <p className="text-[10px] text-red-600 font-medium uppercase">High Risk Detected</p>
      </div>
    </div>
    <p className="text-sm text-red-800 mb-4">
      High humidity and temperature patterns suggest a 75% risk of <strong>Wheat Rust</strong> outbreak in your area.
    </p>
    <div className="flex gap-2">
      <button className="flex-1 py-2 bg-red-600 text-white text-xs font-bold rounded-xl">Preventive Care</button>
      <button className="flex-1 py-2 bg-white text-red-600 border border-red-200 text-xs font-bold rounded-xl">View Heatmap</button>
    </div>
  </div>
);

// --- Communication System ---
export const ChatInterface = ({ onBack }: { onBack: () => void }) => (
  <div className="fixed inset-0 z-50 bg-white flex flex-col">
    <header className="p-4 bg-agri-green text-white flex items-center gap-4">
      <button onClick={onBack}><X size={24} /></button>
      <img src="https://ui-avatars.com/api/?name=Ram+Singh" className="w-10 h-10 rounded-full border-2 border-white/20" />
      <div className="flex-1">
        <h3 className="font-bold">Ram Singh</h3>
        <p className="text-[10px] opacity-80">Online • Worker</p>
      </div>
      <div className="flex gap-3">
        <Phone size={20} />
        <Video size={20} />
      </div>
    </header>
    <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
      <div className="flex justify-start">
        <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] text-sm">
          Namaste Rajesh ji, I am available for harvesting tomorrow.
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-agri-green text-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%] text-sm">
          Great! Please come at 7 AM.
        </div>
      </div>
    </div>
    <div className="p-4 bg-white border-t flex items-center gap-2">
      <button className="p-2 text-gray-400"><Paperclip size={20} /></button>
      <input type="text" placeholder="Type a message..." className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none" />
      <button className="p-2 text-gray-400"><Mic size={20} /></button>
      <button className="p-3 bg-agri-green text-white rounded-full shadow-md"><TrendingUp className="rotate-90" size={18} /></button>
    </div>
  </div>
);
