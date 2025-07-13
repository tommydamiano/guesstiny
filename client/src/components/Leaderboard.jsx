import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BackButton from './BackButton'
import '../styles/Leaderboard.css'

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([])

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await fetch('')
      const data = await response.json()
      setLeaderboardData(data.leaderboard)
    }

    fetchLeaderboard()
  }, [])

  return (
    <div className="leaderboard-page">
      <BackButton />
      <motion.div 
        className="leaderboard-list"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}>
        <div className="leaderboard-header">
          <div className="header-rank">Rank</div>
          <div className="header-name">Name</div>
          <div className="header-score">Score</div>
        </div>
        {leaderboardData.map((entry, index) => (
          <div key={entry.pk} className={`leaderboard-row ${index < 3 ? 'top-three' : ''}`}>
            <div className="rank">
              {index === 0 && <span className="medal">🥇</span>}
              {index === 1 && <span className="medal">🥈</span>}
              {index === 2 && <span className="medal">🥉</span>}
              {index >= 3 && <span className="rank-number">{index + 1}</span>}
            </div>
            <div className="name">{entry.name}</div>
            <div className="score">
              {entry.score.toLocaleString()}
              <span className="pts">PTS</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Leaderboard
