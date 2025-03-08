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
          <div className="h-screen w-full">
            <ClipLoader
              color={color}
              loading={loading}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <section className="w-full bg-black text-white  flex p-7">
            {/* Menu Items */}
            <div className="w-1/6 flex flex-col py-10 px-4 gap-20">
              {/* Profile */}
              <div className="profile flex flex-col gap-2 ">
                <div className="rounded-lg  w-14 bg-white relative">
                  <img className="rounded-lg" src={profileData?.data?.avatar} />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    4
                  </div>
                </div>
                <h1 className="font-semibold text-4xl">
                  {profileData?.data?.first_name}
                </h1>
                <p className="text-gray-400 font-light ">
                  {profileData?.data?.email}
                </p>
              </div>
              {/* Nav Items */}
              <div className="text-3xl font-medium mt-6">
                {navItems.map((items, i) => (
                  <p key={i} className="mb-7">
                    {items}
                  </p>
                ))}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-sm self-center bg-red-500 mr-8"
              >
                Logout
              </button>
            </div>
            {/* Content */}
            <div className="w-5/6 bg-slate-50 rounded-3xl flex overflow-hidden">
              <div className="w-3/4 bg-white text-black px-20 py-16">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Pokémon Performance
                    </h2>
                    <p className="text-gray-500 text-sm">XP Gained: 1 - 300</p>
                  </div>
                  <div className="flex items-center -space-x-2">
                    <img
                      src="https://randomuser.me/api/portraits/women/1.jpg"
                      alt="User 1"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/men/2.jpg"
                      alt="User 2"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/men/3.jpg"
                      alt="User 3"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <button className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-300 text-gray-500 hover:bg-gray-200">
                      +
                    </button>
                  </div>
                </div>
                <div className="h-[250px]">
                  <BarChart />
                </div>
                <p className="mt-4">Pokemon</p>
                <hr />

                {/* pokemon section map */}
                {pokemon.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-4 bg-white rounded-lg  w-full mt-1"
                  >
                    {/* Left Section */}
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                        <img src={item?.sprites?.front_default} />
                      </div>

                      {/* Text Details */}
                      <div>
                        <p className=" text-gray-900 font-semibold">
                          {item?.name?.charAt(0).toUpperCase() +
                            item?.name?.slice(1).toLowerCase()}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item?.types
                            .map((typeItem) => typeItem?.type?.name)
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
              <div className="w-1/4 bg-[#F9FAFC] px-12 py-20">
                <p className="text-black font-semibold text-lg mb-7">
                  How strong is your Pokémon?
                </p>
                {spendingCategories.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between text-gray-900 font-medium">
                      <span>{item.category}</span>
                      <span>{item.amount}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2">
                      <div>
                        <ProgressBar
                          completed={item.amount}
                          isLabelVisible={false}
                          height="10px"
                          bgColor="#39b695"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {/* Bottom Section */}
                <div className="relative p-6 bg-gray-100 shadow-lg rounded-xl flex flex-col items-center text-center space-y-4 mt-32">
                  {/* Image Container */}
                  <div className="w-full flex justify-between px-4 relative mb-10">
                    <img
                      src={boxes}
                      alt="Boxes"
                      className="w-40 h-40 object-contain absolute -top-20 -left-2"
                    />
                    <img
                      src={leaf}
                      alt="Leaf"
                      className="w-20 h-30 object-contain absolute -top-20 -right-2"
                    />
                  </div>

                  {/* Text Content */}
                  <h3 className="text-gray-900 font-semibold text-lg">
                    Save more money
                  </h3>
                  <p className="text-gray-500 text-sm px-2">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>

                  {/* View Tips Button */}
                  <button className="bg-black text-white text-sm font-medium px-16  py-2 rounded-lg">
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
