import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sun, LogOut, Check, X, AlertTriangle, User, Search, 
  Plus, Calendar, Settings, Activity, ShieldAlert,
  Edit2, XCircle, LayoutDashboard, DownloadCloud, UploadCloud, Trash2,
  Filter
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// --- STYLES & FONTS ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Orbitron:wght@400;500;700;900&family=Sora:wght@400;500;600;700&display=swap');

    :root {
      --bg-color: #F0F4FF;
      --text-main: #1A1A40;
      --text-muted: #6B7280;
      --card-bg: rgba(255, 255, 255, 0.7);
      --card-border: rgba(108, 99, 255, 0.1);
      --nav-bg: rgba(255, 255, 255, 0.9);
      --input-bg: rgba(255, 255, 255, 0.8);
      --shadow-color: rgba(108, 99, 255, 0.15);
      --accent-1: #6C63FF;
      --accent-2: #0EA5E9;
    }

    .dark {
      --bg-color: #050508;
      --text-main: #E0E0FF;
      --text-muted: rgba(224, 224, 255, 0.6);
      --card-bg: rgba(255, 255, 255, 0.04);
      --card-border: rgba(255, 255, 255, 0.08);
      --nav-bg: rgba(5, 5, 8, 0.8);
      --input-bg: rgba(255, 255, 255, 0.05);
      --shadow-color: rgba(0, 0, 0, 0.6);
      --accent-1: #00FFD1;
      --accent-2: #6C63FF;
    }

    body {
      background-color: var(--bg-color);
      color: var(--text-main);
      font-family: 'Sora', sans-serif;
      transition: background-color 0.5s ease;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }

    h1, h2, h3, h4, h5, h6, .font-heading {
      font-family: 'Orbitron', sans-serif;
    }

    .glass-panel {
      background: var(--card-bg);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--card-border);
      box-shadow: 0 8px 32px var(--shadow-color);
      border-radius: 1rem;
    }
    
    .text-gradient {
      background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--accent-1); opacity: 0.5; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--accent-2); }
  `}</style>
);

// --- LOGO COMPONENT ---
const Logo = ({ className = "w-12 h-12" }) => (
  <motion.div 
    className={`${className} relative flex items-center justify-center`}
    initial={{ scale: 0.8, rotate: -10 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_12px_var(--accent-1)]">
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="var(--accent-1)" />
          <stop offset="100%" stopColor="var(--accent-2)" />
        </linearGradient>
        <filter id="logoGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <motion.circle 
        cx="32" cy="32" r="18" 
        fill="url(#logoGradient)"
        filter="url(#logoGlow)"
        animate={{ 
          filter: ["brightness(1) contrast(1.2)", "brightness(1.4) contrast(1.5)", "brightness(1) contrast(1.2)"] 
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.ellipse 
        cx="32" cy="32" rx="28" ry="7" 
        stroke="white" strokeWidth="2" strokeOpacity="0.5" 
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: 'center' }}
      />
      <motion.circle 
        cx="32" cy="32" r="3" 
        fill="white"
        animate={{ 
          x: [20, -20, 20],
          y: [-5, 5, -5],
          scale: [0.7, 1.3, 0.7],
          opacity: [0.2, 0.8, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  </motion.div>
);


// --- BACKGROUNDS ---
const StarField = ({ isDark }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!isDark) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    
    const init = () => {
      particles = [];
      for (let i = 0; i < 200; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          alpha: Math.random()
        });
      }
    };
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        p.alpha += (Math.random() - 0.5) * 0.02;
        if(p.alpha < 0) p.alpha = 0;
        if(p.alpha > 0.8) p.alpha = 0.8;
        if(p.x < 0) p.x = canvas.width;
        if(p.x > canvas.width) p.x = 0;
        if(p.y < 0) p.y = canvas.height;
        if(p.y > canvas.height) p.y = 0;
      });
      animationId = requestAnimationFrame(draw);
    };
    
    window.addEventListener('resize', resize);
    resize(); draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationId); };
  }, [isDark]);

  return isDark ? 
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none -z-10" /> : 
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-3xl mix-blend-multiply filter animate-pulse"></div>
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-indigo-400/20 rounded-full blur-3xl mix-blend-multiply filter animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-sky-300/20 rounded-full blur-3xl mix-blend-multiply filter animate-pulse" style={{ animationDelay: '4s' }}></div>
    </div>;
};

// --- DATA ---
const SEED_DATA = [
  { id: '1', name: 'Netflix', price: 649, cycle: 'monthly', category: 'Streaming', nextBilling: new Date(Date.now() + 5*86400000).toISOString().split('T')[0], status: 'active', color: '#E50914' },
  { id: '2', name: 'Spotify', price: 119, cycle: 'monthly', category: 'Music', nextBilling: new Date(Date.now() + 12*86400000).toISOString().split('T')[0], status: 'active', color: '#1DB954' },
  { id: '3', name: 'Adobe CC', price: 4230, cycle: 'monthly', category: 'Software', nextBilling: new Date(Date.now() + 20*86400000).toISOString().split('T')[0], status: 'active', color: '#FF0000' },
  { id: '4', name: 'GitHub Pro', price: 400, cycle: 'monthly', category: 'Software', nextBilling: new Date(Date.now() + 8*86400000).toISOString().split('T')[0], status: 'active', color: '#ffffff' },
  { id: '5', name: 'Duolingo Plus', price: 750, cycle: 'yearly', category: 'Education', nextBilling: new Date(Date.now() + 25*86400000).toISOString().split('T')[0], status: 'trial', color: '#58CC02' },
  { id: '6', name: 'Apple iCloud', price: 75, cycle: 'monthly', category: 'Cloud', nextBilling: new Date(Date.now() + 3*86400000).toISOString().split('T')[0], status: 'active', color: '#555555' },
  { id: '7', name: 'Xbox Game Pass', price: 699, cycle: 'monthly', category: 'Gaming', nextBilling: new Date(Date.now() + 15*86400000).toISOString().split('T')[0], status: 'paused', color: '#107C10' },
  { id: '8', name: 'NY Times', price: 200, cycle: 'monthly', category: 'News', nextBilling: new Date(Date.now() - 5*86400000).toISOString().split('T')[0], status: 'cancelled', color: '#000000' }
];

const COLORS = ['#6C63FF', '#00FFD1', '#FF00A0', '#00F0FF', '#FFE600', '#FF3366', '#00E676'];

// --- MAIN COMPONENTS ---

export default function OrbitPayV2() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') !== 'light');
  const [user, setUser] = useState(null); // null = not logged in
  const [subs, setSubs] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currency, setCurrency] = useState('₹');
  const [budget, setBudget] = useState(10000);

  // Sync theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Load user & subs
  useEffect(() => {
    const savedUser = localStorage.getItem('op_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const savedSubs = localStorage.getItem('op_subs');
    if (savedSubs) setSubs(JSON.parse(savedSubs));
    
    const savedConfig = localStorage.getItem('op_config');
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      if(parsed.currency) setCurrency(parsed.currency);
      if(parsed.budget) setBudget(parsed.budget);
    }
  }, []);

  const saveSubs = (newSubs) => {
    setSubs(newSubs);
    if(user && user.id !== 'guest') localStorage.setItem('op_subs', JSON.stringify(newSubs));
  };
  
  const saveConfig = (newConfig) => {
    if(newConfig.currency) setCurrency(newConfig.currency);
    if(newConfig.budget) setBudget(newConfig.budget);
    localStorage.setItem('op_config', JSON.stringify({...JSON.parse(localStorage.getItem('op_config') || '{}'), ...newConfig}));
  };

  const addToast = (msg, type = 'info') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(toast => toast.id !== id)), 3000);
  };

  const handleLogin = (e, isGuest = false) => {
    e?.preventDefault();
    const newUser = isGuest ? { id: 'guest', name: 'Guest Explorer', initials: 'GE' } : 
      { id: Date.now().toString(), name: e.target.name.value, initials: e.target.name.value.substring(0,2).toUpperCase() };
    
    setUser(newUser);
    if(!isGuest) localStorage.setItem('op_user', JSON.stringify(newUser));
    
    const existingSubs = localStorage.getItem('op_subs');
    if (!existingSubs || isGuest) {
      setSubs(SEED_DATA);
    } else {
      setSubs(JSON.parse(existingSubs));
    }
    
    addToast(isGuest ? 'Welcome, Guest!' : 'Login successful', 'success');
  };

  const handleLogout = () => {
    setUser(null);
    setSubs([]);
    localStorage.removeItem('op_user');
    addToast('Logged out securely', 'info');
  };

  if (!user) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4">
        <GlobalStyles />
        <StarField isDark={isDark} />
        <AuthScreen onLogin={handleLogin} isDark={isDark} setIsDark={setIsDark} />
        <ToastContainer toasts={toasts} />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative pb-24">
      <GlobalStyles />
      <StarField isDark={isDark} />
      
      <Header user={user} isDark={isDark} setIsDark={setIsDark} onLogout={handleLogout} activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && <TabDashboard key="dash" subs={subs} setSubs={saveSubs} currency={currency} addToast={addToast} />}
          {activeTab === 'analytics' && <TabAnalytics key="ana" subs={subs} currency={currency} budget={budget} />}
          {activeTab === 'calendar' && <TabCalendar key="cal" subs={subs} currency={currency} />}
          {activeTab === 'settings' && <TabSettings key="set" user={user} currency={currency} budget={budget} setConfig={saveConfig} subs={subs} setSubs={saveSubs} addToast={addToast} />}
        </AnimatePresence>
      </main>

      <ToastContainer toasts={toasts} />
    </div>
  );
}

// --- AUTH SCREEN ---
const AuthScreen = ({ onLogin, isDark, setIsDark }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-8 w-full max-w-md relative z-10"
    >
      <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setIsDark(!isDark)}>
         {isDark ? <Sun className="text-[var(--accent-1)]" /> : <Moon className="text-[var(--accent-2)]" />}
      </div>
      <div className="text-center mb-8">
        <Logo className="w-20 h-20 mx-auto mb-4" />
        <h1 className="text-3xl font-heading font-bold text-gradient">ORBITPAY V2</h1>
        <p className="text-[var(--text-muted)] mt-2 text-sm">Mission Control for Subscriptions</p>
      </div>

      <form onSubmit={(e) => onLogin(e, false)} className="space-y-4">
        {!isLogin && (
           <div>
             <input name="name" type="text" placeholder="Commander Name" required className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-lg p-3 text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-1)]" />
           </div>
        )}
        {isLogin && <input name="name" type="hidden" value="Commander" />}
        <div>
          <input name="email" type="email" placeholder="Telemetry Email" required className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-lg p-3 text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-1)]" />
        </div>
        <div className="relative">
          <input name="password" type={showPass ? "text" : "password"} placeholder="Access Code (min 6 chars)" minLength={6} required className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-lg p-3 text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-1)]" />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3 text-[var(--text-muted)] text-sm font-heading">
            {showPass ? 'HIDE' : 'SHOW'}
          </button>
        </div>
        
        <button type="submit" className="w-full py-3 rounded-lg font-heading tracking-widest text-[#050508] bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] shadow-[0_0_15px_var(--accent-1)] hover:scale-[1.02] transition-transform">
          {isLogin ? 'INITIATE SEQUENCE' : 'REGISTER CREW'}
        </button>
      </form>

      <div className="mt-6 text-center space-y-4">
        <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-1)] transition-colors">
          {isLogin ? 'Need clearance? Register here.' : 'Have clearance? Login here.'}
        </button>
        <div className="w-full h-px bg-[var(--card-border)]"></div>
        <button onClick={(e) => onLogin(e, true)} className="text-sm font-heading tracking-widest text-[var(--accent-2)] hover:text-[var(--accent-1)] transition-colors uppercase">
          Enter Guest Mode
        </button>
      </div>
    </motion.div>
  );
};

// --- HEADER ---
const Header = ({ user, isDark, setIsDark, onLogout, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'analytics', icon: Activity, label: 'Analytics' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--card-border)] shadow-sm px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Logo className="w-10 h-10" />
          <h1 className="text-xl font-heading font-bold text-gradient">ORBITPAY</h1>
        </div>

        <nav className="flex items-center gap-1 md:gap-4 overflow-x-auto w-full md:w-auto p-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all font-heading text-sm ${activeTab === t.id ? 'bg-[var(--card-border)] text-[var(--accent-1)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--card-border)]'}`}>
              <t.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4 ml-auto">
          <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-[var(--card-border)] text-[var(--text-muted)] transition-colors">
            {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-indigo-500" />}
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-[var(--card-border)]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--accent-1)] to-[var(--accent-2)] flex items-center justify-center text-white font-heading text-sm">
              {user.initials}
            </div>
            <button onClick={onLogout} className="text-[var(--text-muted)] hover:text-red-500 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// --- TAB: DASHBOARD ---
