import { useState, useEffect } from 'react'
import * as petService from "./services/petService.js"
import './App.css'
import PetList from "./components/PetList/PetList.jsx"
import PetDetail from "./components/PetDetail/PetDetail.jsx"
import PetForm from "./components/PetForm/PetForm.jsx"


function App() {
  const [pets, setPets] = useState([])
  const [selected,setSelected] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleSelect = (pet) => {
    setSelected(pet)
  };

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen)
  };

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);
      // Add the pet object and the current pets to a new array, and
      // set that array as the new pets
      if (newPet.error) {
        throw new Error(newPet.error);
      }

      setPets([newPet, ...pets]);
      setIsFormOpen(false)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect( () => {
    const fetchPets = async () => {
      try {
        const fetchedPets = await petService.index()
        if (fetchedPets.error) {
          throw new Error(fetchedPets.error)
        }  
        setPets(fetchedPets)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPets()
}, [])



  return (
    <>
      <PetList
        pets={pets}
        handleSelect={handleSelect}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (<PetForm handleAddPet={handleAddPet} />) : (<PetDetail selected={selected} />)}
      
      
    </>
  );
};

export default App
