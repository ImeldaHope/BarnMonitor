import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

const AnimalTypeList = () => {
  const [animalTypes, setAnimalTypes] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [typeName, setTypeName] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://barnmonitor.onrender.com/animal_types")
      .then((response) => response.json())
      .then((data) => setAnimalTypes(data))
      .catch((error) => console.error("Error:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnimalType = { type_name: typeName, description };

    fetch("https://barnmonitor.onrender.com/animal_types", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAnimalType),
    })
      .then((response) => response.json())
      .then((data) => {
        setAnimalTypes([...animalTypes, data]);
        setTypeName("");
        setDescription("");
        setSuccessMessage("Animal type added successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Failed to add animal type.");
      });
  };

  const handleTypeClick = (typeId) => {
    fetch(`https://barnmonitor.onrender.com/animal_types/${typeId}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedType(data.type);
        setAnimals(data.animals);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = (typeId) => {
    if (window.confirm("Are you sure you want to delete this animal type?")) {
      fetch(`https://barnmonitor.onrender.com/animal_types/${typeId}`, {
        method: "DELETE",
      })
        .then(() => {
          setAnimalTypes(animalTypes.filter((type) => type.id !== typeId));
          setSuccessMessage("Animal type deleted successfully!");
        })
        .catch((error) => {
          console.error("Error:", error);
          setErrorMessage("Failed to delete animal type.");
        });
    }
  };

  return (
    <div className="animal-type-container container mx-auto p-6">
      <h2 className="text-primary_1 font-black text-2xl mb-8">Animal Types</h2>
      <form
        onSubmit={handleSubmit}
        className="shadow-lg p-6 rounded-lg bg-white mb-8"
      >
        <input
          type="text"
          value={typeName}
          onChange={(e) => setTypeName(e.target.value)}
          placeholder="Type Name"
          className="border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200 mb-4"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200 mb-4"
        />
        <button
          className="p-3 font-bold text-white bg-primary_2 hover:bg-primary_2-dark rounded-lg transition duration-200 mb-4"
          type="submit"
        >
          Add Animal Type
        </button>
      </form>
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {animalTypes.map((type) => (
          <div className="shadow-md p-6 rounded-lg bg-white" key={type.id}>
            <h3 className="text-primary_1 font-black text-xl mb-4">
              {type.type_name}
            </h3>
            <div className="flex justify-between">
              <button
                className="text-gray-100 bg-blue-600 font-bold py-2 px-4 rounded hover:bg-primary_2 transition duration-200 ease-in-out flex items-center space-x-2"
                onClick={() => handleTypeClick(type.id)}
              >
                <FontAwesomeIcon icon={faEye} /> <span>View Animals</span>
              </button>
              <button
                className="text-gray-100 bg-red-600 font-bold py-2 px-4 rounded hover:bg-primary_2 transition duration-200 ease-in-out flex items-center space-x-2"
                onClick={() => handleDelete(type.id)}
              >
                <FontAwesomeIcon icon={faTrash} /> <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedType && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-primary_1 font-black text-2xl mb-8">
            {selectedType.type_name} Animals
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {animals.map((animal) => (
              <div
                className="shadow-md p-4 rounded-lg bg-gray-50"
                key={animal.id}
              >
                <strong>{animal.name}</strong> - {animal.health_status} (Born:{" "}
                {animal.birth_date})
                <h4 className="text-primary_1 font-black text-lg mt-4">
                  Health Records
                </h4>
                <ul>
                  {animal.health_records &&
                    animal.health_records.map((record) => (
                      <li className="text-secondary_2" key={record.id}>
                        {record.treatment} by {record.vet_name} on{" "}
                        {record.checkup_date}
                      </li>
                    ))}
                </ul>
                <h4 className="text-primary_1 font-black text-lg mt-4">
                  Production Records
                </h4>
                <ul>
                  {animal.production_records &&
                    animal.production_records.map((record) => (
                      <li className="text-secondary_2" key={record.id}>
                        {record.product_type}: {record.quantity} on{" "}
                        {record.date}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalTypeList;
