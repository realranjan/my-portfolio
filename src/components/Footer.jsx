import React, { useState, useEffect, useRef } from 'react'
import { Moon } from 'lucide-react'

const Footer = ({ markEggFound }) => {
  const [time, setTime] = useState('')
  const [showFooterToast, setShowFooterToast] = useState(false);
  const holdTimeout = useRef();
  const foundRef = useRef(false);

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'long'
      }
      setTime(new Date().toLocaleString('en-US', options))
    }
    updateTime()
    const intervalId = setInterval(updateTime, 60000)
    return () => clearInterval(intervalId)
  }, [])

  // Long press for mobileFooterHold
  const handleTouchStart = () => {
    holdTimeout.current = setTimeout(() => {
      setShowFooterToast(true);
      if (!foundRef.current) {
        markEggFound && markEggFound('mobileFooterHold');
        foundRef.current = true;
      }
    }, 5000);
  };
  const handleTouchEnd = () => {
    clearTimeout(holdTimeout.current);
  };
  useEffect(() => {
    if (showFooterToast) {
      const t = setTimeout(() => setShowFooterToast(false), 2500);
      return () => clearTimeout(t);
    }
  }, [showFooterToast]);

  return (
    <footer className="mt-4 shrink-0 w-full opacity-0 animate-[fadeIn_0.6s_ease-out_0.9s_forwards]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="h-[0.5px] bg-emperor opacity-50"></div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2 sm:gap-0 pt-3 sm:pt-4 px-1">
        <span className="font-normal text-dove-gray text-[11px] sm:text-[13px] leading-4 sm:leading-5">
          © 2025 Ranjan Vernekar
        </span>
        <div className="flex items-center gap-2">
          <Moon className="w-3.5 h-3.5 text-dove-gray" />
          <span className="font-normal text-dove-gray text-[11px] sm:text-[13px] whitespace-nowrap">
            Local Time, {time}
          </span>
        </div>
      </div>
      {showFooterToast && (
        <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-50 bg-orb-red text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
          Footer unlocked! 🎉
        </div>
      )}
    </footer>
  )
}

export default Footer 