import React, { useState } from 'react'

const Experience = () => {
  const [showPreviousRoles, setShowPreviousRoles] = useState(false)

  return (
    <section className="space-y-4 opacity-0 animate-[fadeIn_0.6s_ease-out_0.5s_forwards]">
      <h2 className="text-xs sm:text-sm font-medium text-gray-500">
        EXPERIENCE
      </h2>
      
      <div className="group py-2">
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-orb-red transition-colors">
            Berozgaar 🙂
          </h3>
          <span className="text-xs sm:text-sm text-orb-red font-medium">
            2024 - Present
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Currently Unemployed and sipping evening coffee with these MFs {' '}
          <a href="https://akchavan.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-orb-red hover:underline">AK</a>, {' '}
          <a href="https://chetan-kittali.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-orb-red hover:underline">Chetan</a> and {' '}
          <a href="https://kalua.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-orb-red hover:underline">Kalua</a>
        </p>
      </div>

      <div className={`space-y-4 transition-all duration-300 ease-in-out ${showPreviousRoles ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        <div className="group opacity-75 hover:opacity-100 transition-opacity">
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="text-base font-medium text-gray-800 group-hover:text-orb-red transition-colors">
              Data Scientist  Intern @ HAEGL TECH PVT LTD
            </h3>
            <span className="text-sm text-gray-500">
              2023 - 24
            </span>
          </div>
        </div>
        
        <div className="group opacity-75 hover:opacity-100 transition-opacity">
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="text-base font-medium text-gray-800 group-hover:text-orb-red transition-colors">
              ML Intern @ Compsoft Technologies
            </h3>
            <span className="text-sm text-gray-500">
              2023
            </span>
          </div>
        </div>
      </div>
      
      <button 
        className="text-sm text-gray-500 hover:text-orb-red transition-all duration-300 mt-4 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-orb-red hover:after:w-full after:transition-all after:duration-300"
        onClick={() => setShowPreviousRoles(!showPreviousRoles)}
      >
        {showPreviousRoles ? 'Hide Previous Roles' : 'Show Previous Roles'}
      </button>
    </section>
  )
}

export default Experience 