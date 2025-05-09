import React from 'react';
import { Chat } from '../DataChat'; // Adjust the import path

interface ListItemProps {
    chat: Chat;
    isSelected: boolean;
    onSelect: (chatId: number) => void;
}

export default function ListItem({ chat, isSelected, onSelect }: ListItemProps) {
    // Get the last message timestamp if available
    const lastMessageTime = chat.messages.length > 0
        ? chat.messages[chat.messages.length - 1].timestamp
        : '';

    return (
        <div
            className={`flex items-center p-3 cursor-pointer border-b hover:bg-gray-100 transition-colors duration-200 ${isSelected ? 'bg-orange-50 border-l-4 border-l-orange-500' : ''
                }`}
            onClick={() => onSelect(chat.id)}
        >
            <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${chat.color} mr-3`}
            >
                {chat.initials}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-800 truncate">{chat.name}</p>
                    {lastMessageTime && (
                        <p className="text-xs text-gray-500 ml-2">{lastMessageTime}</p>
                    )}
                </div>
                <p className="text-sm text-gray-500 truncate max-w-full">
                    {chat.lastMessage}
                </p>
            </div>
            {chat.unreadCount > 0 && (
                <div className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2 flex-shrink-0">
                    {chat.unreadCount}
                </div>
            )}
        </div>
    );
}