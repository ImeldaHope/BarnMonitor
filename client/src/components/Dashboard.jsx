import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
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
      <div className="">
        <h1 className="font-extrabold text-primary_2 text-3xl pt-5">
          Dashboard
        </h1>
        <p>
          Good morning,{" "}
          <span className="font-semibold italic">{farmer.name}</span>
        </p>
        <p>Checkout today's insights</p>
        <div className="border border-gray-300 rounded-lg p-6 text-center bg-gray-50 shadow-2xl max-w-xs mx-auto">
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
        
      </div>
    </>
  );
}

export default Dashboard;
