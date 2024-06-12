import { Bar } from "react-chartjs-2";
import { Chart, BarElement, Tooltip, LinearScale, CategoryScale } from "chart.js";
import styles from '../css modules/Host/StarRatingsChart.module.css';

Chart.register(BarElement, Tooltip, LinearScale, CategoryScale);

export default function StarRatingsChart({ reviews, width = 500, height = 200 }) {
  const totalReviews = reviews.length;
  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalReviews > 0 ? (totalRatings / totalReviews).toFixed(1) : 0;

  const getStarLabel = (averageRating) =>
  averageRating >= 4.5 ? "☆☆☆☆☆" : averageRating >= 3.5 ? "☆☆☆☆" :
  averageRating >= 2.5 ? "☆☆☆" : averageRating >= 1.5 ? "☆☆" : "☆";
  
  const starLabel = getStarLabel(averageRating);

  const calculateStarCounts = () => {
    const starCounts = {
      "☆☆☆☆☆": 0,
      "☆☆☆☆": 0,
      "☆☆☆": 0,
      "☆☆": 0,
      "☆": 0
    };

    reviews.forEach(review => {
      starCounts[`☆`.repeat(review.rating)]++;
    });

    return starCounts;
  };

  const starCounts = calculateStarCounts();

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 0
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        display: false,
        grid: {
          display: false
        }
      },
      y: {
        stacked: true,
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltip: {
        mode: "y",
        callbacks: {
          label: (item) => {
            return `${item.dataset.label}: ${item.raw}`;
          }
        }
      }
    }
  };

  const data = {
    labels: ["☆☆☆☆☆", "☆☆☆☆", "☆☆☆", "☆☆", "☆"],
    datasets: [
      {
        label: 'Total',
        data: Object.values(starCounts),
        backgroundColor: `rgba(255, 195, 0, 0.5)`
      }
    ]
  };

  return (
    <div className={styles.starRatingsChart}>
        <div className={styles.rating}>
          <p><span>{averageRating}</span> {starLabel}</p>
          <p>Total: {totalReviews}</p>
        </div>
      <Bar
        options={options}
        data={data}
        width={width - 10} 
        height={height - 50} 
      />
    </div>
  );
}
