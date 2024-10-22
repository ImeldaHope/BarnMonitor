import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Label,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../AuthContext";

function Dashboard() {
  const { user } = useAuth(); // Access the authenticated user
  const farmerId = user?.id;

  const [farmerSales, setFarmerSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [farmer, setFarmer] = useState([]);
  const [totalAnimals, setTotalAnimals] = useState(0);
  const [farmerProduce, setFarmerProduce] = useState([]);
  const [totalProduce, setTotalProduce] = useState(0);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=-1.286389&longitude=36.817223&current_weather=true`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data.current_weather); // Get today's weather
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //Fetching sales data for logged in farmer
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/sales`)
      .then((response) => response.json())
      .then((data) => {        
        const filteredSales = data
          .filter((sale) => sale.animal.farmer_id === farmerId)
          .map((sale) => ({
            saleDate: sale.sale_date,
            amount: sale.amount,
          }));
        const amount = filteredSales.reduce(
          (total, sale) => total + sale.amount,
          0
        );
        const totalAmount = parseInt(amount, 10);
        setTotalSales(totalAmount);
        setFarmerSales(filteredSales);
      });
  }, []);

  //Fetching produce for logged in farmer
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/productions`)
      .then((response) => response.json())
      .then((data) => {        
        const filteredProduces = data
          .filter((produce) => produce.animal.farmer_id === farmerId)
          .map((produce) => ({
            produceDate: produce.production_date,
            quantity: produce.quantity,
          }));
        const produces = filteredProduces.reduce(
          (total, produce) => total + produce.quantity,
          0
        );

        setTotalProduce(produces);
        setFarmerProduce(filteredProduces);
      });
  }, []);

  //Fetching farmer
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/farmers/${farmerId}`)
      .then((response) => response.json())
      .then((data) => {
        const animals = data.animals.length;
        setFarmer(data);
        setTotalAnimals(animals);
      })
      .catch((error) => console.error("Error fetching farmer:", error));
  }, []);

  const getWeatherCondition = (weathercode) => {
    // Simple mapping for demonstration. Expand as needed based on actual weather codes.
    switch (weathercode) {
      case 0:
        return "Clear";
      case 61:
        return "Rain Showers";
      case 71:
        return "Rain";
      case 80:
        return "Showers";
      // Add more cases as needed
      default:
        return "Unknown Weather";
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching weather data: {error}</div>;

  // Add check for weather being null
  if (!weather) return <div>No weather data available.</div>;

  
  return (
    <>
      <div className="mt-5">
        <h1 className="font-extrabold text-primary_2 text-3xl pt-5">
          Dashboard
        </h1>
        <p className="text-slate-500">
          Good morning,{" "}
          <span className="font-semibold italic text-secondary_1">{farmer.name}</span>
        </p>
        <p className="text-slate-500">Checkout today's insights</p>
        <div className="flex py-5 px-5">
          <div className="border p-5 border-gray-300 rounded-lg text-center bg-gray-50 shadow-2xl max-w-xs mx-auto">
            <h2 className="text-xl text-primary_3 font-bold mb-2">Nairobi</h2>
            <p className="text-sm text-gray-400 mb-4">
              {new Date(weather.time).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h3 className="text-2xl text-primary_1 font-bold mb-2">
              {Math.round(weather.temperature)} °C
            </h3>
            <div className="flex justify-center items-center mb-4">
              {/* Weather icon can go here */}
            </div>
            <p className="text-md text-gray-500">
              Wind Speed: {weather.windspeed} km/h
            </p>
            <p className="text-md text-gray-500">
              Weather: {getWeatherCondition(weather.weathercode)}
            </p>
          </div>
          <div className="flex flex-col mx-5 gap-5">
            <div className="relative border py-3 w-60 border-gray-300 rounded-lg text-center bg-gray-50 shadow-2xl max-w-xs mx-auto">
              <p className="">Total animals</p>
              <p className="text-secondary_1 font-semibold text-xl">
                {totalAnimals} animals
              </p>
              <p className="text-secondary_2">
                <span className="text-primary_2 italic">+10% more</span> than
                last month
              </p>
              <div className="absolute right-0 top-0 text-gray-500 w-8 h-4 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  xmlSpace="preserve"
                  style={{
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: 2,
                  }}
                >
                  <path
                    d="m37.278 14.519-21.203-2.45a4 4 0 0 0-4.433 3.514l-.763 6.606"
                    style={{
                      fill: "none",
                      stroke: "#222a33",
                      strokeWidth: "2px",
                    }}
                  />
                  <path
                    d="m15.001 20.404.322-2.782a1.867 1.867 0 0 1 2.069-1.641l2.976.344M54 45.199a4 4 0 0 0 2.836-4.507l-3.634-21.575a4.001 4.001 0 0 0-4.609-3.28l-38.149 6.425a4.001 4.001 0 0 0-3.28 4.609l3.634 21.575a4 4 0 0 0 4.609 3.28L33.5 48.678"
                    style={{
                      fill: "none",
                      stroke: "#222a33",
                      strokeWidth: "2px",
                    }}
                  />
                  <path
                    d="m19.474 47.253-2.823.476a1.999 1.999 0 0 1-2.305-1.64l-.443-2.632m30.623-23.148 2.823-.475a1.998 1.998 0 0 1 2.305 1.64l.443 2.631m-38.365 6.462-.443-2.632a1.999 1.999 0 0 1 1.64-2.304l2.823-.476M33.221 29.788A2.334 2.334 0 1 0 32 33.781a2.336 2.336 0 0 1 2.69 1.914 2.336 2.336 0 0 1-3.911 2.079M31.225 29.177l-.311-1.841M33.086 40.226l-.311-1.841M54 42a3 3 0 0 0-3-3H41a3 3 0 0 0-3 3v6.594a7.5 7.5 0 0 0 4.495 6.872L46 57l3.505-1.534A7.5 7.5 0 0 0 54 48.594V42z"
                    style={{
                      fill: "none",
                      stroke: "#222a33",
                      strokeWidth: "2px",
                    }}
                  />
                  <path
                    d="m42.75 47.248 2.5 2 4-3.5"
                    style={{
                      fill: "none",
                      stroke: "#222a33",
                      strokeWidth: "2px",
                    }}
                  />
                </svg>
              </div>
            </div>
            <div className="relative border py-3 w-60 border-gray-300 rounded-lg text-center bg-gray-50 shadow-2xl max-w-xs mx-auto">
              <p className="">Revenue</p>
              <p className="text-secondary_1 font-semibold text-xl">
                ${totalSales}
              </p>
              <p className="text-secondary_2">
                <span className="text-primary_2 italic">+70% more</span> than
                last month
              </p>
              <div className="absolute right-0 top-0 text-gray-500 w-8 h-4 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  xmlSpace="preserve"
                  style={{
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: 2,
                  }}
                >
                  <path
                    d="m37.278 14.519-21.203-2.45a4 4 0 0 0-4.433 3.514l-.763 6.606"
                    style={{
                      fill: "none",
                      stroke: "#222a33",
                      strokeWidth: "2px",
                    }}
                  />
                  <path
                    d="m15.001 20.404.322-2.782a1.867 1.867 0 0 1 2.069-1.641l2.976.344M54 45.199a4 4 0 0 0 2.836-4.507l-3.634-21.575a4.001 4.001 0 0 0-4.609-3.28l-38.149 6.425a4.001 4.001 0 0 0-3.28 4.609l3.634 21.575a4 4 0 0 0 4.609 3.28L33.5 48.678"
                    style={{
                      fill: "none",
                      stroke: "#222a33",
                      strokeWidth: "2px",
                    }}
                  />
                  <path
                    d="m19.474 47.253-2.823.476a1.999 1.999 0 0 1-2.305-1.64l-.443-2.632m30.623-23.148 2.823-.475a1.998 1.998 0 0 1 2.305 1.64l.443 2.631m-38.365 6.462-.443-2.632a1.999 1.999 0 0 1 1.64-2.304l2.823-.476M33.221 29.788A2.334 2.334 0 1 0 32 33.781a2.336 2.336 0 0 1 2.69 1.914 2.336 2.336 0 0 1-3.911 2.079M31.225 29.177l-.311-1.841M33.086 40.226l-.311-1.841M54 42a3 3 0 0 0-3-3H41a3 3 0 0 0-3 3v6.594a7.5 7.5 0 0 0 4.495 6.872L46 57l3.505-1.534A7.5 7.5 0 0 0 54 48.594V42z"
                    style={{
                      fill: "none",
                      stroke: "#222a33",
                      strokeWidth: "2px",
                    }}
                  />
                  <path
                    d="m42.75 47.248 2.5 2 4-3.5"
                    style={{
                      fill: "none",
                      stroke: "#222a33",
                      strokeWidth: "2px",
                    }}
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="relative">
              <img
                className="rounded-3xl ml-5 w-full"
                src="https://img.freepik.com/premium-photo/three-bottles-milk-tree-stump-rural-setting_538547-4936.jpg?ga=GA1.1.15938311.1690954381&semt=ais_hybrid"
              />
              <div className="absolute border left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 py-3 w-60 border-gray-300 rounded-lg text-center bg-gray-50 shadow-2xl max-w-xs mx-auto">
                <p className="">Production</p>
                <p className="text-secondary_1 font-semibold text-xl">
                  {totalProduce} litres
                </p>
                <p className="text-secondary_2">
                  <span className="text-primary_2 italic">+15% more</span> than
                  last month
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
  <div className="w-1/2 p-2">
    <h1 className="text-secondary_1 text-xl font-semibold">
      Sales Overview
    </h1>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={farmerSales}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="saleDate">
          <Label value="Sales Date" offset={-5} position="insideBottom" />
        </XAxis>
        <YAxis>
          <Label value="Sales Amount" angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#3051A5"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>

  <div className="w-1/2 p-2">
    <h1 className="text-secondary_1 text-xl font-semibold">
      Production Overview
    </h1>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={farmerProduce}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="produceDate">
          <Label
            value="Production Date"
            offset={-5}
            position="insideBottom"
          />
        </XAxis>
        <YAxis>
          <Label value="Quantity" angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" fill="#3051A5" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

      </div>
    </>
  );
}

export default Dashboard;