import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios, { all } from "axios";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [pokemon, setPokemon] = useState([]);

  // console.log(pokemon);
  let allName = pokemon.map((data) => data?.name);
  let expLevel = pokemon.map((data) => data?.base_experience);
  // console.log(allName);
  // console.log(expLevel);

  const API = "https://pokeapi.co/api/v2/pokemon?limit=20";

  const fetchPokemon = async () => {
    try {
      const { data } = await axios.get(API);
      // console.log(data);

      const individualPokemonData = data?.results?.map(async (curPokemon) => {
        const res = await axios.get(curPokemon?.url);
        return res.data;
      });
      const detailedResponses = await Promise.all(individualPokemonData);

      setPokemon(detailedResponses);
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const data = {
    labels: allName,
    datasets: [
      {
        label: "# of Votes",
        data: expLevel,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
