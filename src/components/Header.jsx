import React, { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Sparkles, Rocket, Star, Heart, Mic } from 'lucide-react'

const FUN_FACTS = [
  "Ranjan can code in Python, R, and JavaScript!",
  "This site has hidden easter eggs. Can you find them all?",
  "Ranjan loves data science and coffee.",
  "Ctrl+J shows a random fact!",
  "Try the Konami code for a surprise!",
  "Night mode is just a key away..."
];

const Header = ({ isTalking, onToggleTalking, markEggFound, nightMode, setNightMode, setShowFact, setShowStars }) => {
  const [konamiCode, setKonamiCode] = useState([]);
  const [showSecret, setShowSecret] = useState(false);
  const [mouseTrail, setMouseTrail] = useState([]);
  const [showRocket, setShowRocket] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [spinMic, setSpinMic] = useState(false);
  const [showMobileToast, setShowMobileToast] = useState(null);
  const [mobileBadge, setMobileBadge] = useState(false);
  const bgClickCount = useRef(0);
  const foundRef = useRef({});
  const longPressTimeout = useRef();
  const tapCount = useRef(0);
  const tapTimer = useRef();

  // Helper to mark an egg only once
  const markOnce = (key) => {
    if (!foundRef.current[key]) {
      foundRef.current[key] = true;
      markEggFound && markEggFound(key);
    }
  };

  // Konami code easter egg
  useEffect(() => {
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    const handleKeyDown = (e) => {
      const newKonamiCode = [...konamiCode, e.key];
      if (newKonamiCode.length > konamiSequence.length) {
        newKonamiCode.shift();
      }
      setKonamiCode(newKonamiCode);
      if (newKonamiCode.join(',') === konamiSequence.join(',')) {
        setShowRocket(true);
        setTimeout(() => setShowRocket(false), 3000);
        markOnce('konami');
      }
      // Night mode (N key)
      if (e.key === 'n' || e.key === 'N') {
        setNightMode && setNightMode(true);
        markOnce('nightMode');
      }
      // Random fact (Ctrl+J)
      if (e.ctrlKey && (e.key === 'j' || e.key === 'J')) {
        const fact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
        setShowFact && setShowFact(fact);
        markOnce('randomFact');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiCode, setNightMode, setShowFact]);

  // Mouse trail effect
  const handleMouseMove = (e) => {
    if (e.target.closest('.easter-egg-trigger')) {
      const trail = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now()
      };
      setMouseTrail(prev => [...prev, trail].slice(-5));
      setTimeout(() => {
        setMouseTrail(prev => prev.filter(t => t.id !== trail.id));
      }, 1000);
      markOnce('mouseTrail');
    }
  };
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Keyboard shortcut easter egg (Ctrl+H)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'h') {
        setShowSecret(true);
        setTimeout(() => setShowSecret(false), 3000);
        markOnce('ctrlH');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Spinning mic on double click
  const handleMicDoubleClick = () => {
    setSpinMic(true);
    setTimeout(() => setSpinMic(false), 1000);
    markOnce('spinMic');
  };

  // Falling stars on 5 background clicks
  useEffect(() => {
    const handleBgClick = (e) => {
      if (e.target.tagName === 'BODY' || e.target.classList.contains('min-h-screen')) {
        bgClickCount.current += 1;
        if (bgClickCount.current >= 5) {
          setShowStars && setShowStars(true);
          markOnce('fallingStars');
          bgClickCount.current = 0;
        }
      }
    };
    window.addEventListener('click', handleBgClick);
    return () => window.removeEventListener('click', handleBgClick);
  }, [setShowStars]);

  // Shake to reveal (confetti + toast)
  useEffect(() => {
    let lastShake = 0;
    function handleMotion(e) {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      const shake = Math.abs(acc.x) + Math.abs(acc.y) + Math.abs(acc.z);
      if (shake > 30 && Date.now() - lastShake > 2000) {
        setShowMobileToast('🎉 You found a mobile secret!');
        markOnce('mobileShake');
        lastShake = Date.now();
      }
    }
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion);
    }
    return () => {
      if (window.DeviceMotionEvent) {
        window.removeEventListener('devicemotion', handleMotion);
      }
    };
  }, []);

  // Long press on mic
  const handleMicTouchStart = () => {
    longPressTimeout.current = setTimeout(() => {
      setSpinMic(true);
      setShowMobileToast('🤫 Secret long press!');
      markOnce('mobileLongPress');
      setTimeout(() => setSpinMic(false), 1000);
    }, 600);
  };
  const handleMicTouchEnd = () => {
    clearTimeout(longPressTimeout.current);
  };

  // Triple tap on name
  const handleNameTap = () => {
    tapCount.current += 1;
    if (tapCount.current === 3) {
      setMobileBadge(true);
      setShowMobileToast('🏆 Mobile Master!');
      markOnce('mobileTripleTap');
      setTimeout(() => setMobileBadge(false), 2000);
      tapCount.current = 0;
      return;
    }
    clearTimeout(tapTimer.current);
    tapTimer.current = setTimeout(() => {
      tapCount.current = 0;
    }, 700);
  };

  // Swipe left/right on background
  useEffect(() => {
    let startX = null;
    function handleTouchStart(e) {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
      }
    }
    function handleTouchEnd(e) {
      if (startX !== null && e.changedTouches.length === 1) {
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 80) {
          setShowMobileToast('🚀 You swiped!');
          markOnce('mobileSwipe');
        }
      }
      startX = null;
    }
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Hide mobile toast after 2.5s
  useEffect(() => {
    if (showMobileToast) {
      const t = setTimeout(() => setShowMobileToast(null), 2500);
      return () => clearTimeout(t);
    }
  }, [showMobileToast]);

  // Pinch zoom on header
  useEffect(() => {
    let lastDist = null;
    function handleTouchMove(e) {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (lastDist && Math.abs(dist - lastDist) > 40) {
          setShowMobileToast('🔍 Zoom discovered!');
          markOnce('mobilePinch');
        }
        lastDist = dist;
      }
    }
    function handleTouchEnd(e) {
      if (e.touches.length < 2) lastDist = null;
    }
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Double tap anywhere
  useEffect(() => {
    let lastTap = 0;
    function handleDoubleTap(e) {
      const now = Date.now();
      if (now - lastTap < 400) {
        setShowMobileToast('💖 Double tap detected!');
        markOnce('mobileDoubleTap');
      }
      lastTap = now;
    }
    window.addEventListener('touchend', handleDoubleTap);
    return () => window.removeEventListener('touchend', handleDoubleTap);
  }, []);

  // Rotate device
  useEffect(() => {
    function handleOrientation() {
      setShowMobileToast('🔄 Orientation changed!');
      markOnce('mobileRotate');
    }
    window.addEventListener('orientationchange', handleOrientation);
    return () => window.removeEventListener('orientationchange', handleOrientation);
  }, []);

  return (
    <header className="space-y-6 opacity-0 animate-[fadeIn_0.6s_ease-out_0.1s_forwards]">
      <div className="flex items-center gap-3">
        <div 
          className="relative group"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-[1200ms] ease-custom-bezier shadow-lg relative cursor-pointer easter-egg-trigger 
              ${isTalking ? 'bg-gradient-to-br from-gray-400 to-orb-red/80 animate-pulse scale-110' : 'bg-gradient-to-br from-orb-red to-orb-red/60 animate-pulse hover:scale-110 hover:rotate-[360deg] hover:from-orb-red hover:to-orb-red'} ${spinMic ? 'animate-spin-slow' : ''}`}
            onClick={onToggleTalking}
            onDoubleClick={handleMicDoubleClick}
            onTouchStart={handleMicTouchStart}
            onTouchEnd={handleMicTouchEnd}
          >
            <Mic className={`w-5 h-5 ${isTalking ? 'text-orb-red' : 'text-white'}`} />
          </div>
          {showTooltip && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap
                          opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {isTalking ? 'Click to stop talking' : 'Press to talk to janice'}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          )}
        </div>
        <span
          className={`text-[13px] font-medium tracking-tight bg-gradient-to-r from-gray-900 via-orb-red/90 via-orb-red to-gray-900 bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent ${isTalking ? 'text-orb-red' : ''}`}
        >
          {isTalking ? 'end conversation' : 'talk to janice'}
        </span>
      </div>

      <div className="space-y-4">
        <h1 
          className="text-4xl sm:text-5xl font-medium font-instrument tracking-tight bg-gradient-to-r from-gray-900 via-orb-red/90 via-orb-red to-gray-900 bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent leading-[1.2] py-1 easter-egg-trigger"
          onClick={() => {
            const colors = ['#FF3333', '#33FF33', '#3333FF', '#FFFF33', '#FF33FF'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.documentElement.style.setProperty('--orb-red', randomColor);
            markOnce('secretClick');
          }}
          onTouchEnd={handleNameTap}
        >
          Ranjan Vernekar
          {mobileBadge && <span className="ml-2 px-2 py-1 bg-orb-red text-white rounded-full text-xs animate-bounce">Mobile Master!</span>}
        </h1>
        
        <div className="space-y-2">
          <p className="text-gray-500 text-sm sm:text-base">
            Data Scientist | Data Analyst | Researcher
          </p>
          
          <div className="flex flex-wrap gap-4 pt-6 tracking-tight text-sm">
            <ExternalLink href="https://drive.google.com/file/d/1xszsaw1Exy2mmlulfZAWyGqpsyV0eiNO/view?usp=sharing" text="Resume" />
            <ExternalLink href="https://www.linkedin.com/in/ranjan-vernekar-a93b08252/" text="LinkedIn" />
            <ExternalLink href="https://github.com/realranjan" text="GitHub" />
            <ExternalLink href="mailto:ranjanvernekar45@gmail.com" text="Email" />
          </div>
        </div>
      </div>

      {/* Easter Egg Effects */}
      {mouseTrail.map((trail) => (
        <div
          key={trail.id}
          className="fixed w-2 h-2 bg-orb-red rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-fade-out"
          style={{
            left: trail.x,
            top: trail.y,
          }}
        />
      ))}

      {showSecret && (
        <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg animate-bounce">
          <p className="text-orb-red font-medium">🎉 You found a secret! Press Ctrl+H to toggle</p>
        </div>
      )}

      {showRocket && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 animate-rocket">
          <Rocket className="w-8 h-8 text-orb-red" />
        </div>
      )}

      {showMobileToast && (
        <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-50 bg-orb-red text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
          {showMobileToast}
        </div>
      )}

      {/* Hidden clickable area */}
      <div 
        className="absolute top-0 right-0 w-20 h-20 cursor-pointer"
        onClick={() => {
          const messages = [
            "You found me! 🎉",
            "Keep exploring! 🔍",
            "You're getting warmer! 🔥",
            "Almost there! 🌟"
          ];
          alert(messages[Math.floor(Math.random() * messages.length)]);
          markOnce('secretClick');
        }}
      />
    </header>
  )
}

const ExternalLink = ({ href, text }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="group flex items-center gap-1 text-gray-900 transition-all duration-300 easter-egg-trigger"
  >
    <span className="group-hover:text-orb-red transition-colors">{text}</span>
    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:md:opacity-100 group-hover:md:translate-x-0 transition-all duration-300 text-orb-red" />
  </a>
)

export default Header