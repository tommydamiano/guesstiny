import { useState, useEffect } from 'react'
import CountUp from 'react-countup'
import Modal from './Modal'
import BackButton from './BackButton'
import '../styles/Game.css'

function Game() {

  const [score, setScore] = useState(0)
  const [countryList, setCountryList] = useState([])
  const [leftCountryData, setLeftCountryData] = useState([])
  const [rightCountryData, setRightCountryData] = useState([])
  const [showRightPopulation, setShowRightPopulation] = useState(false)
  const [countryIndex, setCountryIndex] = useState(2)
  const [vsStatus, setVsStatus] = useState('vs')
  const [showModal, setShowModal] = useState(false)
  const [scoreToBeat, setScoreToBeat] = useState(null)
  const [highestScore, setHighestScore] = useState(null)
  const [userIp, setUserIp] = useState(null)

  useEffect(() => {
    const startGame = async () => {
      const response = await fetch('')
      const data = await response.json()
      setLeftCountryData(data.countries[0])
      setRightCountryData(data.countries[1])
      setCountryList(data.countries)
      setShowRightPopulation(false)

      try {
        const ipRes = await fetch('https://api.ipify.org?format=json')
        const ipData = await ipRes.json()
        // console.log('User IP:', ipData.ip)
        setUserIp(ipData.ip)
        await fetch('', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ip_address: ipData.ip })
        })
      } catch (err) {
        console.log('Could not fetch IP address or log game played:', err)
      }
    }
    startGame()
  }, [])

  const correctGuess = () => {
    setScore(score + 1)
    setLeftCountryData(rightCountryData)
    setCountryIndex(countryIndex + 1)
    setShowRightPopulation(false)
    
    if (score === 235 || score === 460) {
      const shuffledList = [...countryList].sort(() => Math.random() - 0.5)
      setCountryList(shuffledList)
      setCountryIndex(3)
      setRightCountryData(shuffledList[2])
    } else {
      setRightCountryData(countryList[countryIndex])
    }
  }

  const gameOver = async () => {
    const response = await fetch('')
    const data = await response.json()
    
    const score_to_beat = parseInt(data.lowest.score)
    const highest_score = parseInt(data.highest.score)
    
    setScoreToBeat(score_to_beat)
    setHighestScore(highest_score)
    setShowModal(true)
  }

  const handleGuess = (guess) => {
    setShowRightPopulation(true)
    setTimeout(() => {
      if (guess == 'more') {
        if (rightCountryData?.population >= leftCountryData?.population) {
          setVsStatus('correct')
          setTimeout(() => {
            correctGuess()
            setVsStatus('vs')
          }, 900)
        } else {
          setVsStatus('wrong')
          setTimeout(() => {
            gameOver()
            setVsStatus('vs')
          }, 900)
        }
      } else {
        if (rightCountryData?.population <= leftCountryData?.population) {
          setVsStatus('correct')
          setTimeout(() => {
            correctGuess()
            setVsStatus('vs')
          }, 900)
        } else {
          setVsStatus('wrong')
          setTimeout(() => {
            gameOver()
            setVsStatus('vs')
          }, 900)
        }
      }
    }, 1800)
  }

  return (
    <div className="game">
      <Modal show={showModal} onClose={() => setShowModal(false)} score={score} scoreToBeat={scoreToBeat} highestScore={highestScore} userIp={userIp} />
      <div className="score-display">
        <BackButton />
        <div className="score-text">Score: {score}</div>
      </div>
      <div className="countries-container">
        <div className="country-card left-country">
          <div className="flag-container">
            <img src={leftCountryData?.pic_url} alt={`Flag of ${leftCountryData?.name}`} className="country-flag" />
          </div>
          <div className="country-info">
            <h2 className="country-name">{leftCountryData?.name}</h2>
            <div className="country-has">has</div>
            <p className="country-population">{leftCountryData?.population?.toLocaleString()}</p>
            <div className="country-population-label">people</div>
          </div>
        </div>

        <div className={`vs-divider${vsStatus === 'correct' ? ' correct' : vsStatus === 'wrong' ? ' wrong' : ''}`}>
          {vsStatus === 'vs' && <span>VS</span>}
          {vsStatus === 'correct' && <span>&#10003;</span>}
          {vsStatus === 'wrong' && <span>&#10005;</span>}
        </div>

        <div className="country-card right-country">
          <div className="flag-container">
            <img src={rightCountryData?.pic_url} alt={`Flag of ${rightCountryData?.name}`} className="country-flag" />
          </div>
          <div className="country-info">
            <h2 className="country-name">{rightCountryData?.name}</h2>
            <div className="country-has">has</div>
            {showRightPopulation ? (
              <p className="country-population">
                <CountUp end={rightCountryData?.population} duration={1.3} separator= "," />
              </p>
            ) : (
              <div className="country-population-buttons">
                <button className="guess-btn" onClick={() => handleGuess('more')}>More</button>
                <button className="guess-btn" onClick={() => handleGuess('less')}>Less</button>
              </div>
            )}
            <div className="country-population-label">people</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game
