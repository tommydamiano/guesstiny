import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Modal.css'
import wojakGif from '../img/wojak-loading.gif'
import prettyGoodGif from '../img/pretty_good.gif'
import falconGif from '../img/falcon.gif'
import destinyGif from '../img/destiny.gif'
import batemanGif from '../img/bateman.gif'

const Modal = ({ show, onClose, score, scoreToBeat, highestScore, userIp }) => {
  const [playerName, setPlayerName] = useState('')
  const [showNameInput, setShowNameInput] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => { 
      document.body.style.overflow = 'auto' 
    }
  }, [show])

  useEffect(() => {
    if (show && scoreToBeat && score > scoreToBeat) {
      setShowNameInput(true)
      setIsSubmitted(false)
    }
  }, [show, score, scoreToBeat, highestScore])

  useEffect(() => {
    if (highestScore && score > highestScore) {
      setMessage('Oh my god... the top score...')
      setImgSrc(batemanGif)
    } else if (scoreToBeat && score > scoreToBeat) {
      setMessage('It was your Guesstiny to make it on the leaderboard...')
      setImgSrc(destinyGif)
    } else if (score < 5) {
      setMessage('Bro this is you rn')
      setImgSrc(wojakGif)
    } else if (score < 15) {
      setMessage('Larry is proud')
      setImgSrc(prettyGoodGif)
    } else {
      setMessage("Now THAT'S an epic score")
      setImgSrc(falconGif)
    }
  }, [score, scoreToBeat, highestScore])

  // moved below useEffect to remove error. it didnt break anything
  if (!show) return null

  const handleSubmit = async () => {
    if (playerName.length >= 2) {
      if (!(highestScore && score > highestScore)) {
        window.open('https://www.youtube.com/watch?v=AbL3A_GT9uw', '_blank')
        setMessage('Congrats xD')
      }
      
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playerName,
          score: score,
          ip_address: userIp || 'unknown'
        })
      })
      
      if (response.ok) {
        setIsSubmitted(true)
        setShowNameInput(false)
        if (highestScore && score > highestScore) {
          navigate('/topsecret')
        }
      }
    }
  }

  let showPasswordMessage = false
  
  if (highestScore && score > highestScore) {
    showPasswordMessage = true
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-animation">
          <img 
            src={imgSrc} 
            alt="modal result" 
            className={`modal-img ${score < 5 ? 'small-score' : ''} ${score >= 5 && score <= 14 ? 'medium-score' : ''} ${highestScore && score > highestScore ? 'bateman-score' : ''}`} 
          />
        </div>
        <h2 className="modal-title">{message}</h2>
        
        {showPasswordMessage && (
          <div className="password-container">
            <span 
              className={`password-text ${showPassword ? 'revealed' : 'blurred'}`}
              onMouseEnter={() => setShowPassword(true)}
              onMouseLeave={() => setShowPassword(false)}
            >
              passwordText
            </span>
          </div>
        )}
        
        {showNameInput && !isSubmitted ? (
          <div className="name-input-container">
            <input
              type="text"
              placeholder={showPasswordMessage ? 'Enter your name...' : 'Enter your name...'}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="name-input"
              maxLength={14}
            />
            <button 
              className={`modal-btn submit-btn ${playerName.length >= 2 ? 'enabled' : 'disabled'}`}
              onClick={handleSubmit}
              disabled={playerName.length < 2}
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="modal-buttons">
            <button className="modal-btn" onClick={() => window.location.reload()}>New game?</button>
            <Link to="/leaderboard" className="modal-btn" onClick={onClose}>Leaderboard</Link>
            <Link to="/" className="modal-btn" onClick={onClose}>Home</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal

