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
            <div
                className={`max-w-xs p-3 rounded-lg ${isOwnMessage
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                    }`}
            >
                <p>{message.content}</p>
                <p className="text-xs mt-1 text-right opacity-75">
                    {message.timestamp}
                </p>
            </div>
        </div>
    );
}