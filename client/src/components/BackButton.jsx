import { Link } from 'react-router-dom'
import '../styles/BackButton.css'

function BackButton() {
  return (
    <Link to="/" className="back-button">Home</Link>
  )
}

export default BackButton 
