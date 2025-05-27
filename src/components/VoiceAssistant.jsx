import React, { useState, useCallback, useEffect } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConversation } from '@11labs/react';

const VoiceAssistant = ({ setStartConversationRef }) => {
  const [error, setError] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

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
      setError(null);
      setIsConnecting(false);
    },
    onDisconnect: () => {
      setError(null);
      setIsConnecting(false);
    },
    onMessage: () => {
      setError(null);
    },
    onError: (error) => {
      setError(error.message || 'Connection error occurred');
    },
    wsUrl: 'wss://api.elevenlabs.io/v1/conversation',
  });

  const startConversation = useCallback(async () => {
    if (!AGENT_ID) {
      setError('Please set your Voice Agent ID');
      return;
    }
    try {
      setError(null);
      setIsConnecting(true);
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: AGENT_ID,
        enableDebugLogs: true,
        connectionConfig: {
          reconnect: true,
          reconnectLimit: 3,
          reconnectInterval: 2000,
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
    } catch (error) {
      setError(error.message || 'Failed to start conversation');
      setIsConnecting(false);
    }
  }, [conversation, AGENT_ID]);

  useEffect(() => {
    if (setStartConversationRef) {
      setStartConversationRef(startConversation);
    }
  }, [setStartConversationRef, startConversation]);

  // Only render error message if present
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-6 right-6 z-50 bg-white p-2 rounded shadow-lg text-sm max-w-xs"
        >
          <AlertCircle className="inline w-5 h-5 mr-2 text-red-500 align-text-bottom" />
          {error}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceAssistant;