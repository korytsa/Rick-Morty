import './load.scss'

export default function Load() {
    return (
        <div className="loader_container">
      	  <div className="spinner"></div>
            <span className="loading">Loading...</span>
        </div>
    )
}