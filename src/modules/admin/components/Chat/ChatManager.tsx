import React, { useState } from 'react';
import { Chat, dataChats } from './DataChat'; // Adjust the import path
import ListItem from './components/ListItem';
import RoomChat from './components/RoomChat';

export default function ChatManager() {
    const [selectedChatId, setSelectedChatId] = useState<number | null>(1); // Default to first chat

    const selectedChat = dataChats.find((chat) => chat.id === selectedChatId) || null;

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/3 border-r">
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold text-black">Messages</h1>
                </div>
                <div className="overflow-y-auto">
                    {dataChats.map((chat) => (
                        <ListItem
                            key={chat.id}
                            chat={chat}
                            isSelected={selectedChatId === chat.id}
                            onSelect={setSelectedChatId}
                        />
                    ))}
                </div>
            </div>
            {/* Chat Room */}
            <RoomChat selectedChat={selectedChat} />
        </div>
    );
}