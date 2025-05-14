import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Scores } from '../../types/Document';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface ScoreRadarChartProps {
  scores: Scores;
}

const ScoreRadarChart: React.FC<ScoreRadarChartProps> = ({ scores }) => {
  const data = {
    labels: [
      'Grammar',
      'Coherence',
      'Vocabulary',
      'Relevance',
      'Overall'
    ],
    datasets: [
      {
        label: 'Score',
        data: [
          scores.grammar,
          scores.coherence,
          scores.vocabulary,
          scores.relevance,
          scores.overall
        ],
        backgroundColor: 'rgba(51, 102, 204, 0.2)',
        borderColor: 'rgba(51, 102, 204, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(51, 102, 204, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(51, 102, 204, 1)',
      }
    ]
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 10,
        beginAtZero: true,
        ticks: {
          stepSize: 2,
          display: false
        },
        pointLabels: {
          font: {
            size: 10
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `Score: ${context.raw.toFixed(1)}/10`;
          }
        }
      }
    },
    maintainAspectRatio: true,
  };

  return (
    <div className="w-full h-64">
      <Radar data={data} options={options} />
    </div>
  );
};

export default ScoreRadarChart;