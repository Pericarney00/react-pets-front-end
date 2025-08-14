import { useState, useEffect } from 'react'
import * as petService from "./services/petService.js"
import './App.css'
import PetList from "./components/PetList/PetList.jsx"


function App() {
  const [pets, setPets] = useState([])

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
      <div>
      <PetList pets={pets} />
      </div>
    
    </>
  
  );
    
  
};

export default App
