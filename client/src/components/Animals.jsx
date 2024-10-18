import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

function Animals({farmerId}) {
    const [animals, setAnimals] = useState([])   

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/farmers/1`)
            .then(response => response.json())
            .then(data => setAnimals(data.animals))            
    },[]);

     
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
      <div className="ml-40">
        <h1 className="font-extrabold text-primary_2 text-3xl pt-5">Animals</h1>
        <p className="text-secondary_1 font-semibold text-lg">
          {animals.length} animals found
        </p>
        <div className="flex flex-wrap justify-start">
        
          {animals.map((animal) => (
            <Link 
            to={`/animal_detail/${animal.id}`} 
            key={animal.id} 
            >
            <div
              key={animal.id}
              className="flex flex-col mx-5 my-5 bg-background rounded-3xl w-56 transition-transform duration-200 hover:ring-2 hover:ring-primary_3 hover:scale-105 hover:shadow-lg"
            >
              <div className="relative rounded-md ">
                <p className="bg-primary_1 rounded-xl p-2 absolute top-0 right-0 m-2 text-white font-bold">
                  Cow
                </p>
                <img
                  className="rounded-3xl h-60 w-56"
                  src="https://img.freepik.com/free-photo/photorealistic-view-cow-grazing-nature-outdoors_23-2151294279.jpg?t=st=1729195647~exp=1729199247~hmac=ba449bfe6fe5b7ca4e316540d238d7a8768720bf9a3dda25ff4f4c4bf6e6f4b2&w=360"
                />
              </div>

              <div className="flex justify-between items-center">
                <h1 className="px-5 text-primary_1 font-extrabold text-2xl">
                  {animal.name}
                </h1>
                <p className="px-5 text-secondary_2">{animal.breed}</p>
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

export default Animals