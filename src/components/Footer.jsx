import React, { useState, useEffect } from 'react'
import { Moon } from 'lucide-react'

const Footer = () => {
  const [time, setTime] = useState('')
  
  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Pacific/Honolulu',
        timeZoneName: 'long'
      }
      setTime(new Date().toLocaleString('en-US', options))
    }
    
    updateTime()
    const intervalId = setInterval(updateTime, 60000)
    
    return () => clearInterval(intervalId)
  }, [])

  return (
    <footer className="mt-4 shrink-0 w-full opacity-0 animate-[fadeIn_0.6s_ease-out_0.9s_forwards]">
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
    </footer>
  )
}

export default Footer 