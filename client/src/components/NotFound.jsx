import { Link } from 'react-router-dom'
import '../styles/NotFound.css'

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <p className="not-found-title">Trying to go to a page that doesn't exist? What are you, a dingleberry?</p>
        <Link to="/" className="nav-button return-home-btn">
          Return to home
        </Link>
      </div>
    </div>
  )
}

export default NotFound 
 