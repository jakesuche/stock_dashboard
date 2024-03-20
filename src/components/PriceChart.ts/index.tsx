import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "chart.js";
Chart.register(
  CategoryScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  history: {
    timestamp: string;
    price: string;
  }[];
};

const PriceChart: React.FC<Props> = ({ history }) => {
  const chartData = {
    labels: history?.map(
      (point) =>
        `${new Date(point.timestamp).toLocaleDateString()}  ${new Date(
          point.timestamp
        ).toLocaleTimeString()} `
    ),
    datasets: [
      {
        label: "Price history",
        data: history?.map((point) => point.price),
        borderColor: "rgba(54, 162, 235, 0.8)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        pointRadius: 5,
        pointHitRadius: 10,
      },
    ],
  };

  return <Line data={chartData} options={{ maintainAspectRatio: false }} />;
};

export default PriceChart;
