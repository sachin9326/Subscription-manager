import { motion } from 'framer-motion';
import { AlertCircle, Sparkles } from 'lucide-react';

const SavingsTips = ({ subscriptions }) => {
  const getSuggestions = () => {
    const suggestions = [];
    
    // Check duplicates in categories
    const categoryCount = {};
    subscriptions.forEach(sub => {
      categoryCount[sub.category] = (categoryCount[sub.category] || 0) + 1;
    });

    Object.keys(categoryCount).forEach(category => {
      if (categoryCount[category] >= 2) {
        suggestions.push(`Multiple signals detected in ${category}. Consider terminating redundant services.`);
      }
    });

    // Check for paused/cancelled that shouldn't be counted but user might want to delete
    const paused = subscriptions.filter(s => s.status === 'paused');
    if (paused.length > 0) {
      suggestions.push(`You have ${paused.length} suspended orbit(s). Is it time to permanent eject them?`);
    }

    if (suggestions.length === 0 && subscriptions.length > 0) {
      suggestions.push("Orbital trajectory optimal. No inefficiencies detected.");
    }
    
    return suggestions;
  };

  const suggestions = getSuggestions();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-panel p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/10 blur-3xl rounded-full"></div>
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <Sparkles className="text-neon-cyan w-6 h-6 animate-pulse" />
        <h3 className="text-lg font-heading tracking-widest text-muted-white">AI Diagnostics</h3>
      </div>

      <div className="space-y-4 relative z-10">
        {suggestions.length > 0 ? (
          suggestions.map((s, i) => (
            <div key={i} className="flex gap-3 items-start bg-space-black/40 p-4 rounded-xl border border-glass-border">
              <AlertCircle className="text-electric-indigo w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm font-body text-muted-white/90 leading-relaxed">{s}</p>
            </div>
          ))
        ) : (
          <div className="text-muted-white/50 font-body text-center mt-6">Awaiting telemetry data...</div>
        )}
      </div>
    </motion.div>
  );
};

export default SavingsTips;
