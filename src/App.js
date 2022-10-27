import { useEffect, useState } from "react";
import './App.scss';

function App() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
    .then((result) => result.json())
    .then((data) => {
      console.log(data.results)
      setCharacters(data.results)
    })
  },[])

  
  const allCharacters = characters.map((item) => {
    return (
      <div className="card">
        <img src={`${item.image}`} alt={`${item.name}`} />
        <h3>{`${item.name}`}</h3>
      </div>)
  })

  return (
    <>
      <div className="allCards">
        {allCharacters}

      </div>
      
    </>
  );
}

export default App;