const TabDashboard = ({ subs, setSubs, currency, addToast }) => {
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState('cost-desc');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState(null);

  // Stats
  const activeSubs = subs.filter(s => s.status === 'active' || s.status === 'trial');
  const monthlyCost = activeSubs.reduce((sum, s) => sum + (s.cycle === 'yearly' ? s.price/12 : s.cycle === 'weekly' ? s.price*4 : s.price), 0);
  
  // Highest Cost
  const highest = [...activeSubs].sort((a,b) => (b.cycle==='yearly'?b.price/12:b.price) - (a.cycle==='yearly'?a.price/12:a.price))[0];
  
  // Next Renewal
  const upcoming = [...activeSubs].sort((a,b) => new Date(a.nextBilling) - new Date(b.nextBilling)).filter(s => new Date(s.nextBilling) >= new Date());
  
  const getDaysUntil = (dateStr) => {
    const diff = new Date(dateStr) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const processedSubs = useMemo(() => {
    let res = subs.filter(s => s.name.toLowerCase().includes(filterText.toLowerCase()) || s.category.toLowerCase().includes(filterText.toLowerCase()));
    return res.sort((a, b) => {
      const ca = a.cycle === 'yearly' ? a.price/12 : a.price;
      const cb = b.cycle === 'yearly' ? b.price/12 : b.price;
      if(sortBy === 'cost-desc') return cb - ca;
      if(sortBy === 'cost-asc') return ca - cb;
      if(sortBy === 'name') return a.name.localeCompare(b.name);
      if(sortBy === 'date') return new Date(a.nextBilling) - new Date(b.nextBilling);
      return 0;
    });
  }, [subs, filterText, sortBy]);

  const handleSave = (sub) => {
    if(editingSub) {
      setSubs(subs.map(s => s.id === sub.id ? sub : s));
      addToast('Trajectory updated', 'success');
    } else {
      setSubs([...subs, { ...sub, id: Date.now().toString() }]);
      addToast('New orbit initialized', 'success');
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setSubs(subs.filter(s => s.id !== id));
    addToast('Orbit terminated', 'info');
  };

  return (
    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="space-y-6">
      
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent-1)]"></div>
          <p className="text-xs font-heading text-[var(--text-muted)] uppercase tracking-widest mb-1">Monthly Cost</p>
          <h2 className="text-3xl font-body font-bold text-[var(--text-main)] flex items-baseline gap-1">
            <span className="text-[var(--accent-1)] text-xl">{currency}</span>
            <AnimatedNumber value={monthlyCost} />
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-2">Yearly Trajectory: {currency}{(monthlyCost*12).toFixed(2)}</p>
        </div>

        <div className="glass-panel p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent-2)]"></div>
          <p className="text-xs font-heading text-[var(--text-muted)] uppercase tracking-widest mb-1">Next Renewal</p>
          {upcoming.length > 0 ? (
            <>
              <h2 className="text-2xl font-body font-bold text-[var(--text-main)]">{upcoming[0].name}</h2>
              <p className="text-sm font-heading mt-1">in <span className="text-[var(--accent-2)] font-bold">{getDaysUntil(upcoming[0].nextBilling)}</span> days</p>
            </>
          ) : <p className="text-[var(--text-muted)]">No upcoming renewals</p>}
        </div>

        <div className="glass-panel p-6 relative overflow-hidden hidden md:block">
          <div className="absolute top-0 left-0 w-1 h-full bg-pink-500"></div>
          <p className="text-xs font-heading text-[var(--text-muted)] uppercase tracking-widest mb-1">Heavy Object Area</p>
          {highest ? (
            <>
              <h2 className="text-2xl font-body font-bold text-[var(--text-main)]">{highest.name}</h2>
              <p className="text-sm text-[var(--text-muted)] mt-1">{currency}{highest.price} / {highest.cycle}</p>
            </>
          ) : <p className="text-[var(--text-muted)]">N/A</p>}
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center z-10 relative">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input type="text" placeholder="Scan frequencies..." value={filterText} onChange={e=>setFilterText(e.target.value)} className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-full py-2 pl-9 pr-4 text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-1)]" />
        </div>
        <div className="flex w-full sm:w-auto items-center gap-2 bg-[var(--input-bg)] border border-[var(--card-border)] rounded-full py-1.5 px-3">
          <Filter className="w-4 h-4 text-[var(--accent-1)]" />
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="bg-transparent text-sm font-heading focus:outline-none text-[var(--text-muted)] w-full outline-none">
            <option value="cost-desc">Cost (High-Low)</option>
            <option value="cost-asc">Cost (Low-High)</option>
            <option value="name">Name A-Z</option>
            <option value="date">Date</option>
          </select>
        </div>
      </div>

      {/* GRID */}
      {processedSubs.length === 0 ? (
        <div className="glass-panel p-16 text-center">
          <ShieldAlert className="w-16 h-16 mx-auto mb-4 text-[var(--text-muted)] opacity-30 animate-pulse" />
          <h3 className="text-xl font-heading text-[var(--text-main)] mb-2">Void Space</h3>
          <p className="text-[var(--text-muted)]">No telemetry signals found matching criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {processedSubs.map((sub, i) => (
              <motion.div 
                layout key={sub.id}
                initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, scale: 0.9}} transition={{delay: i * 0.05}}
                className="glass-panel p-5 relative group hover:-translate-y-1.5 transition-all duration-300 hover:shadow-[0_0_20px_var(--shadow-color)] hover:border-white/20"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-heading font-bold text-white shadow-lg" style={{backgroundColor: sub.color || 'var(--accent-1)'}}>
                      {sub.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text-main)]">{sub.name}</h3>
                      <p className="text-[10px] font-heading uppercase text-[var(--text-muted)]">{sub.category}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[var(--text-main)]">{currency}{parseFloat(sub.price).toFixed(2)}</span>
                    <span className="text-xs text-[var(--text-muted)]">/{sub.cycle}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className={`px-2 py-0.5 rounded-full font-heading ${sub.status === 'active' ? 'bg-green-500/20 text-green-500' : sub.status === 'trial' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'}`}>
                    {sub.status.toUpperCase()}
                  </span>
                  <span className="text-[var(--text-muted)] font-heading">{sub.nextBilling}</span>
                </div>

                {/* Hover Actions */}
                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => {setEditingSub(sub); setModalOpen(true);}} className="p-1.5 bg-[var(--nav-bg)] rounded-md border border-[var(--card-border)] hover:text-[var(--accent-1)]"><Edit2 className="w-3.5 h-3.5"/></button>
                  <button onClick={() => handleDelete(sub.id)} className="p-1.5 bg-[var(--nav-bg)] rounded-md border border-[var(--card-border)] hover:text-red-500"><Trash2 className="w-3.5 h-3.5"/></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* FAB */}
      <button onClick={() => {setEditingSub(null); setModalOpen(true);}} className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] flex items-center justify-center text-white shadow-[0_0_20px_var(--accent-1)] hover:scale-110 transition-transform z-40 group">
        <span className="absolute inset-0 rounded-full animate-ping opacity-40 bg-[var(--accent-1)]"></span>
        <Plus className="w-7 h-7 relative z-10" />
      </button>

      <AddEditModal isOpen={modalOpen} onClose={()=>setModalOpen(false)} sub={editingSub} onSave={handleSave} />
    </motion.div>
  );
};

