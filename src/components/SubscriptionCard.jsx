import { motion } from 'framer-motion';
import { Play, Pause, XCircle, Edit2, ShieldAlert } from 'lucide-react';

const SubscriptionCard = ({ sub, onEdit, onDelete }) => {
  const isYearly = sub.cycle === 'yearly';
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50';
      case 'trial': return 'bg-electric-indigo/20 text-electric-indigo border-electric-indigo/50';
      case 'paused': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 'cancelled': return 'bg-red-500/20 text-red-500 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/50';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return <Play className="w-3 h-3 mr-1 inline" />;
      case 'trial': return <ShieldAlert className="w-3 h-3 mr-1 inline" />;
      case 'paused': return <Pause className="w-3 h-3 mr-1 inline" />;
      case 'cancelled': return <XCircle className="w-3 h-3 mr-1 inline" />;
      default: return null;
    }
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
      }}
      className="glass-panel glass-panel-hover p-5 flex flex-col group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-space-black flex items-center justify-center border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.5)] overflow-hidden">
            {sub.icon ? (
              <img src={sub.icon} alt={sub.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-heading font-bold text-transparent bg-clip-text bg-neon-gradient">{sub.name.charAt(0)}</span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold font-body text-white group-hover:text-neon-cyan transition-colors duration-300">{sub.name}</h3>
            <p className="text-xs text-muted-white/60 font-heading tracking-wider uppercase">{sub.category}</p>
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded-full border text-[10px] font-heading font-bold tracking-widest uppercase flex items-center ${getStatusColor(sub.status)}`}>
          {getStatusIcon(sub.status)}
          {sub.status}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-white/5 flex items-end justify-between">
        <div>
          <p className="text-[10px] text-muted-white/50 uppercase font-heading tracking-widest mb-1">Cost</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-body text-white">₹{sub.price.toFixed(2)}</span>
            <span className="text-xs text-muted-white/60">/{isYearly ? 'yr' : 'mo'}</span>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-[10px] text-muted-white/50 uppercase font-heading tracking-widest mb-1">Next Billing</p>
          <p className="text-sm font-body text-muted-white/90">{sub.nextBilling}</p>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
        <button onClick={() => onEdit(sub)} className="w-8 h-8 rounded-full bg-space-black/80 backdrop-blur border border-white/10 flex items-center justify-center text-electric-indigo hover:bg-electric-indigo hover:text-white transition-all transform hover:scale-110">
          <Edit2 className="w-4 h-4" />
        </button>
        <button onClick={() => onDelete(sub.id)} className="w-8 h-8 rounded-full bg-space-black/80 backdrop-blur border border-white/10 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all transform hover:scale-110">
          <XCircle className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default SubscriptionCard;
