const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`
//localhost:3000/pets
//API call to grab pets
const index = async () => {
  try { 
    const res = await fetch(BASE_URL); //response object
  return res.json(); //resolves the response
  } catch (error) {
    console.log(error)
  }
}


export { index }