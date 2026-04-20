import { motion, AnimatePresence } from 'framer-motion';
import SubscriptionCard from './SubscriptionCard';

const SubscriptionList = ({ subscriptions, onEdit, onDelete }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="w-full">
      {subscriptions.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {subscriptions.map(sub => (
              <motion.div
                key={sub.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              >
                <SubscriptionCard sub={sub} onEdit={onEdit} onDelete={onDelete} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="glass-panel p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-6 animate-pulse">
            <span className="text-3xl font-heading text-muted-white/30">?</span>
          </div>
          <h3 className="text-xl font-heading text-white mb-2">Void Space Detected</h3>
          <p className="text-muted-white/60 font-body max-w-md">No subscriptions currently in orbit. Initialize a new scan to start tracking your resources.</p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;
