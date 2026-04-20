import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target } from 'lucide-react';

const AddEditModal = ({ isOpen, onClose, onSave, subToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    cycle: 'monthly',
    category: 'Software',
    nextBilling: '',
    status: 'active'
  });

  useEffect(() => {
    if (subToEdit) {
      setFormData(subToEdit);
    } else {
      setFormData({
        name: '',
        price: '',
        cycle: 'monthly',
        category: 'Software',
        nextBilling: new Date().toISOString().split('T')[0],
        status: 'active'
      });
    }
  }, [subToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.nextBilling) return;
    onSave(formData);
  };

  const categories = ['Software', 'Streaming', 'Fitness', 'Productivity', 'Cloud', 'Gaming'];
  const statuses = ['active', 'trial', 'paused', 'cancelled'];
  const cycles = ['monthly', 'yearly'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-space-black/80 backdrop-blur-sm z-50 pointer-events-auto"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-6 glass-panel border border-neon-cyan/30 shadow-[0_0_30px_rgba(0,255,209,0.15)] pointer-events-auto"
          >
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h2 className="text-xl font-heading text-white flex items-center gap-2">
                <Target className="text-neon-cyan w-5 h-5" />
                {subToEdit ? 'Recalibrate Orbit' : 'Initialize New Orbit'}
              </h2>
              <button 
                onClick={onClose}
                className="text-muted-white hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-body">
              <div>
                <label className="block text-xs font-heading tracking-widest uppercase text-muted-white/70 mb-1">Signal Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-space-black/50 border border-glass-border rounded-lg p-2 text-white placeholder-white/30 focus:outline-none focus:border-electric-indigo transition-colors"
                  placeholder="e.g. Netflix"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading tracking-widest uppercase text-muted-white/70 mb-1">Cost</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-white/50">₹</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      step="0.01"
                      className="w-full bg-space-black/50 border border-glass-border rounded-lg p-2 pl-7 text-white focus:outline-none focus:border-electric-indigo transition-colors"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-heading tracking-widest uppercase text-muted-white/70 mb-1">Cycle</label>
                  <select
                    name="cycle"
                    value={formData.cycle}
                    onChange={handleChange}
                    className="w-full bg-space-black/50 border border-glass-border rounded-lg p-2 text-white focus:outline-none focus:border-electric-indigo transition-colors appearance-none"
                  >
                    {cycles.map(c => <option key={c} value={c} className="bg-space-black">{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading tracking-widest uppercase text-muted-white/70 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-space-black/50 border border-glass-border rounded-lg p-2 text-white focus:outline-none focus:border-electric-indigo transition-colors appearance-none"
                  >
                    {categories.map(c => <option key={c} value={c} className="bg-space-black">{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-heading tracking-widest uppercase text-muted-white/70 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-space-black/50 border border-glass-border rounded-lg p-2 text-white focus:outline-none focus:border-electric-indigo transition-colors appearance-none"
                  >
                    {statuses.map(s => <option key={s} value={s} className="bg-space-black">{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading tracking-widest uppercase text-muted-white/70 mb-1">Next Encounter (Billing)</label>
                <input
                  type="date"
                  name="nextBilling"
                  value={formData.nextBilling}
                  onChange={handleChange}
                  className="w-full bg-space-black/50 border border-glass-border rounded-lg p-2 text-white focus:outline-none focus:border-electric-indigo transition-colors style-scheme-dark"
                  required
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/5 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg font-heading text-sm text-muted-white hover:bg-white/5 transition-colors"
                >
                  Abort
                </button>
                <button
                  type="submit"
                  className="neon-button-solid text-sm"
                >
                  {subToEdit ? 'Update Trajectory' : 'Launch'}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddEditModal;
