import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showAnswer, setShowAnswer] = useState(false);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [backgroundConfetti, setBackgroundConfetti] = useState([]);

  // Generate background confetti on mount
  useEffect(() => {
    const confettiEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '✨', '🌟', '💫', '⭐'];
    const pieces = [];
    for (let i = 0; i < 25; i++) {
      pieces.push({
        id: i,
        emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
        left: Math.random() * 100,
        duration: 8 + Math.random() * 8, // 8-16 seconds
        delay: Math.random() * 8, // stagger the start
      });
    }
    setBackgroundConfetti(pieces);
  }, []);

  const handleNoButtonHover = () => {
    // Move the No button to a random position
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 100;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    setNoButtonPosition({ x: randomX, y: randomY });
    
    // Make the Yes button bigger each time
    setYesButtonSize(prev => prev + 0.1);
  };

  const handleYesClick = () => {
    setIsCelebrating(true);
    
    // Generate confetti
    const confettiEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '🎉', '✨', '🌟', '💫'];
    const newConfetti = [];
    for (let i = 0; i < 30; i++) {
      newConfetti.push({
        id: i,
        emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
      });
    }
    setConfetti(newConfetti);
    
    // Show answer after the celebration animation
    setTimeout(() => {
      setShowAnswer(true);
    }, 800);
  };

  if (showAnswer) {
    return (
      <div className="App">
        {/* Background confetti effect */}
        <div className="background-confetti">
          {backgroundConfetti.map((item) => (
            <div
              key={item.id}
              className="background-confetti-piece"
              style={{
                left: `${item.left}%`,
                animationDuration: `${item.duration}s`,
                animationDelay: `${item.delay}s`,
              }}
            >
              {item.emoji}
            </div>
          ))}
        </div>
        
        <div className="answer-container">
          <img 
            src="https://media.giphy.com/media/T86i6yDyOYz7J6dPhf/giphy.gif" 
            alt="Happy celebration"
            className="celebration-gif"
          />
          <h1 className="answer-text">Yay! 🎉💖</h1>
          <p className="answer-subtext">I knew you'd say yes! 😊</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Background confetti effect */}
      <div className="background-confetti">
        {backgroundConfetti.map((item) => (
          <div
            key={item.id}
            className="background-confetti-piece"
            style={{
              left: `${item.left}%`,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>
      
      <div className="container">
        <img 
          src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif" 
          alt="Cute bear with roses"
          className="bear-gif"
        />
        <h1 className="question">Will you be my Valentine?</h1>
        <div className="button-container">
          <button 
            className={`yes-button ${isCelebrating ? 'celebrating' : ''}`}
            onClick={handleYesClick}
            style={{ transform: `scale(${yesButtonSize})` }}
          >
            Yes
          </button>
          <button 
            className="no-button"
            onMouseEnter={handleNoButtonHover}
            style={{
              position: noButtonPosition.x !== 0 ? 'fixed' : 'relative',
              left: `${noButtonPosition.x}px`,
              top: `${noButtonPosition.y}px`,
            }}
          >
            No
          </button>
        </div>
      </div>
      {confetti.length > 0 && (
        <div className="confetti-container">
          {confetti.map((item) => (
            <div
              key={item.id}
              className="confetti"
              style={{
                left: `${item.left}%`,
                animationDelay: `${item.delay}s`,
              }}
            >
              {item.emoji}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
