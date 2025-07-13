import { useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/TopSecret.css'
import trollImage from '../img/troll.png'
import BackButton from './BackButton'

function TopSecret() {
  const [password, setPassword] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [isWrong, setIsWrong] = useState(false)

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === '') {
      setIsCorrect(true)
      setIsWrong(false)
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')
    } else {
      setIsWrong(true)
      setTimeout(() => setIsWrong(false), 500)
    }
  }

  return (
    <div className="top-secret">
      <BackButton />
      {isCorrect ? (
        <motion.div 
          className="troll-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="troll-text">The pride of 1st place is the greatest prize of all</p>
          <img src={trollImage} alt="Troll" className="troll-image" />
        </motion.div>
      ) : (
        <motion.div 
          className="secret-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="secret-header">
            <h1 className="secret-title">Top Secret Reward 🏆</h1>
          </div>
          <div className="secret-content">
            <p className="congrats-text">Congrats on 1st you freaking dweeb 🎉</p>
            <p className="instruction-text">I hope you memorized the password... enter it below to access a special reward</p>
            <p className="warning-text">Don't share the password with ANYONE!!! Winners only 🙅‍♂️</p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <div className="input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className={`password-input ${isWrong ? 'wrong-password' : ''}`}
                required
              />
              <button type="submit" className="submit-btn">
                <span>Unlock</span>
                <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  )
}

export default TopSecret 