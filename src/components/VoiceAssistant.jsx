import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useConversation } from '@11labs/react';

const VoiceAssistant = ({ setConversationControlRef, onTalkingChange }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const audioStreamRef = useRef(null);

  const API_KEY = import.meta.env.VITE_ELEVEN_LABS_API_KEY || '';
  const AGENT_ID = import.meta.env.VITE_ELEVEN_LABS_AGENT_ID || '';
  const DOCUMENT_ID = '9S42CUYaY5KBtY55pMrI';

  const getCurrentDateTime = () => {
    const now = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'long'
    };
    return now.toLocaleString('en-US', options);
  };

  const conversation = useConversation({
    apiKey: API_KEY,
    onConnect: () => {
      setIsConnecting(false);
      setSessionActive(true);
      if (onTalkingChange) onTalkingChange(true);
      console.log('VoiceAssistant: Connected');
    },
    onDisconnect: () => {
      setIsConnecting(false);
      setSessionActive(false);
      if (onTalkingChange) onTalkingChange(false);
      console.log('VoiceAssistant: Disconnected');
    },
    onMessage: () => {},
    onError: (error) => {
      setSessionActive(false);
      if (onTalkingChange) onTalkingChange(false);
      console.log('VoiceAssistant: Error', error);
    },
    wsUrl: 'wss://api.elevenlabs.io/v1/conversation',
  });

  // Robust cleanup function
  const forceCleanup = useCallback(() => {
    setSessionActive(false);
    if (onTalkingChange) onTalkingChange(false);
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      audioStreamRef.current = null;
      console.log('VoiceAssistant: Audio stream force-stopped.');
    }
    if (typeof conversation.disconnect === 'function') {
      conversation.disconnect();
      console.log('VoiceAssistant: Force disconnect called.');
    }
  }, [conversation, onTalkingChange]);

  const startConversation = useCallback(async () => {
    // Always force cleanup before starting
    forceCleanup();
    if (!AGENT_ID) {
      return;
    }
    if (sessionActive) {
      console.log('VoiceAssistant: Session already active, forcing cleanup and not starting another.');
      forceCleanup();
      return;
    }
    try {
      setIsConnecting(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      await conversation.startSession({
        agentId: AGENT_ID,
        enableDebugLogs: true,
        connectionConfig: {
          reconnect: false, // Prevent auto-reconnect
        },
        voiceSettings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
        documentId: DOCUMENT_ID,
        conversationConfigOverride: {
          agent: {
            prompt: {
              prompt: `The current date and time is ${getCurrentDateTime()}. You are a helpful AI assistant.`
            }
          }
        }
      });
      setSessionActive(true);
      console.log('VoiceAssistant: Session started');
    } catch (error) {
      setIsConnecting(false);
      setSessionActive(false);
      if (onTalkingChange) onTalkingChange(false);
      console.log('VoiceAssistant: Failed to start', error);
    }
  }, [conversation, AGENT_ID, onTalkingChange, sessionActive, forceCleanup]);

  const stopConversation = useCallback(async () => {
    try {
      console.log('VoiceAssistant: Attempting to stop conversation...');
      if (typeof conversation.endSession === 'function') {
        await conversation.endSession();
        console.log('VoiceAssistant: Calling conversation.endSession()');
      } else {
        console.log('VoiceAssistant: No endSession() method found. Conversation object:', conversation);
      }
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => {
          track.stop();
        });
        audioStreamRef.current = null;
        console.log('VoiceAssistant: Audio stream stopped.');
      }
      setSessionActive(false);
      if (onTalkingChange) onTalkingChange(false);
      setTimeout(() => {
        forceCleanup();
      }, 500);
      console.log('VoiceAssistant: Session stopped');
    } catch (error) {
      setSessionActive(false);
      if (onTalkingChange) onTalkingChange(false);
      forceCleanup();
      console.log('VoiceAssistant: Failed to stop', error);
    }
  }, [conversation, onTalkingChange, forceCleanup]);

  useEffect(() => {
    if (setConversationControlRef) {
      setConversationControlRef({ startConversation, stopConversation });
    }
  }, [setConversationControlRef, startConversation, stopConversation]);

  // No error/status dialog rendered
  return null;
};

export default VoiceAssistant;