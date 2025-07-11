import React from 'react'
import { ArrowUpRight, PhoneCall, Linkedin, Github, Mail, FileText, Twitter } from 'lucide-react'

const Header = ({ onTalkToPrans, voiceStatus }) => {
  return (
    <header className="space-y-6 opacity-0 animate-[fadeIn_0.6s_ease-out_0.1s_forwards]">
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-orb-red to-orb-red/60 shadow-lg hover:shadow-orb-red/50 animate-pulse transition-all duration-[1200ms] ease-custom-bezier cursor-pointer"
          onClick={onTalkToPrans}
        >
          <PhoneCall className="w-5 h-5 text-white" />
        </div>
        <span
          className="text-[13px] font-medium tracking-tight bg-gradient-to-r from-gray-900 via-orb-red/90 via-orb-red to-gray-900 bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent"
        >
          {voiceStatus === 'connected' ? 'talking...' : 'talk to janice'}
        </span>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-medium font-instrument tracking-tight bg-gradient-to-r from-gray-900 via-orb-red/90 via-orb-red to-gray-900 bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent leading-[1.2] py-1">
          Ranjan Vernekar
        </h1>
        
        <div className="space-y-2">
          <p className="text-gray-500 text-sm sm:text-base">
            Data Scientist | Data Analyst
          </p>
          
          <div className="flex flex-wrap gap-4 pt-6 tracking-tight text-sm">
            <ExternalLink href="https://drive.google.com/file/d/1dNy8ybflKvN594MIdRMHqxIU8vJCWfDt/view?usp=sharing" text="Resume" />
            <ExternalLink href="https://www.linkedin.com/in/ranjan-vernekar-a93b08252/" text="LinkedIn" />
            <ExternalLink href="https://github.com/realranjan" text="GitHub" />
            <ExternalLink href="https://x.com/lifeless_69" text="X (Twitter)" />
            <ExternalLink href="mailto:ranjanvernekar45@gmail.com" text="Email" />
          </div>
        </div>
      </div>
    </header>
  )
}

const ICONS = {
  Resume: FileText,
  LinkedIn: Linkedin,
  GitHub: Github,
  'X (Twitter)': Twitter,
  Email: Mail,
}

const ExternalLink = ({ href, text }) => {
  const Icon = ICONS[text] || ArrowUpRight;
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="group flex items-center gap-1 text-gray-900 transition-all duration-300"
    >
      <Icon className="w-4 h-4 text-gray-400 group-hover:text-orb-red group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,51,51,0.7)] transition-transform transition-colors duration-200" />
      <span className="group-hover:text-orb-red transition-colors">{text}</span>
    </a>
  )
}

export default Header