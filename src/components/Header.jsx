import React from 'react'
import { ArrowUpRight } from 'lucide-react'

const Header = ({ onTalkToPrans }) => {
  return (
    <header className="space-y-6 opacity-0 animate-[fadeIn_0.6s_ease-out_0.1s_forwards]">
      <div className="flex items-center gap-3">
        <div 
          className="w-6 h-6 rounded-full bg-gradient-to-br from-orb-red to-orb-red/60 
                  animate-pulse hover:scale-125 hover:rotate-[720deg] hover:from-orb-red hover:to-orb-red 
                  transition-all duration-[1200ms] ease-custom-bezier shadow-lg hover:shadow-orb-red/50 
                  relative before:absolute before:inset-0 before:rounded-full before:bg-orb-red/20 
                  before:scale-[1.4] before:opacity-0 hover:before:scale-100 hover:before:opacity-100 
                  before:transition-all before:duration-[800ms] before:ease-out cursor-pointer"
          onClick={onTalkToPrans}
        ></div>
        <span
          className="text-[13px] font-medium tracking-tight bg-gradient-to-r from-gray-900 via-orb-red/90 via-orb-red to-gray-900 bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent"
        >
          talk to my prans!
        </span>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-medium font-instrument tracking-tight bg-gradient-to-r from-gray-900 via-orb-red/90 via-orb-red to-gray-900 bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent leading-[1.2] py-1">
          Ranjan Vernekar
        </h1>
        
        <div className="space-y-2">
          <p className="text-gray-500 text-sm sm:text-base">
            Data Scientist | Researcher
          </p>
          
          <div className="flex flex-wrap gap-4 pt-6 tracking-tight text-sm">
            <ExternalLink href="https://drive.google.com/file/d/11plCgehIx5sadcsK0GNlyiFF9X-BbvoX/view?usp=sharing" text="Resume" />
            <ExternalLink href="https://www.linkedin.com/in/ranjan-vernekar-a93b08252/" text="LinkedIn" />
            <ExternalLink href="https://github.com/realranjan" text="GitHub" />
            <ExternalLink href="mailto:ranjanvernekar45@gmail.com" text="Email" />
          </div>
        </div>
      </div>
    </header>
  )
}

const ExternalLink = ({ href, text }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="group flex items-center gap-1 text-gray-900 transition-all duration-300"
  >
    <span className="group-hover:text-orb-red transition-colors">{text}</span>
    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:md:opacity-100 group-hover:md:translate-x-0 transition-all duration-300 text-orb-red" />
  </a>
)

export default Header