import React, { useRef, useState } from 'react'
import Header from './components/Header'
import Now from './components/Now'
import Experience from './components/Experience'
import Work from './components/Work'
import Footer from './components/Footer'
import VoiceAssistant from './components/VoiceAssistant'
import { Analytics } from '@vercel/analytics/react';

function App() {
  const startConversationRef = useRef(null);
  const [voiceStatus, setVoiceStatus] = useState('disconnected');

  // This function will be called from Header
  const handleTalkToPrans = () => {
    if (startConversationRef.current) {
      startConversationRef.current();
    }
  };

  return (
    <>
    <div className="relative min-h-screen bg-white text-gray-900 py-20 px-4 font-['Geist']">
      <div className="max-w-2xl mx-auto space-y-12 sm:space-y-16">
        {/* Header Section */}
        <Header onTalkToPrans={handleTalkToPrans} voiceStatus={voiceStatus} />
        {/* NOW Section */}
        <Now />
        {/* EXPERIENCE Section */}
        <Experience />
        {/* SELECTED WORK Section */}
        <Work />
        {/* Footer */}
        <Footer />
      </div>
      {/* Voice Assistant */}
      <VoiceAssistant setStartConversationRef={fn => (startConversationRef.current = fn)} setStatusRef={setVoiceStatus} />
    </div>
      <Analytics />
    </>
  )
}

export default App