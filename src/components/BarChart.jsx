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

  const API = "https://pokeapi.co/api/v2/pokemon?limit=23";

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
        label: "Exp Level",
        data: expLevel,
        backgroundColor: ["rgb(208,228,255"],
        hoverBackgroundColor: ["rgb(21,122,255)"],
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
        grid: {
          display: false, // Removes horizontal grid lines
          drawBorder: false, // Removes axis border
          drawTicks: false,
        },
        ticks: {
          display: false, // Hides Y-axis labels (numbers)
        },
        border: {
          display: false, // **Ensures Y-axis border is completely removed**
        },
      },
      x: {
        grid: {
          display: false, // Removes vertical grid lines
          drawBorder: false, // Removes axis border
          drawTicks: false,
        },
        ticks: {
          display: false, // Hides X-axis labels (names)
        },
        border: {
          display: false, // **Ensures Y-axis border is completely removed**
        },
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
