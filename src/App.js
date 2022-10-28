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

  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    console.log('fetching')
    if(fetching){
      fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((result) => result.json())
      .then((data) => {
        setCharacters([...characters, ...data.results]);
        setPage(prevState => prevState + 1);
      })
      .finally(() => setFetching(false))
    }
  },[fetching])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return function(){
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler = (e) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerWidth) < 100){
      setFetching(true)
    }
  }

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
        }}}>
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
