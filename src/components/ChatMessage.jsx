import React from 'react';
import { User, Bot, Headphones } from 'lucide-react';

export default function ChatMessage({ message }) {
  return (
    <div className={`flex gap-2 sm:gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
        message.role === 'user' 
          ? 'bg-gradient-to-br from-blue-500 to-indigo-500' 
          : message.isTransfer
          ? 'bg-gradient-to-br from-green-500 to-emerald-500'
          : 'bg-gradient-to-br from-purple-500 to-pink-500'
      }`}>
        {message.role === 'user' ? (
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        ) : message.isTransfer ? (
          <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        ) : (
          <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        )}
      </div>
      <div className={`flex flex-col max-w-[75%] sm:max-w-[70%] ${message.role === 'user' ? 'items-end' : ''}`}>
        <div className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
          message.role === 'user'
            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
            : message.isTransfer
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}>
          <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        <span className="text-xs text-gray-400 mt-1 px-2">
          {message.timestamp.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
}