// --- TAB: ANALYTICS ---
const TabAnalytics = ({ subs, currency, budget }) => {
  const activeSubs = subs.filter(s => s.status === 'active' || s.status === 'trial');
  
  const categoryData = useMemo(() => {
    const acc = {};
    activeSubs.forEach(s => {
      const cost = s.cycle === 'yearly' ? s.price/12 : s.price;
      acc[s.category] = (acc[s.category] || 0) + cost;
    });
    return Object.keys(acc).map(k => ({ name: k, value: acc[k] })).sort((a,b)=>b.value-a.value);
  }, [activeSubs]);

  // Simulate trailing 6 months trend
  const trendData = useMemo(() => {
    const current = activeSubs.reduce((sum, s) => sum + (s.cycle === 'yearly' ? s.price/12 : s.price), 0);
    const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']; // Static mock labels
    return months.map((m, i) => ({
      name: m,
      Cost: current * (1 - (5-i)*0.02) // Slight mock variance
    }));
  }, [activeSubs]);

  // AI Savings Ideas
  const warnings = [];
  const catCount = {};
  activeSubs.forEach(s => catCount[s.category] = (catCount[s.category] || 0)+1);
  Object.keys(catCount).forEach(cat => {
    if(catCount[cat] >= 2) warnings.push(`Multiple signals detected in ${cat} (${catCount[cat]} services). Terminating one saves efficiency.`);
  });
  const trials = activeSubs.filter(s => s.status === 'trial');
  if(trials.length) warnings.push(`${trials.length} active trial(s) pending. Cancel before orbit intersection if unneeded.`);

  const monthlyCost = activeSubs.reduce((sum, s) => sum + (s.cycle === 'yearly' ? s.price/12 : s.price), 0);
  const budgetUsed = ((monthlyCost / budget)*100).toFixed(1);

  return (
    <motion.div initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* DONUT */}
      <div className="glass-panel p-6 lg:col-span-1 h-96 flex flex-col">
        <h3 className="font-heading text-sm text-[var(--text-muted)] tracking-widest uppercase mb-4">Category Distribution</h3>
        <div className="flex-1 w-full relative">
          {categoryData.length > 0 ? (
             <ResponsiveContainer width="100%" height="100%">
             <PieChart>
               <Pie data={categoryData} innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value" stroke="none">
                 {categoryData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
               </Pie>
               <Tooltip content={({active, payload}) => active && payload?.[0] ? (
                 <div className="bg-[var(--bg-color)] border border-[var(--card-border)] p-2 rounded text-sm text-[var(--text-main)] font-heading">
                   {payload[0].name}: {currency}{(payload[0].value).toFixed(2)}
                 </div>
               ) : null} />
             </PieChart>
           </ResponsiveContainer>
          ) : <div className="h-full flex items-center justify-center text-[var(--text-muted)]">No data</div>}
          {categoryData.length > 0 && <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
            <span className="text-[var(--text-muted)] font-heading text-[10px] uppercase">Total</span>
            <span className="text-xl font-bold text-[var(--text-main)]">{currency}{monthlyCost.toFixed(0)}</span>
          </div>}
        </div>
      </div>

      {/* TREND BAR */}
      <div className="glass-panel p-6 lg:col-span-2 h-96 flex flex-col">
        <h3 className="font-heading text-sm text-[var(--text-muted)] tracking-widest uppercase mb-4">6-Month Trend</h3>
         <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-muted)" tick={{fontSize: 12, fill: 'var(--text-muted)'}} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--text-muted)" tick={{fontSize: 12, fill: 'var(--text-muted)'}} axisLine={false} tickLine={false} tickFormatter={v => `${currency}${v}`} />
              <Tooltip contentStyle={{backgroundColor:'var(--bg-color)', borderColor:'var(--card-border)', borderRadius:'8px'}} itemStyle={{color:'var(--accent-1)', fontFamily:'Orbitron'}} cursor={{fill: 'var(--card-border)'}} />
              <Bar dataKey="Cost" fill="var(--accent-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
      </div>

      {/* SAVINGS RADAR */}
      <div className="glass-panel p-6 lg:col-span-2">
         <div className="flex items-center gap-2 mb-4">
           <Activity className="text-[var(--accent-2)] w-5 h-5 animate-pulse" />
           <h3 className="font-heading text-sm text-[var(--text-muted)] tracking-widest uppercase">Savings Radar</h3>
         </div>
         <div className="space-y-3">
           {warnings.length ? warnings.map((w,i) => (
             <div key={i} className="p-3 bg-[var(--nav-bg)] border-l-2 border-[var(--accent-1)] rounded-r-lg text-sm text-[var(--text-main)] flex gap-3 start items-start">
               <AlertTriangle className="w-4 h-4 text-[var(--accent-1)] shrink-0 mt-0.5" />
               <p>{w}</p>
             </div>
           )) : <p className="text-[var(--text-muted)] text-sm">Orbit efficient. No leaks detected.</p>}
         </div>
      </div>

      {/* BUDGET HUD */}
      <div className="glass-panel p-6 lg:col-span-1">
        <h3 className="font-heading text-sm text-[var(--text-muted)] tracking-widest uppercase mb-6">Resource Allocation</h3>
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-[var(--text-main)]">Burn Rate</span>
          <span className="font-heading font-bold text-[var(--accent-2)]">{budgetUsed}%</span>
        </div>
        <div className="w-full h-2 bg-[var(--input-bg)] rounded-full overflow-hidden mb-6">
          <div className="h-full bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)]" style={{width: `${Math.min(budgetUsed, 100)}%`}}></div>
        </div>
        <p className="text-xs text-[var(--text-muted)] text-center">Budget Target: {currency}{budget}</p>
      </div>
    </motion.div>
  );
};

