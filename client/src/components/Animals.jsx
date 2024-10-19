import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Animals({ farmerId }) {
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({
    name: '',
    image: '',
    breed: '',
    age: '',
    health_status: '',
    birth_date: ''
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/farmers/2`)
      .then((response) => response.json())
      .then((data) => setAnimals(data.animals));
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnimal({
      ...newAnimal,
      [name]: value, 
    });
  };

  function handleSubmitAnimal(e){
    e.preventDefault();
    //const farmId =2
    const createdAnimal = {
      name: newAnimal.name,
      image: newAnimal.image,
      breed: newAnimal.breed,
      age: newAnimal.age,
      health_status: newAnimal.health_status,
      birth_date: newAnimal.birth_date,
      farmer_id: farmerId,
      animal_type_id: 1
    };

    fetch("http://127.0.0.1:5000/animals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createdAnimal),
    })
      .then((res) => res.json())
      .then((data) => {
        setAnimals([data, ...animals]);

        setNewAnimal({
          name: '',
          image: '',
          breed: '',
          age: '',
          health_status: '',
          birth_date: ''
        })
      }
      );
  }

  
  // const animals = [
  //     {
  //         id: 1,
  //         name: 'Bessie',
  //         breed: 'Holstein',
  //         age: 5,
  //         health_status: 'Healthy',
  //         birth_date: '2019-05-15',
  //         ownerId: 1
  //     },
  //     {
  //         id: 2,
  //         name: 'Daisy',
  //         breed: 'Jersey',
  //         age: 3,
  //         health_status: 'Healthy',
  //         birth_date: '2021-03-21',
  //         ownerId: 1
  //     },
  //     {
  //         id: 3,
  //         name: 'Clucky',
  //         breed: 'Leghorn',
  //         age: 1,
  //         health_status: 'Healthy',
  //         birth_date: '2023-01-01',
  //         ownerId: 2
  //     },
  //     {
  //         id: 1,
  //         name: 'Bessie',
  //         breed: 'Holstein',
  //         age: 5,
  //         health_status: 'Healthy',
  //         birth_date: '2019-05-15',
  //         ownerId: 1
  //     },
  //     {
  //         id: 2,
  //         name: 'Daisy',
  //         breed: 'Jersey',
  //         age: 3,
  //         health_status: 'Healthy',
  //         birth_date: '2021-03-21',
  //         ownerId: 1
  //     },
  //     {
  //         id: 3,
  //         name: 'Clucky',
  //         breed: 'Leghorn',
  //         age: 1,
  //         health_status: 'Healthy',
  //         birth_date: '2023-01-01',
  //         ownerId: 2
  //     }
  // ];

  return (
    <>
      <div className="ml-60">
        <h1 className="font-extrabold text-primary_2 text-3xl pt-5">Animals</h1>
        <p className="text-secondary_1 font-semibold text-lg">
          {animals.length} animals found
        </p>
        <div>
          <form onSubmit={handleSubmitAnimal} className="flex flex-row justify-between items-center gap-6 p-4 bg-gray-100 shadow-lg rounded-lg w-full my-10">
            <label className="block w-1/6">
              <span className="block text-secondary_1 font-semibold mb-1">
                Name
              </span>
              <input
                type="text"
                name="name"
                value={newAnimal.name}
                onChange={handleInputChange}
                className="border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200"
              />
            </label>

            <label className="block w-1/6">
              <span className="block text-secondary_1 font-semibold mb-1">
                Image Url
              </span>
              <input
                type="text"
                name="image"
                value={newAnimal.image}
                onChange={handleInputChange}
                className="border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200"
              />
            </label>

            <label className="block w-1/6">
              <span className="block text-secondary_1 font-semibold mb-1">
                Breed
              </span>
              <input
                type="text"
                name="breed"
                value={newAnimal.breed}
                onChange={handleInputChange}
                className="border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200"
              />
            </label>

            <label className="block w-1/6">
              <span className="block text-secondary_1 font-semibold mb-1">
                Age
              </span>
              <input
                type="number"
                name="age"
                value={newAnimal.age}
                onChange={handleInputChange}
                className="border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200"
              />
            </label>

            <label className="block w-1/6">
              <span className="block text-secondary_1 font-semibold mb-1">
                Health Status
              </span>
              <input
                type="text"
                name="health_status"
                value={newAnimal.health_status}
                onChange={handleInputChange}
                className="border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200"
              />
            </label>

            <label className="block w-1/6">
              <span className="block text-secondary_1 font-semibold mb-1">
                Date of Birth
              </span>
              <input
                type="date"
                name="birth_date"
                value={newAnimal.birth_date}
                onChange={handleInputChange}
                className="border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200"
              />
            </label>

            <button className="p-3 font-bold text-white bg-primary_2 hover:bg-primary_2-dark rounded-lg transition duration-200">
              Submit
            </button>
          </form>
        </div>
        <div className="flex flex-wrap justify-start">
          {animals.map((animal) => (
            <Link to={`/animal_detail/${animal.id}`} key={animal.id}>
              <div
                key={animal.id}
                className="flex flex-col mx-5 my-5 bg-background rounded-3xl w-56 transition-transform duration-200 hover:ring-2 hover:ring-primary_3 hover:scale-105 hover:shadow-lg"
              >
                <div className="relative rounded-md ">
                  <p className="bg-primary_1 rounded-xl p-2 absolute top-0 right-0 m-2 text-white font-bold">
                    {animal.breed}
                  </p>
                  <img className="rounded-3xl h-60 w-56" src={animal.image} />
                </div>

                <div className="flex justify-between items-center">
                  <h1 className="px-5 text-primary_1 font-extrabold text-2xl">
                    {animal.name}
                  </h1>
                  <p className="px-5 text-secondary_2">
                    {animal.animal_type.type_name}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 px-5 py-2">
                  <p className="bg-gray-200 text-secondary_2 px-2 py-1 rounded-full inline-block">
                    Age: {animal.age}
                  </p>
                  <p className="bg-gray-200 text-secondary_2 px-2 py-1 rounded-full inline-block">
                    Status: {animal.health_status}
                  </p>
                  <p className="bg-gray-200 text-secondary_2 px-2 py-1 rounded-full inline-block">
                    D.O.B: {animal.birth_date}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Animals;
