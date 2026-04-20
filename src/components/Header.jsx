import { Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col md:flex-row items-center justify-between py-6 px-8 lg:px-12 w-full z-10 glass-panel mb-8 border-t-0 rounded-t-none border-x-0 !border-b-glass-border/50 rounded-b-2xl"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Rocket className="text-neon-cyan w-8 h-8 z-10 relative" />
          <div className="absolute inset-0 bg-neon-cyan/20 blur-xl rounded-full scale-150 animate-pulse"></div>
        </div>
        <div>
          <h1 className="text-2xl font-heading font-bold tracking-widest text-transparent bg-clip-text bg-neon-gradient">
            ORBITPAY
          </h1>
          <p className="text-xs text-muted-white/70 font-body tracking-wider uppercase">
            Zero-Gravity Subscription Management
          </p>
        </div>
      </div>

      <nav className="mt-4 md:mt-0 flex items-center gap-6 text-sm font-heading tracking-wide">
        <a href="#" className="text-neon-cyan drop-shadow-[0_0_8px_rgba(0,255,209,0.5)]">Dashboard</a>
        <a href="#" className="text-muted-white hover:text-white transition-colors duration-200">Analytics</a>
        <a href="#" className="text-muted-white hover:text-white transition-colors duration-200">Settings</a>
      </nav>
    </motion.header>
  );
};

export default Header;
