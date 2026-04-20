import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#6C63FF', '#00FFD1', '#FF00A0', '#00F0FF', '#FFE600'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel px-4 py-2 text-sm border-white/20">
        <p className="text-white font-heading">{`${payload[0].name}: ₹${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

const CategoryChart = ({ subscriptions }) => {
  // Aggregate data by category
  const dataMap = subscriptions.reduce((acc, sub) => {
    let cost = sub.price;
    if (sub.cycle === 'yearly') cost = cost / 12;
    
    acc[sub.category] = (acc[sub.category] || 0) + cost;
    return acc;
  }, {});

  const data = Object.keys(dataMap).map(key => ({
    name: key,
    value: dataMap[key]
  })).sort((a, b) => b.value - a.value);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-panel p-6 h-80 flex flex-col items-center justify-center relative"
    >
      <h3 className="text-lg font-heading tracking-widest text-muted-white mb-4 absolute top-6 left-6">
        Orbital Distribution
      </h3>
      
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              // Adding soft pseudo-glow via SVG drop shadow or using colors intentionally
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  style={{ filter: `drop-shadow(0px 0px 8px ${COLORS[index % COLORS.length]}80)` }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-muted-white/50 font-body text-center mt-10">No signals detected in orbit.</div>
      )}
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 flex-wrap px-4">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs font-heading">
            <span 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: COLORS[index % COLORS.length], boxShadow: `0 0 5px ${COLORS[index % COLORS.length]}` }}
            ></span>
            <span className="text-muted-white/80">{entry.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryChart;
