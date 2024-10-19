import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
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

function Dashboard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [productionData, setProductionData] = useState([]);

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

  // useEffect(() => {
  //   // Fetch data from API
  //   fetch('your-api-endpoint/farm-data')
  //     .then(response => response.json())
  //     .then(data => {
  //       // Process production data
  //       const processedData = [];

  //       data.animals.forEach(animal => {
  //         animal.production.forEach(record => {
  //           const existingRecord = processedData.find(item => item.date === record.production_date);
  //           if (existingRecord) {
  //             existingRecord.quantity += record.quantity;
  //           } else {
  //             processedData.push({ date: record.production_date, quantity: record.quantity });
  //           }
  //         });
  //       });

  //       // Sort by date for better chart display
  //       processedData.sort((a, b) => new Date(a.date) - new Date(b.date));

  //       setProductionData(processedData);
  //     })
  //     .catch(error => console.error('Error fetching farm data:', error));
  // }, []);

  const farmer = {
    address: "123 Farm Lane",
    animals: [
      {
        age: 5,
        animal_type: {
          description: "Dairy Cattle",
          id: 1,
          type_name: "Cow",
        },
        animal_type_id: 1,
        birth_date: "2019-05-15",
        breed: "Holstein",
        farmer: {
          address: "123 Farm Lane",
          email: "john@example.com",
          id: 1,
          name: "John Doe",
          password: "password123",
          phone: "555-1234",
        },
        farmer_id: 1,
        feed_records: [
          {
            animal_id: 1,
            date: "2023-10-01",
            feed_type: "Hay",
            id: 1,
            quantity: 10,
          },
        ],
        health_records: [
          {
            animal_id: 1,
            checkup_date: "2023-05-10 00:00:00",
            id: 1,
            notes: "Routine checkup",
            treatment: "Vaccination",
            vet_name: "Dr. Brown",
          },
        ],
        health_status: "Healthy",
        id: 1,
        image:
          "https://img.freepik.com/free-photo/photorealistic-view-cow-grazing-nature-outdoors_23-2151294279.jpg?t=st=1729195647~exp=1729199247~hmac=ba449bfe6fe5b7ca4e316540d238d7a8768720bf9a3dda25ff4f4c4bf6e6f4b2&w=360",
        name: "Bessie",
        production: [
          {
            animal_id: 1,
            id: 1,
            product_type: "Milk",
            production_date: "2023-10-01",
            quantity: 20,
            sales: [],
          },
          {
            animal_id: 1,
            id: 2,
            product_type: "Milk",
            production_date: "2023-10-02",
            quantity: 18,
            sales: [],
          },
        ],
        sales: [
          {
            amount: 150.0,
            animal_id: 1,
            id: 1,
            product_type: "Milk",
            production: null,
            production_id: null,
            quantity_sold: 15,
            sale_date: "2023-10-5",
          },
        ],
      },
      {
        age: 3,
        animal_type: {
          description: "Dairy Cattle",
          id: 1,
          type_name: "Cow",
        },
        animal_type_id: 1,
        birth_date: "2021-03-21",
        breed: "Jersey",
        farmer: {
          address: "123 Farm Lane",
          email: "john@example.com",
          id: 1,
          name: "John Doe",
          password: "password123",
          phone: "555-1234",
        },
        farmer_id: 1,
        feed_records: [
          {
            animal_id: 2,
            date: "2023-10-02",
            feed_type: "Grain",
            id: 2,
            quantity: 8,
          },
        ],
        health_records: [
          {
            animal_id: 2,
            checkup_date: "2023-06-20 00:00:00",
            id: 2,
            notes: "Lack of appetite",
            treatment: "Vitamin shot",
            vet_name: "Dr. Taylor",
          },
        ],
        health_status: "Healthy",
        id: 2,
        image:
          "https://img.freepik.com/premium-photo/horse-field-against-clear-sky_1048944-12488816.jpg?ga=GA1.1.15938311.1690954381&semt=ais_hybrid",
        name: "Daisy",
        production: [
          {
            animal_id: 2,
            id: 3,
            product_type: "Milk",
            production_date: "2023-10-03",
            quantity: 25,
            sales: [],
          },
        ],
        sales: [
          {
            amount: 120.0,
            animal_id: 2,
            id: 2,
            product_type: "Milk",
            production: null,
            production_id: null,
            quantity_sold: 10,
            sale_date: "2023-10-6",
          },
        ],
      },
    ],
    email: "john@example.com",
    id: 1,
    name: "John Doe",
    password: "password123",
    phone: "555-1234",
  };

  const salesData = [
    {
      amount: 150.0,
      animal: {
        age: 5,
        animal_type: {
          description: "Dairy Cattle",
          id: 1,
          type_name: "Cow",
        },
        animal_type_id: 1,
        birth_date: "2019-05-15",
        breed: "Holstein",
        farmer: {
          address: "123 Farm Lane",
          email: "john@example.com",
          id: 1,
          name: "John Doe",
          password: "password123",
          phone: "555-1234",
        },
        farmer_id: 1,
        feed_records: [
          {
            animal_id: 1,
            date: "2023-10-01",
            feed_type: "Hay",
            id: 1,
            quantity: 10,
          },
        ],
        health_records: [
          {
            animal_id: 1,
            checkup_date: "2023-05-10 00:00:00",
            id: 1,
            notes: "Routine checkup",
            treatment: "Vaccination",
            vet_name: "Dr. Brown",
          },
        ],
        health_status: "Healthy",
        id: 1,
        image:
          "https://img.freepik.com/free-photo/photorealistic-view-cow-grazing-nature-outdoors_23-2151294279.jpg?t=st=1729195647~exp=1729199247~hmac=ba449bfe6fe5b7ca4e316540d238d7a8768720bf9a3dda25ff4f4c4bf6e6f4b2&w=360",
        name: "Bessie",
        production: [
          {
            animal_id: 1,
            id: 1,
            product_type: "Milk",
            production_date: "2023-10-01",
            quantity: 20,
            sales: [],
          },
          {
            animal_id: 1,
            id: 2,
            product_type: "Milk",
            production_date: "2023-10-02",
            quantity: 18,
            sales: [],
          },
        ],
      },
      animal_id: 1,
      id: 1,
      product_type: "Milk",
      production: null,
      production_id: null,
      quantity_sold: 15,
      sale_date: "2023-10-5",
    },
    {
      amount: 120.0,
      animal: {
        age: 3,
        animal_type: {
          description: "Dairy Cattle",
          id: 1,
          type_name: "Cow",
        },
        animal_type_id: 1,
        birth_date: "2021-03-21",
        breed: "Jersey",
        farmer: {
          address: "123 Farm Lane",
          email: "john@example.com",
          id: 1,
          name: "John Doe",
          password: "password123",
          phone: "555-1234",
        },
        farmer_id: 1,
        feed_records: [
          {
            animal_id: 2,
            date: "2023-10-02",
            feed_type: "Grain",
            id: 2,
            quantity: 8,
          },
        ],
        health_records: [
          {
            animal_id: 2,
            checkup_date: "2023-06-20 00:00:00",
            id: 2,
            notes: "Lack of appetite",
            treatment: "Vitamin shot",
            vet_name: "Dr. Taylor",
          },
        ],
        health_status: "Healthy",
        id: 2,
        image:
          "https://img.freepik.com/premium-photo/horse-field-against-clear-sky_1048944-12488816.jpg?ga=GA1.1.15938311.1690954381&semt=ais_hybrid",
        name: "Daisy",
        production: [
          {
            animal_id: 2,
            id: 3,
            product_type: "Milk",
            production_date: "2023-10-03",
            quantity: 25,
            sales: [],
          },
        ],
      },
      animal_id: 2,
      id: 2,
      product_type: "Milk",
      production: null,
      production_id: null,
      quantity_sold: 10,
      sale_date: "2023-10-6",
    },
  ];

  const farmerId = 1;
  const filteredSales = salesData
    .filter((sale) => sale.animal.farmer_id === farmerId)
    .map((sale) => ({
      saleDate: sale.sale_date,
      amount: sale.amount,
    }));

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
      <div className="ml-60 mt-5">
        <h1 className="font-extrabold text-primary_2 text-3xl pt-5">
          Dashboard
        </h1>
        <p>
          Good morning,{" "}
          <span className="font-semibold italic">{farmer.name}</span>
        </p>
        <p>Checkout today's insights</p>
        <div className="flex flex-wrap justify-start py-5 px-5">
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
                64 animals
              </p>
              <p className="text-secondary_2">
                <span className="text-primary_2 italic">+10% more</span> than
                last month
              </p>
              <div className="absolute right-0 top-0 text-gray-500 w-8 h-4 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  xml:space="preserve"
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
              <p className="text-secondary_1 font-semibold text-xl">$64000</p>
              <p className="text-secondary_2">
                <span className="text-primary_2 italic">+70% more</span> than
                last month
              </p>
              <div className="absolute right-0 top-0 text-gray-500 w-8 h-4 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  xml:space="preserve"
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
        </div>
        <div className="flex">
          <div className="w-1/2">
            <h1 className="text-secondary_1 text-xl font-semibold">
              Sales Overview
            </h1>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={filteredSales}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="saleDate">
                  <Label
                    value="Sales Date"
                    offset={-5}
                    position="insideBottom"
                  />
                </XAxis>
                <YAxis>
                  <Label
                    value="Sales Amount"
                    angle={-90}
                    position="insideLeft"
                  />
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
          <div className="w-1/2">
            <div className="relative">
              <img
                className="rounded-3xl ml-5 w-full"
                src="https://img.freepik.com/premium-photo/three-bottles-milk-tree-stump-rural-setting_538547-4936.jpg?ga=GA1.1.15938311.1690954381&semt=ais_hybrid"
              />
              <div className="absolute border left-1/2 top-3/4 transform -translate-x-1/2 -translate-y-1/4 py-3 w-60 border-gray-300 rounded-lg text-center bg-gray-50 shadow-2xl max-w-xs mx-auto">
                <p className="">Total animals</p>
                <p className="text-secondary_1 font-semibold text-xl">
                  64 animals
                </p>
                <p className="text-secondary_2">
                  <span className="text-primary_2 italic">+10% more</span> than
                  last month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
