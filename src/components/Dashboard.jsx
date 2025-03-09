import React, { useState, useEffect, CSSProperties } from "react";
import boxes from "../assets/boxes.png";
import leaf from "../assets/leaf.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BarChart from "./BarChart";
import ClipLoader from "react-spinners/ClipLoader";
import ProgressBar from "@ramonak/react-progress-bar";
import { toast } from "react-toastify";

//Loader
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Dashboard = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#39b695");
  const Navigate = useNavigate();
  const notify = () => toast.success("Logout Successfull");

  //Didnt Provide any link to navItem as it is just a UI
  const navItems = [
    "Dashboard",
    "Expenses",
    "Wallets",
    "Summary",
    "Accounts",
    "Settings",
  ];

  const colors = [
    "bg-red-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-indigo-200",
    "bg-gray-200",
  ];

  const spendingCategories = [
    {
      category: "Weight",
      amount: pokemon[0]?.weight,
    },
    {
      category: "Experience Level",
      amount: pokemon[0]?.base_experience,
    },
    {
      category: "Speed",
      amount: pokemon[0]?.stats[5]?.base_stat,
    },
    {
      category: "Attack",
      amount: pokemon[0]?.stats[1]?.base_stat,
      progress: "w-[40%]",
    },
    {
      category: "Special Defence",
      amount: pokemon[0]?.stats[4]?.base_stat,
      progress: "w-[30%]",
    },
  ];

  //Fetching PokApi

  const API = "https://pokeapi.co/api/v2/pokemon?limit=6";

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  // Fetching Profile Data
  const [profileData, setProfileData] = useState();
  console.log(profileData);

  const getProfileData = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    const header = {
      header: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get("https://reqres.in/api/users/4", header)
      .then((res) => {
        // console.log("profile data", res);
        setProfileData(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  useEffect(() => {
    getProfileData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/login");
    notify();
  };

  return (
    <>
      <div>
        {loading ? (
          <div className="h-screen w-full flex items-center justify-center">
            <ClipLoader
              color={color}
              loading={loading}
              cssOverride={override}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <section className="w-full bg-black text-white flex flex-col lg:flex-row p-4 lg:p-7">
            {/* Menu Items */}
            <div className="lg:w-1/6 w-full flex flex-col items-center lg:items-start py-6 px-6 gap-10">
              {/* Profile */}
              <div className="profile flex flex-col gap-2 items-center lg:items-start">
                <div className="rounded-lg w-14 bg-white relative">
                  <img className="rounded-lg" src={profileData?.data?.avatar} />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    4
                  </div>
                </div>
                <h1 className="font-semibold text-2xl lg:text-4xl text-center lg:text-left">
                  {profileData?.data?.first_name}
                </h1>
                <p className="text-gray-400 font-light text-center lg:text-left">
                  {profileData?.data?.email}
                </p>
              </div>
              {/* Nav Items */}
              <div className="text-xl lg:text-3xl font-medium mt-6 text-center lg:text-left">
                {navItems.map((items, i) => (
                  <p key={i} className="mb-5 lg:mb-7">
                    {items}
                  </p>
                ))}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-sm bg-red-500 w-full lg:w-auto text-center"
              >
                Logout
              </button>
            </div>
            {/* Content */}
            <div className="lg:w-5/6 w-full bg-slate-50 rounded-3xl flex flex-col lg:flex-row overflow-hidden">
              <div className="lg:w-3/4 w-full bg-white text-black px-6 md:px-28 py-8 md:py-16">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      Pokémon Performance
                    </h2>
                    <p className="text-gray-500 text-sm">XP Gained: 1 - 300</p>
                  </div>
                  <div className="flex items-center -space-x-2 mt-4 md:mt-0">
                    {[1, 2, 3].map((num) => (
                      <img
                        key={num}
                        src={`https://randomuser.me/api/portraits/${
                          num % 2 ? "women" : "men"
                        }/${num}.jpg`}
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                    ))}
                    <button className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-300 text-gray-500 hover:bg-gray-200">
                      +
                    </button>
                  </div>
                </div>
                <div className="h-48 md:h-[210px]">
                  <BarChart />
                </div>
                <p className="mt-5 font-semibold">Pokemon</p>
                <hr />
                {pokemon.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row items-center justify-between py-4 bg-white rounded-lg w-full mt-1"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 ${
                          colors[i % colors.length]
                        } rounded-full flex items-center justify-center`}
                      >
                        <img
                          src={item?.sprites?.front_default}
                          className="w-10 h-10"
                        />
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold">
                          {item?.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item?.types
                            .map((type) => type?.type?.name)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                    <p className="text-black font-bold">
                      {item?.base_experience} EXP Level
                    </p>
                  </div>
                ))}
              </div>
              <div className="lg:w-1/4 w-full bg-[#F9FAFC] px-6 md:px-12 py-10 md:py-20">
                <p className="text-black font-semibold text-lg mb-7 text-center md:text-left">
                  How strong is your Pokémon?
                </p>
                {spendingCategories.map((item, index) => (
                  <div key={index} className="mb-9">
                    <div className="flex justify-between  font-semibold text-gray-600">
                      <span>{item.category}</span>
                      <span>{item.amount}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2">
                      <ProgressBar
                        completed={item.amount}
                        isLabelVisible={false}
                        height="7px"
                        bgColor="#39b695"
                      />
                    </div>
                  </div>
                ))}
                <div className="relative p-6 bg-gray-100 shadow-lg rounded-xl flex flex-col items-center text-center space-y-4 mt-32">
                  <div className="w-full flex justify-between px-4 relative mb-10">
                    <img
                      src={boxes}
                      alt="Boxes"
                      className="w-24 h-24 md:w-40 md:h-40 object-contain absolute -top-10 md:-top-20 -left-2"
                    />
                    <img
                      src={leaf}
                      alt="Leaf"
                      className="w-12 h-12 md:w-20 md:h-20 object-contain absolute -top-10 md:-top-20 -right-2"
                    />
                  </div>
                  <h3 className="text-gray-900 font-semibold text-lg">
                    Save more money
                  </h3>
                  <p className="text-gray-500 text-sm px-2">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <button className="bg-black text-white text-sm font-medium px-12 py-2 rounded-lg">
                    VIEW TIPS
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Dashboard;
