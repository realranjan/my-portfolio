import React, { useRef, useState } from 'react'
import Header from './components/Header'
import Now from './components/Now'
import Experience from './components/Experience'
import Work from './components/Work'
import Footer from './components/Footer'
import VoiceAssistant from './components/VoiceAssistant'
import EasterEggTracker from './components/EasterEggTracker'

const EGG_KEYS = [
  'konami',
  'mouseTrail',
  'secretClick',
  'ctrlH',
  'spinMic',
  'randomFact',
  'nightMode',
  'fallingStars',
  'footerSecret',
];

function App() {
  const conversationControlRef = useRef(null);
  const [isTalking, setIsTalking] = useState(false);
  const [eggsFound, setEggsFound] = useState([]);
  const [nightMode, setNightMode] = useState(false);
  const [showFact, setShowFact] = useState(null);
  const [showStars, setShowStars] = useState(false);
  const [footerSecret, setFooterSecret] = useState(false);

  // Helper to mark an egg as found
  const markEggFound = (key) => {
    setEggsFound((prev) => prev.includes(key) ? prev : [...prev, key]);
  };

  // Toggle talking state and start/stop conversation
  const handleToggleTalking = () => {
    if (!isTalking) {
      conversationControlRef.current?.startConversation();
    } else {
      conversationControlRef.current?.stopConversation();
    }
  };

  // Night mode logic
  React.useEffect(() => {
    if (nightMode) {
      document.body.classList.add('bg-gray-900', 'text-white');
      const timeout = setTimeout(() => setNightMode(false), 5000);
      return () => clearTimeout(timeout);
    } else {
      document.body.classList.remove('bg-gray-900', 'text-white');
    }
  }, [nightMode]);

  // Falling stars logic
  React.useEffect(() => {
    if (showStars) {
      const timeout = setTimeout(() => setShowStars(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [showStars]);

  // Fact toast logic
  React.useEffect(() => {
    if (showFact) {
      const timeout = setTimeout(() => setShowFact(null), 3500);
      return () => clearTimeout(timeout);
    }
  }, [showFact]);

  return (
    <div className={`relative min-h-screen py-20 px-4 font-['Geist'] transition-colors duration-500 ${nightMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-2xl mx-auto space-y-12 sm:space-y-16">
        {/* Header Section */}
        <Header 
          isTalking={isTalking} 
          onToggleTalking={handleToggleTalking}
          markEggFound={markEggFound}
          nightMode={nightMode}
          setNightMode={setNightMode}
          setShowFact={setShowFact}
          setShowStars={setShowStars}
        />
        {/* NOW Section */}
        <Now />
        {/* EXPERIENCE Section */}
        <Experience />
        {/* SELECTED WORK Section */}
        <Work />
        {/* Footer */}
        <Footer markEggFound={markEggFound} setFooterSecret={setFooterSecret} footerSecret={footerSecret} />
      </div>
      {/* Voice Assistant */}
      <VoiceAssistant 
        setConversationControlRef={fn => (conversationControlRef.current = fn)}
        onTalkingChange={setIsTalking}
      />
      {/* Easter Egg Tracker */}
      <EasterEggTracker total={EGG_KEYS.length} found={eggsFound.length} />
      {/* Fact Toast */}
      {showFact && (
        <div className="fixed bottom-20 right-6 z-50 bg-orb-red text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn">
          {showFact}
        </div>
      )}
      {/* Falling Stars Animation */}
      {showStars && (
        <div className="pointer-events-none fixed inset-0 z-40">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute left-1/2 top-0 animate-bounce" style={{left: `${10 + i*7}%`, animationDuration: `${1 + Math.random()}s`}}>
              <span role="img" aria-label="star">⭐</span>
            </div>
          ))}
        </div>
      )}
      {/* Footer Secret Message */}
      {footerSecret && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
          You found the secret footer message! 🎉
        </div>
      )}
    </div>
  )
}

export default App