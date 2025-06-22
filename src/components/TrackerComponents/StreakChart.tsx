import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StreakChartProps {
  currentStreak: number;
  bestStreak: number;
}

export default function StreakChart({ currentStreak, bestStreak }: StreakChartProps) {
  const generateStreakData = () => {
    const data = [];
    let streak = 0;

    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const shouldRead = Math.random() > (i < 7 ? 0.1 : 0.3);

      if (shouldRead) {
        streak++;
      } else {
        streak = 0;
      }

      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        streak: Math.min(streak, currentStreak)
      });
    }

    if (data.length > 0) {
      data[data.length - 1].streak = currentStreak;
    }

    return data;
  };

  const streakData = generateStreakData();

  const chartData = {
    labels: streakData.map(d => d.date),
    datasets: [
      {
        label: 'Reading Streak',
        data: streakData.map(d => d.streak),
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#4f46e5',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Best Streak',
        data: Array(streakData.length).fill(bestStreak),
        borderColor: '#10b981',
        borderDash: [6, 6],
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#374151',
          boxWidth: 12,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#f9fafb',
        bodyColor: '#f9fafb',
        borderColor: '#4f46e5',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (context: any) => `${context[0].label}`,
          label: (context: any) => {
            if (context.dataset.label === 'Best Streak') {
              return `Best streak record: ${context.parsed.y} days`;
            }
            return `${context.parsed.y} day${context.parsed.y !== 1 ? 's' : ''} streak`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: { size: 11 },
          maxTicksLimit: 8,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: '#6b7280',
          font: { size: 11 },
          callback: (value: any) => `${value}d`,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Streak Progress</h3>
        <div className="text-sm text-gray-500">Last 30 days</div>
      </div>
      <div className="h-48">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
