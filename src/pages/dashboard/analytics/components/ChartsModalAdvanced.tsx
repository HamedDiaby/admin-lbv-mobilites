import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Card, Button, Text, Badge, Modal } from '@components';
import { AnalyticsData, RevenueData, LineTripsData, UserAgeData, BusUtilizationData } from '../types';

// Enregistrement des composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AnalyticsData;
}

const ChartsModalAdvanced: React.FC<ChartsModalProps> = ({ isOpen, onClose, data }) => {
  const [selectedChart, setSelectedChart] = useState<'revenue' | 'performance' | 'demographics'>('revenue');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  // Configuration pour le graphique de revenus (ligne)
  const revenueChartData = {
    labels: data.revenueEvolution.slice(-30).map((item: RevenueData) => {
      const date = new Date(item.date);
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
    }),
    datasets: [
      {
        label: 'Revenus totaux',
        data: data.revenueEvolution.slice(-30).map((item: RevenueData) => item.revenue),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Revenus abonnements',
        data: data.revenueEvolution.slice(-30).map((item: RevenueData) => item.subscriptions),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Revenus tickets',
        data: data.revenueEvolution.slice(-30).map((item: RevenueData) => item.tickets),
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const revenueChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Évolution des Revenus (30 derniers jours)',
        font: {
          size: 16,
          weight: 'bold' as const,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return formatCurrency(value);
          }
        }
      }
    },
  };

  // Configuration pour le graphique de performance (barres)
  const performanceChartData = {
    labels: data.tripsByLine.map((line: LineTripsData) => line.lineName),
    datasets: [
      {
        label: 'Nombre de voyages',
        data: data.tripsByLine.map((line: LineTripsData) => line.trips),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        label: 'Revenus (en milliers)',
        data: data.tripsByLine.map((line: LineTripsData) => line.revenue / 1000),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
        yAxisID: 'y1',
      }
    ]
  };

  const performanceChartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Performance par Ligne',
        font: {
          size: 16,
          weight: 'bold' as const,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            if (context.dataset.label === 'Revenus (en milliers)') {
              return `${context.dataset.label}: ${formatCurrency(context.parsed.y * 1000)}`;
            }
            return `${context.dataset.label}: ${formatNumber(context.parsed.y)}`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Lignes'
        }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Nombre de voyages'
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Revenus (en milliers XOF)'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  // Configuration pour le graphique démographique (donut)
  const demographicsChartData = {
    labels: data.usersByAge.map((age: UserAgeData) => age.ageRange),
    datasets: [
      {
        label: 'Répartition par âge',
        data: data.usersByAge.map((age: UserAgeData) => age.count),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 51, 234, 0.8)',
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(245, 158, 11)',
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(147, 51, 234)',
        ],
        borderWidth: 2,
      }
    ]
  };

  const demographicsChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Répartition des Utilisateurs par Âge',
        font: {
          size: 16,
          weight: 'bold' as const,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const total = data.usersByAge.reduce((sum: number, age: UserAgeData) => sum + age.count, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${formatNumber(context.parsed)} (${percentage}%)`;
          }
        }
      }
    },
  };

  // Graphique d'utilisation des bus (barres horizontales)
  const busUtilizationData = {
    labels: data.busUtilization.map((bus: BusUtilizationData) => bus.busNumber),
    datasets: [
      {
        label: 'Taux d\'utilisation (%)',
        data: data.busUtilization.map((bus: BusUtilizationData) => bus.utilization),
        backgroundColor: data.busUtilization.map((bus: BusUtilizationData) => 
          bus.utilization >= 90 ? 'rgba(239, 68, 68, 0.8)' :
          bus.utilization >= 75 ? 'rgba(245, 158, 11, 0.8)' :
          'rgba(34, 197, 94, 0.8)'
        ),
        borderColor: data.busUtilization.map((bus: BusUtilizationData) => 
          bus.utilization >= 90 ? 'rgb(239, 68, 68)' :
          bus.utilization >= 75 ? 'rgb(245, 158, 11)' :
          'rgb(34, 197, 94)'
        ),
        borderWidth: 1,
      }
    ]
  };

  const busUtilizationOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Taux d\'Utilisation des Bus',
        font: {
          size: 16,
          weight: 'bold' as const,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `Utilisation: ${context.parsed.x}%`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Taux d\'utilisation (%)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Bus'
        }
      }
    },
  };

  const renderChart = () => {
    switch (selectedChart) {
      case 'revenue':
        return (
          <div className="space-y-6">
            <div className="h-96">
              <Line data={revenueChartData} options={revenueChartOptions} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-blue-50">
                <Text variant="p3" className="text-blue-700 font-medium">
                  Revenus Moyens/Jour
                </Text>
                <Text variant="h4" className="text-blue-900 font-bold">
                  {formatCurrency(data.totalRevenue / 30)}
                </Text>
              </Card>
              <Card className="p-4 bg-green-50">
                <Text variant="p3" className="text-green-700 font-medium">
                  Peak Revenus
                </Text>
                <Text variant="h4" className="text-green-900 font-bold">
                  {formatCurrency(Math.max(...data.revenueEvolution.map((r: RevenueData) => r.revenue)))}
                </Text>
              </Card>
              <Card className="p-4 bg-purple-50">
                <Text variant="p3" className="text-purple-700 font-medium">
                  Croissance
                </Text>
                <Text variant="h4" className="text-purple-900 font-bold">
                  +12.5%
                </Text>
              </Card>
            </div>
          </div>
        );
      
      case 'performance':
        return (
          <div className="space-y-6">
            <div className="h-96">
              <Bar data={performanceChartData} options={performanceChartOptions} />
            </div>
            <div className="h-64">
              <Bar data={busUtilizationData} options={busUtilizationOptions} />
            </div>
          </div>
        );
      
      case 'demographics':
        return (
          <div className="space-y-6">
            <div className="h-96">
              <Doughnut data={demographicsChartData} options={demographicsChartOptions} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {data.usersByAge.map((age: UserAgeData, index: number) => (
                <Card key={index} className="p-4 text-center">
                  <Text variant="p3" className="text-gray-700 font-medium">
                    {age.ageRange}
                  </Text>
                  <Text variant="h4" className="text-gray-900 font-bold">
                    {formatNumber(age.count)}
                  </Text>
                  <Badge variant="outline" color="primary" className="mt-2">
                    {age.percentage}%
                  </Badge>
                </Card>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Graphiques Analytiques" size="xl" maxHeight="90vh">
      <div className="p-6">
        {/* Navigation des graphiques */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setSelectedChart('revenue')}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
              selectedChart === 'revenue' 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📈 Revenus & Évolution
          </button>
          <button
            onClick={() => setSelectedChart('performance')}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
              selectedChart === 'performance' 
                ? 'bg-green-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🚌 Performance & Utilisation
          </button>
          <button
            onClick={() => setSelectedChart('demographics')}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
              selectedChart === 'demographics' 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            👥 Démographie
          </button>
        </div>

        {/* Contenu des graphiques */}
        {renderChart()}
      </div>
      
      <div className="flex justify-end gap-4 p-6 border-t">
        <Button 
          label="Fermer" 
          appearance="outline" 
          variation="secondary" 
          onClick={onClose} 
        />
        <Button 
          label="Exporter PNG" 
          appearance="solid" 
          variation="primary" 
          iconName="Download" 
        />
      </div>
    </Modal>
  );
};

export default ChartsModalAdvanced;
