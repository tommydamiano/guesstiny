import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from './Footer'
import '../styles/Home.css'

function Home() {
  return (
    <div className="home">
      <motion.div 
        className="home-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="subtitle">it is your...</div>
        <h1 className="title">Guesstiny</h1>
        <div className="button-container">
          <Link to="/game" className="nav-button start-game">Start game</Link>
          <Link to="/leaderboard" className="nav-button leaderboard">Leaderboard</Link>
        </div>
      </motion.div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  )
}

export default Home