// --- TAB: CALENDAR ---
const TabCalendar = ({ subs, currency }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  // Create grid
  const days = Array.from({length: daysInMonth}, (_, i) => i+1);
  const padding = Array.from({length: firstDay}, (_, i) => i);

  // Map renewals to days
  const activeSubs = subs.filter(s => s.status === 'active' || s.status === 'trial');
  const renewals = {};
  activeSubs.forEach(s => {
    const d = new Date(s.nextBilling);
    if(d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear()) {
      if(!renewals[d.getDate()]) renewals[d.getDate()] = [];
      renewals[d.getDate()].push(s);
    }
  });

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="glass-panel p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-[var(--text-main)]">{monthName} {year}</h2>
        <div className="flex gap-2">
          <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth()-1)))} className="p-2 border border-[var(--card-border)] rounded hover:bg-[var(--card-border)]">&lt;</button>
          <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 text-sm font-heading border border-[var(--card-border)] rounded hover:bg-[var(--card-border)] text-[var(--accent-1)]">TODAY</button>
          <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth()+1)))} className="p-2 border border-[var(--card-border)] rounded hover:bg-[var(--card-border)]">&gt;</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="text-center font-heading text-xs text-[var(--text-muted)] py-2 uppercase">{d}</div>
        ))}
        
        {padding.map(p => <div key={`pad-${p}`} className="h-24 rounded-lg bg-[var(--input-bg)] opacity-30 border border-transparent"></div>)}
        
        {days.map(d => {
          const isToday = new Date().getDate() === d && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();
          const items = renewals[d] || [];
          const isDanger = items.length > 1;

          return (
            <div key={d} className={`h-24 rounded-lg border p-1 sm:p-2 overflow-hidden transition-all ${isToday ? 'border-[var(--accent-1)] shadow-[0_0_15px_var(--shadow-color)]' : 'border-[var(--card-border)] bg-[var(--input-bg)]'}`}>
               <div className="text-right text-xs font-bold font-heading mb-1 text-[var(--text-muted)]">{d}</div>
               <div className="flex flex-col gap-1">
                 {items.map(sub => (
                   <div key={sub.id} className={`text-[9px] truncate px-1 py-0.5 rounded text-white ${isDanger? 'bg-orange-500/80':''}`} style={{backgroundColor: isDanger ? undefined : sub.color || 'var(--accent-1)'}}>
                     {sub.name}
                   </div>
                 ))}
               </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

// --- TAB: SETTINGS ---
const TabSettings = ({ user, currency, budget, setConfig, subs, setSubs, addToast }) => {

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(subs));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", "orbitpay_telemetry.json");
    dl.click();
    addToast('Data exported successfully', 'success');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const json = JSON.parse(evt.target.result);
        if(Array.isArray(json)) { setSubs(json); addToast('Data imported', 'success'); }
        else addToast('Invalid payload', 'error');
      } catch(e) { addToast('Corrupted JSON', 'error'); }
    };
    reader.readAsText(file);
  };

  const handleClear = () => {
    if(window.confirm('WARNING: This will permanently erase all local orbital data. Proceed?')) {
      setSubs([]);
      addToast('All systems purged', 'info');
    }
  };

  return (
    <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} className="max-w-2xl mx-auto space-y-6">
      
      <div className="glass-panel p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[var(--accent-1)] flex items-center justify-center text-2xl font-heading font-bold text-white shadow-lg">
          {user.initials}
        </div>
        <div>
          <h2 className="text-xl font-body font-bold text-[var(--text-main)]">{user.name}</h2>
          <p className="text-[var(--text-muted)] text-sm">{user.id === 'guest' ? 'Temporary Clearance' : 'Active Commander'}</p>
        </div>
      </div>

      <div className="glass-panel p-6 space-y-6">
        <h3 className="font-heading text-sm text-[var(--text-muted)] tracking-widest uppercase border-b border-[var(--card-border)] pb-2">Preferences</h3>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <p className="text-[var(--text-main)] font-bold text-sm">Currency Standard</p>
            <p className="text-xs text-[var(--text-muted)]">Base monetary unit</p>
          </div>
          <select value={currency} onChange={e=>setConfig({currency: e.target.value})} className="bg-[var(--input-bg)] border border-[var(--card-border)] rounded-md px-3 py-1.5 text-sm outline-none text-[var(--text-main)]">
            <option value="₹">INR (₹)</option>
            <option value="$">USD ($)</option>
            <option value="€">EUR (€)</option>
            <option value="£">GBP (£)</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <p className="text-[var(--text-main)] font-bold text-sm">Monthly Budget Target</p>
            <p className="text-xs text-[var(--text-muted)]">Used for analytics & burn rate</p>
          </div>
          <div className="relative">
            <span className="absolute left-2 top-1.5 text-sm text-[var(--text-muted)]">{currency}</span>
            <input type="number" value={budget} onChange={e=>setConfig({budget: parseInt(e.target.value)||0})} className="bg-[var(--input-bg)] w-24 border border-[var(--card-border)] rounded-md px-2 py-1.5 pl-6 text-sm outline-none text-[var(--text-main)]" />
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 space-y-6">
        <h3 className="font-heading text-sm text-[var(--text-muted)] tracking-widest uppercase border-b border-[var(--card-border)] pb-2">Data Management</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button onClick={handleExport} className="flex items-center justify-center gap-2 p-3 rounded-lg border border-[var(--card-border)] hover:bg-[var(--card-border)] text-sm transition-colors text-[var(--text-main)]">
            <DownloadCloud className="w-4 h-4 text-[var(--accent-1)]" /> Export Telemetry JSON
          </button>
          
          <label className="flex items-center justify-center gap-2 p-3 rounded-lg border border-[var(--card-border)] hover:bg-[var(--card-border)] text-sm transition-colors cursor-pointer text-[var(--text-main)]">
            <UploadCloud className="w-4 h-4 text-[var(--accent-2)]" /> Import Telemetry JSON
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>

        <button onClick={handleClear} className="w-full mt-4 p-3 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 text-sm font-bold uppercase tracking-wide transition-colors">
          Purge All Local Data
        </button>
      </div>

      <p className="text-center text-[10px] text-[var(--text-muted)] font-heading">ORBITPAY V2.0 • BUILT FOR MISSION CONTROL</p>
    </motion.div>
  );
};


