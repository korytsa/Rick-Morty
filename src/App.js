import { useEffect, useState } from "react";
import './App.scss';
import Modal from "./Modal";
import Pagination from "./Pagination";

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

  const btns = ['on', 'off'];
  const [active, setActive] = useState(btns[0]);

  useEffect(() => {
    if(fetching){
      fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((result) => result.json())
      .then((data) => {
        if(active === 'off'){
          setCharacters([...characters, ...data.results]);
          setPage(prevState => prevState + 1);
        } else{
          setCharacters(data.results)
        }
      })
      .finally(() => setFetching(false))
    }
  },[fetching, page])

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

const paginate = pageNumber => {
  setPage(pageNumber)
  setFetching(true)
}
const nextPage = () => {
  if(page >= 42){
    setFetching(false)
  }else{
    setPage(prev => prev + 1)
    setFetching(true)
  }
};
const prevPage = () => {
  if(page <= 1){
    setFetching(false)
  }else{
    setPage(prev => prev - 1)
    setFetching(true)
  }
}
  return (
    <div className="container">
      <div className="allCards" id="start">
        {allCharacters}
        {active === 'on' ? <Pagination 
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
        /> : false }
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

      <div className="right_side">
          <div className="toggle">
          <h3>Page</h3>
          {btns.map(btn => (
            <button
            className="blue"
            key={btn}
            active={active === btn}
            onClick={() => setActive(btn)}
            >{btn}</button>
          ))}
        </div>
        <a href="#start" className="top blue">&#8593;</a>
      </div>
    </div>
  );
}

export default App;
