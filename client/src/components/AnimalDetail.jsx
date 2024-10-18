import React from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
  } from 'recharts';

function AnimalDetail({ animalId }) {
  // const [animal, setAnimal] = useState({})

  // useEffect(() => {
  //     fetch(`http://localhost:5000/animals/${animalId}`)
  //         .then(response => response.json())
  //         .then(data => setAnimal(data))
  //         .catch(error => console.error('Error fetching animals:', error));
  // }, [animalId]);

  const animal = {
    id: 1,
    name: "Bessie",
    breed: "Holstein",
    age: 5,
    health_status: "Healthy",
    birth_date: "2019-05-15",
    ownerId: 1,
    owner: "Imelda",
    health_records: [
      {
        id: 1,
        animal_id: 1,
        checkup_date: "2023-05-10",
        treatment: "Vaccination",
        notes: "Routine checkup",
        vet_name: "Dr. Brown",
      },
      {
        id: 2,
        animal_id: 1,
        checkup_date: "2023-06-15",
        treatment: "Deworming",
        notes: "Standard deworming treatment.",
        vet_name: "Dr. Smith",
      },
      {
        id: 3,
        animal_id: 1,
        checkup_date: "2023-08-20",
        treatment: "Dental Checkup",
        notes: "No issues found, teeth cleaning recommended.",
        vet_name: "Dr. Lee",
      },
      {
        id: 4,
        animal_id: 1,
        checkup_date: "2023-09-10",
        treatment: "Health Examination",
        notes: "Overall health check, vaccinations up to date.",
        vet_name: "Dr. Adams",
      },
    ],
    production: [
      {
        animal_id: 1,
        product_type: "Milk",
        quantity: 20.5,
        production_date: "2023-10-01",
      },
      {
        animal_id: 1,
        product_type: "Milk",
        quantity: 18,
        production_date: "2023-10-02",
      },
      {
        animal_id: 1,
        product_type: "Milk",
        quantity: 25,
        production_date: "2023-10-03",
      },
    ],
  };
  

  return (
    <>
      <div className="ml-60 mt-5">
        <button className="bg-primary_2 hover:bg-secondary_1 rounded-lg p-2 text-xl">
          &larr; Back
        </button>
        <div className="flex mt-10">
          <img
            className="rounded-l-3xl ml-5 w-1/4"
            src="https://img.freepik.com/free-photo/photorealistic-view-cow-grazing-nature-outdoors_23-2151294279.jpg?t=st=1729195647~exp=1729199247~hmac=ba449bfe6fe5b7ca4e316540d238d7a8768720bf9a3dda25ff4f4c4bf6e6f4b2&w=360"
          />
          <div className="bg-white shadow-md rounded-r-lg p-6 w-1/4">
            <h1 className="font-extrabold text-primary_2 text-3xl pb-3 border-b-2 border-gray-200">
              {animal.name}
            </h1>
            <p className="text-secondary_2 mt-4 text-lg">
              <span className="font-semibold">Breed:</span> {animal.breed}
            </p>
            <p className="text-secondary_2 text-lg">
              <span className="font-semibold">Age:</span> {animal.age}
            </p>
            <p className="text-secondary_2 text-lg">
              <span className="font-semibold">Status:</span>{" "}
              {animal.health_status}
            </p>
            <p className="text-secondary_2 text-lg">
              <span className="font-semibold">D.O.B.:</span> {animal.birth_date}
            </p>
            <p className="text-secondary_2 text-lg">
              <span className="font-semibold">My owner:</span> {animal.owner}
            </p>
            <div className="flex space-x-4 mt-4">
              <button className="bg-secondary_1 font-bold py-2 px-4 rounded hover:bg-primary_2 transition duration-200 ease-in-out">Edit</button>
              <button className="bg-red-600 font-bold py-2 px-4 rounded hover:bg-primary_2 transition duration-200 ease-in-out">Delete</button> 
            </div>
            
          </div>
          <div className="flex-grow">
            <h2 className="mx-5 font-bold text-secondary_1 text-xl mt-5 border-b-2 border-gray-200">Milk Production Over Time</h2>  
            <ResponsiveContainer width="100%" height={320}>
            <LineChart
                data={animal.production}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="production_date"><Label value="Production Date" offset={-5} position="insideBottom" /></XAxis>
                <YAxis><Label value="Quantity Produced" angle={-90} position="insideLeft" /></YAxis>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="quantity" stroke="#3051A5" activeDot={{ r: 8 }} />                
            </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <h1 className="font-bold text-secondary_1 text-xl mt-5 border-b-2 border-gray-200">{animal.name}'s health records</h1>
        <table className="table-auto my-5 w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-primary_1 text-white">
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Treatment</th>
              <th className="px-6 py-3 text-left">Remarks</th>
              <th className="px-6 py-3 text-left">Vet Name</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {animal.health_records.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-secondary_2">
                  {record.checkup_date}
                </td>
                <td className="px-6 py-4 text-secondary_2">
                  {record.treatment}
                </td>
                <td className="px-6 py-4 text-secondary_2">{record.notes}</td>
                <td className="px-6 py-4 text-secondary_2">
                  {record.vet_name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>        
      </div>
    </>
  );
}

export default AnimalDetail;