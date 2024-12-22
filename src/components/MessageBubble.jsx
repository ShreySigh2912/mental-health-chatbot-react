import React from 'react';
import { User, Bot } from 'lucide-react';

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isUser ? 'bg-blue-500' : 'bg-gray-200'}`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-gray-600" />
        )}
      </div>
      
      <div className={`flex max-w-[80%] flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-2 ${message.isError
            ? 'bg-red-50 text-red-800'
            : isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-800'
          } ${isUser ? 'rounded-br-none' : 'rounded-bl-none'}`}
        >
          <p className="text-sm font-normal whitespace-pre-wrap break-words">{message.text}</p>
        </div>
        <span className={`text-xs ${isUser ? 'text-gray-500' : 'text-gray-400'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;