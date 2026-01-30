import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypingIndicator from './TypingIndicator.jsx';
import { conversationTree } from '../data/conversationTree';
import useResponsive from '../hooks/useResponsive';

const ChatInterface = ({ mood, userName, onComplete, moodColor }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStage, setCurrentStage] = useState('initial');
  const [showChoices, setShowChoices] = useState(false);
  const chatEndRef = useRef(null);
  const { responsive } = useResponsive();
  
  const conversation = conversationTree[mood];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial bot message
  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages([{
        id: 1,
        type: 'bot',
        text: conversation.initialBotMessage
      }]);
      setTimeout(() => setShowChoices(true), 500);
    }, 1200);

    return () => clearTimeout(timer);
  }, [conversation.initialBotMessage]);

  const handleChoiceSelect = (choice) => {
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      text: choice.text
    }]);
    setShowChoices(false);
    setCurrentStage('response');

    // Bot typing indicator
    setTimeout(() => {
      setIsTyping(true);
    }, 300);

    // Bot response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        text: choice.response
      }]);

      // Show final healing message
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            id: Date.now() + 2,
            type: 'bot',
            text: conversation.finalHealingMessage
          }]);
          setCurrentStage('complete');
        }, 1500);
      }, 1000);
    }, 1200);
  };

  const containerStyle = {
    minHeight: 'calc(100vh - env(safe-area-inset-bottom, 0px))',
    display: 'flex',
    flexDirection: 'column',
    background: `radial-gradient(circle at 50% 30%, ${moodColor}20 0%, #F0F4FF 100%)`,
    transition: 'background 0.5s ease',
  };

  const headerStyle = {
    padding: responsive('16px 20px', '18px 22px', '20px 24px'),
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: responsive('10px', '11px', '12px'),
    position: 'sticky',
    top: 0,
    zIndex: 10,
  };

  const avatarStyle = {
    width: responsive('40px', '44px', '48px'),
    height: responsive('40px', '44px', '48px'),
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #FFB7C5 0%, #A7C7E7 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: responsive('20px', '22px', '24px'),
    flexShrink: 0,
  };

  const chatAreaStyle = {
    flex: 1,
    padding: responsive('16px', '20px', '24px'),
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: responsive('12px', '14px', '16px'),
    WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
  };

  const botBubbleStyle = {
    maxWidth: responsive('85%', '80%', '75%'),
    padding: responsive('14px 16px', '15px 18px', '16px 20px'),
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: responsive('18px 18px 18px 4px', '19px 19px 19px 4px', '20px 20px 20px 4px'),
    color: '#5D5D5D',
    fontSize: responsive('14px', '14px', '15px'),
    lineHeight: '1.6',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    alignSelf: 'flex-start',
    wordBreak: 'break-word',
  };

  const userBubbleStyle = {
    maxWidth: responsive('85%', '80%', '75%'),
    padding: responsive('14px 16px', '15px 18px', '16px 20px'),
    background: 'linear-gradient(135deg, #FFB7C5 0%, #FFD4DD 100%)',
    borderRadius: responsive('18px 18px 4px 18px', '19px 19px 4px 19px', '20px 20px 4px 20px'),
    color: '#5D5D5D',
    fontSize: responsive('14px', '14px', '15px'),
    lineHeight: '1.6',
    boxShadow: '0 4px 15px rgba(255, 183, 197, 0.3)',
    alignSelf: 'flex-end',
    wordBreak: 'break-word',
  };

  const choicesContainerStyle = {
    padding: responsive('12px 16px 20px', '14px 20px 22px', '16px 24px 24px'),
    display: 'flex',
    flexDirection: 'column',
    gap: responsive('8px', '9px', '10px'),
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    position: 'sticky',
    bottom: 0,
  };

  const choiceButtonStyle = {
    padding: responsive('14px 16px', '15px 18px', '16px 20px'),
    background: 'rgba(255, 255, 255, 0.9)',
    border: '2px solid rgba(255, 183, 197, 0.3)',
    borderRadius: responsive('14px', '15px', '16px'),
    color: '#5D5D5D',
    fontSize: responsive('13px', '13px', '14px'),
    fontWeight: '500',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    touchAction: 'manipulation',
  };

  const completeButtonStyle = {
    margin: responsive('0 16px 20px', '0 20px 22px', '0 24px 24px'),
    padding: responsive('16px 28px', '17px 30px', '18px 32px'),
    background: 'linear-gradient(135deg, #FFB7C5 0%, #A7C7E7 100%)',
    border: 'none',
    borderRadius: responsive('14px', '15px', '16px'),
    color: '#5D5D5D',
    fontSize: responsive('15px', '15px', '16px'),
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(255, 183, 197, 0.4)',
    touchAction: 'manipulation',
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <motion.div
        style={headerStyle}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          style={avatarStyle}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🧸
        </motion.div>
        <div>
          <div style={{ fontWeight: '600', color: '#5D5D5D', fontSize: responsive('15px', '15px', '16px') }}>Harimu</div>
          <div style={{ fontSize: responsive('12px', '12px', '13px'), color: '#8A8A8A' }}>
            {isTyping ? 'sedang mengetik...' : 'online'}
          </div>
        </div>
      </motion.div>

      {/* Chat Area */}
      <div style={chatAreaStyle}>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              style={message.type === 'bot' ? botBubbleStyle : userBubbleStyle}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {message.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <TypingIndicator />
          </motion.div>
        )}
        
        <div ref={chatEndRef} />
      </div>

      {/* Choices */}
      <AnimatePresence>
        {showChoices && currentStage === 'initial' && (
          <motion.div
            style={choicesContainerStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {conversation.userChoices.map((choice, index) => (
              <motion.button
                key={choice.id}
                style={choiceButtonStyle}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  borderColor: '#FFB7C5',
                  boxShadow: '0 4px 15px rgba(255, 183, 197, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoiceSelect(choice)}
              >
                {choice.text}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Complete Button */}
      <AnimatePresence>
        {currentStage === 'complete' && (
          <motion.button
            style={completeButtonStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, boxShadow: '0 6px 25px rgba(255, 183, 197, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
          >
            Terima kasih, Harimu 🤍
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatInterface;