// --- UTILS: Add/Edit Modal ---
const AddEditModal = ({ isOpen, onClose, sub, onSave }) => {
  const [data, setData] = useState({ name: '', price: '', cycle: 'monthly', category: 'Software', status: 'active', nextBilling: '', color: '#6C63FF' });

  useEffect(() => {
    if(isOpen) setData(sub ? {...sub} : { name: '', price: '', cycle: 'monthly', category: 'Software', status: 'active', nextBilling: new Date().toISOString().split('T')[0], color: COLORS[0] });
  }, [sub, isOpen]);

  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 font-body">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div initial={{opacity:0, scale:0.9, y:40}} animate={{opacity:1, scale:1, y:0}} exit={{opacity:0}} className="glass-panel w-full max-w-md p-6 relative z-10 max-h-[90vh] overflow-y-auto">
         <h2 className="text-xl font-heading text-[var(--text-main)] mb-6 border-b border-[var(--card-border)] pb-2">
           {sub ? 'Recalibrate Track' : 'Launch Setup'}
         </h2>

         <form onSubmit={(e)=>{e.preventDefault(); onSave(data);}} className="space-y-4">
           <div>
             <label className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-1">Entity Name</label>
             <input type="text" required value={data.name} onChange={e=>setData({...data, name: e.target.value})} className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-md p-2 text-sm text-[var(--text-main)] outline-none focus:border-[var(--accent-1)]" />
           </div>

           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-1">Cost</label>
               <input type="number" required step="0.01" value={data.price} onChange={e=>setData({...data, price: parseFloat(e.target.value)||''})} className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-md p-2 text-sm text-[var(--text-main)] outline-none focus:border-[var(--accent-1)]" />
             </div>
             <div>
               <label className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-1">Cycle</label>
               <select value={data.cycle} onChange={e=>setData({...data, cycle: e.target.value})} className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-md p-2 text-sm text-[var(--text-main)] outline-none">
                 {['monthly', 'yearly', 'weekly'].map(c=><option key={c} value={c} className="bg-[var(--bg-color)]">{c}</option>)}
               </select>
             </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-1">Category</label>
               <select value={data.category} onChange={e=>setData({...data, category: e.target.value})} className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-md p-2 text-sm text-[var(--text-main)] outline-none">
                 {['Streaming', 'Software', 'Music', 'Fitness', 'Gaming', 'News', 'Cloud', 'Education', 'Other'].map(c=><option key={c} value={c} className="bg-[var(--bg-color)]">{c}</option>)}
               </select>
             </div>
             <div>
               <label className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-1">Status</label>
               <select value={data.status} onChange={e=>setData({...data, status: e.target.value})} className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-md p-2 text-sm text-[var(--text-main)] outline-none">
                 {['active', 'trial', 'paused', 'cancelled'].map(s=><option key={s} value={s} className="bg-[var(--bg-color)]">{s}</option>)}
               </select>
             </div>
           </div>

           <div>
             <label className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-1">Next Encounter</label>
             <input type="date" required value={data.nextBilling} onChange={e=>setData({...data, nextBilling: e.target.value})} className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-md p-2 text-sm text-[var(--text-main)] outline-none focus:border-[var(--accent-1)] style-scheme-dark" />
           </div>

           <div>
             <label className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-1">Color Tag</label>
             <div className="flex gap-2">
               {COLORS.map(c => (
                 <button type="button" key={c} onClick={()=>setData({...data, color: c})} className={`w-6 h-6 rounded-full border-2 ${data.color === c ? 'border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'border-transparent'}`} style={{backgroundColor: c}}></button>
               ))}
             </div>
           </div>

           <div className="pt-6 flex justify-end gap-3 border-t border-[var(--card-border)] mt-4">
             <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-heading rounded-md hover:bg-gray-500/20 text-[var(--text-muted)]">Abort</button>
             <button type="submit" className="px-4 py-2 text-sm font-heading rounded-md bg-[var(--accent-1)] text-white hover:bg-[var(--accent-2)] shadow-[0_0_10px_var(--accent-1)] transition-colors">Commit</button>
           </div>
         </form>
      </motion.div>
    </div>
  );
};

// --- UTILS: Toasts & Components ---
const ToastContainer = ({ toasts }) => (
  <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none">
    <AnimatePresence>
      {toasts.map(t => (
        <motion.div key={t.id} initial={{opacity:0, x:50}} animate={{opacity:1, x:0}} exit={{opacity:0, x:20}} className={`pointer-events-auto px-4 py-3 rounded-lg border shadow-lg flex items-center gap-2 font-body text-sm ${t.type==='error'?'bg-red-500/10 border-red-500/30 text-red-500': t.type==='success'?'bg-green-500/10 border-green-500/30 text-green-500':'bg-blue-500/10 border-blue-500/30 text-blue-500'} backdrop-blur-md`}>
          {t.type==='success' ? <Check className="w-4 h-4"/> : t.type==='error' ? <XCircle className="w-4 h-4"/> : <Activity className="w-4 h-4"/>}
          {t.msg}
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

const AnimatedNumber = ({ value }) => {
  const [disp, setDisp] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseFloat(value);
    if(start === end) return;
    let duration = 800; 
    let startTime = null;
    const step = (timestamp) => {
      if(!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setDisp(progress * (end - start) + start);
      if(progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <>{disp.toFixed(2)}</>;
};
