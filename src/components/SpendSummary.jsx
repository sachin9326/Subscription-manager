import { motion } from 'framer-motion';

const SpendSummary = ({ monthlyTotal, yearlyTotal }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-panel p-6 relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-electric-indigo/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-electric-indigo to-transparent"></div>
        <p className="text-sm text-muted-white/70 uppercase tracking-widest font-heading mb-2">Monthly Orbit</p>
        <h2 className="text-4xl font-bold font-body text-white flex items-baseline gap-1">
          <span className="text-electric-indigo text-2xl">₹</span>
          {monthlyTotal.toFixed(2)}
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-panel p-6 relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-neon-cyan to-transparent"></div>
        <p className="text-sm text-muted-white/70 uppercase tracking-widest font-heading mb-2">Yearly Trajectory</p>
        <h2 className="text-4xl font-bold font-body text-white flex items-baseline gap-1">
          <span className="text-neon-cyan text-2xl">₹</span>
          {yearlyTotal.toFixed(2)}
        </h2>
      </motion.div>
    </div>
  );
};

export default SpendSummary;
