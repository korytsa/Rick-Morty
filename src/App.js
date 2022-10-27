import { useEffect, useState } from "react";
import './App.scss';
import Modal from "./Modal";

function App() {
  const [characters, setCharacters] = useState([]);

  const [modalActive, setModalActive] = useState(false);
  const [modalName, setModalName] = useState(null);
  const [modalImg, setModalImg] = useState(null);
  const [modalStaus, setModalStatus] = useState(null);
  const [modalSpecies, setModalSpecies] = useState(null);
  const [modalOrigin, setModalOrigin] = useState(null);
  const [modalLocation, setModalLocation] = useState(null);
  const [modalGender, setModalGender] = useState(null);


  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
    .then((result) => result.json())
    .then((data) => {
      setCharacters(data.results)
    })
  },[])

  const allCharacters = characters.map((item) => {
    return (
      <div 
      className="card" 
      key={`${item.id} + ${item.name}`} 
      data-name={`${item.name}`}
      onClick={(e) => {
        setModalActive(true);
        if(e.currentTarget.dataset.name){
          setModalName(item.name);
          setModalImg(item.image);
          setModalStatus(item.status);
          setModalSpecies(item.species);
          setModalOrigin(item.origin.name);
          setModalLocation(item.location.name);
          setModalGender(item.gender);
        }
        }}>
        <img src={`${item.image}`} alt={`${item.name}`} />
        <h3>{`${item.name}`}</h3>
      </div>)
  })

  return (
    <>
      <div className="allCards">
        {allCharacters}
      </div>
      <Modal 
      active={modalActive} 
      setActive={setModalActive}
      name={modalName}
      img={modalImg}
      status={modalStaus}
      species={modalSpecies}
      origin={modalOrigin}
      location={modalLocation}
      gender={modalGender}
       />
    </>
  );
}

export default App;
