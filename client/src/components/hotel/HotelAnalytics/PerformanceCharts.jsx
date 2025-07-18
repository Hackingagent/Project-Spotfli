import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './PerformanceCharts.css';

const PerformanceCharts = () => {
  const [timeRange, setTimeRange] = useState('monthly');

  // Sample data - replace with actual API data
  const revenueData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 },
    { name: 'Jun', revenue: 2390 },
  ];

  const occupancyData = [
    { name: 'Deluxe', value: 35 },
    { name: 'Standard', value: 45 },
    { name: 'Suite', value: 20 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="hoteldash-analytics">
      <div className="hoteldash-analytics-header">
        <h2>Performance Analytics</h2>
        <div className="hoteldash-time-filters">
          <button 
            onClick={() => setTimeRange('weekly')} 
            className={timeRange === 'weekly' ? 'active' : ''}
          >
            Weekly
          </button>
          <button 
            onClick={() => setTimeRange('monthly')} 
            className={timeRange === 'monthly' ? 'active' : ''}
          >
            Monthly
          </button>
          <button 
            onClick={() => setTimeRange('yearly')} 
            className={timeRange === 'yearly' ? 'active' : ''}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="hoteldash-charts-grid">
        <div className="hoteldash-chart-card">
          <h3>Revenue ({timeRange})</h3>
          <div className="hoteldash-chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="hoteldash-chart-card">
          <h3>Room Type Occupancy</h3>
          <div className="hoteldash-chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCharts;