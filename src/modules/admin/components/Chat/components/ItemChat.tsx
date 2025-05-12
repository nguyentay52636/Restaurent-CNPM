import React from 'react';
import { Message } from '../DataChat';

interface ItemChatProps {
    message: Message;
    isOwnMessage: boolean;
}

export default function ItemChat({ message, isOwnMessage }: ItemChatProps) {
    return (
        <div
            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
        >
            {!isOwnMessage && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700 mr-2">
                    {message.sender.charAt(0)}
                </div>
            )}
            <div
                className={`max-w-xs p-3 rounded-lg ${isOwnMessage
                    ? 'bg-orange-500 text-white rounded-tr-none'
                    : 'bg-gray-200 text-gray-800 rounded-tl-none'
                    }`}
            >
                {!isOwnMessage && (
                    <p className="text-xs font-medium text-gray-600 mb-1">
                        {message.sender}
                    </p>
                )}
                <p className="break-words">{message.content}</p>
                <p className={`text-xs mt-1 text-right ${isOwnMessage ? 'text-orange-100' : 'text-gray-500'}`}>
                    {message.timestamp}
                </p>
            </div>
            {isOwnMessage && (
                <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-sm font-medium text-white ml-2">
                    Y
                </div>
            )}
        </div>
    );
}