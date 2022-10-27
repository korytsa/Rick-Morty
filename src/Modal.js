import './modal.scss';

export default function Modal({active, setActive, name, img, status, species, origin, location, gender}){
    return(
        <div className={active ? "modal modal_active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal_content model_content_active" : "modal_content"} onClick={e => e.stopPropagation()}>
                {/* <button onClick={() => setActive(false)}>=</button> */}
                <img src={img} alt={name} />
                <div className='modal_content_info'>
                    <p>Name: <span>{name}</span></p>
                    <p>Origin: <span>{origin}</span></p>
                    <p>Status: <span>{status}</span></p>
                    <p>Location: <span>{location}</span></p>
                    <p>Species: <span>{species}</span></p>
                    <p>Gender: <span>{gender}</span></p>
                </div>
            </div>
        </div>
    )
}