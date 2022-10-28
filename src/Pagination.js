import './pagination.scss';

export default function Pagination ({ paginate, prevPage, nextPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= 42; i++){
        pageNumbers.push(i)
    }

    return (
        <div className='container_pagination'>
            <ul className="pagination">
                {
                    pageNumbers.map(number => (
                        <li key={number} onClick={() => paginate(number)}>{number}</li>
                    ))
                }
                
            </ul>
            <div className='buttons'>
                <button onClick={() => prevPage()}>Prev</button>
                <button onClick={() => nextPage()}>Next</button>
            </div>
        </div>
    )
}