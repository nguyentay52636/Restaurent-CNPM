import React from 'react';
import { Chat } from '../DataChat'; // Adjust the import path

interface ListItemProps {
    chat: Chat;
    isSelected: boolean;
    onSelect: (chatId: number) => void;
}

export default function ListItem({ chat, isSelected, onSelect }: ListItemProps) {
    return (
        <div
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${isSelected ? 'bg-gray-400' : ''
                }`}
            onClick={() => onSelect(chat.id)}
        >
            <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${chat.color} mr-3`}
            >
                {chat.initials}
            </div>
            <div className="flex-1">
                <p className="font-medium text-gray-800">{chat.name}</p>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
            </div>
            {chat.unreadCount > 0 && (
                <div className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unreadCount}
                </div>
            )}
        </div>
    );
}