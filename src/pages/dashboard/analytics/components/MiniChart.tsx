import React from 'react';
import { Line } from 'react-chartjs-2';
import { AnalyticsData } from './types';

interface MiniChartProps {
  data: AnalyticsData;
  type: 'revenue' | 'trips' | 'users';
  height?: number;
}

const MiniChart: React.FC<MiniChartProps> = ({ data, type, height = 100 }) => {
  const getChartData = () => {
    switch (type) {
      case 'revenue':
        return {
          labels: data.revenueEvolution.slice(-7).map(() => ''),
          datasets: [
            {
              data: data.revenueEvolution.slice(-7).map(item => item.revenue),
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointRadius: 0,
            }
          ]
        };
      
      case 'trips':
        return {
          labels: data.tripsEvolution.slice(-7).map(() => ''),
          datasets: [
            {
              data: data.tripsEvolution.slice(-7).map(item => item.trips),
              borderColor: 'rgb(16, 185, 129)',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointRadius: 0,
            }
          ]
        };
      
      case 'users':
        return {
          labels: data.userGrowth.slice(-7).map(() => ''),
          datasets: [
            {
              data: data.userGrowth.slice(-7).map(item => item.newUsers),
              borderColor: 'rgb(147, 51, 234)',
              backgroundColor: 'rgba(147, 51, 234, 0.1)',
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointRadius: 0,
            }
          ]
        };
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      }
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      }
    },
    elements: {
      point: {
        radius: 0,
      }
    }
  };

  return (
    <div style={{ height: `${height}px` }}>
      <Line data={getChartData()} options={options} />
    </div>
  );
};

export default MiniChart;
