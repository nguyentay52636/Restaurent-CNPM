import React from 'react';
import { Chat } from '../DataChat'; // Adjust the import path
import ItemChat from './ItemChat';

interface RoomChatProps {
    selectedChat: Chat | null;
}

export default function RoomChat({ selectedChat }: RoomChatProps) {
    return (
        <div className="flex-1 flex flex-col h-full">
            {selectedChat ? (
                <>
                    {/* Chat Header */}
                    <div className="flex items-center p-4 border-b">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${selectedChat.color} mr-3`}
                        >
                            {selectedChat.initials}
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-gray-800">
                                {selectedChat.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                Sed veroe eos accusmus...
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <button className="text-gray-500 hover:text-gray-700">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* Chat Messages */}
                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="text-center text-gray-500 text-sm mb-4">
                            TODAY
                        </div>
                        {selectedChat.messages.length > 0 ? (
                            selectedChat.messages.map((message) => (
                                <ItemChat
                                    key={message.id}
                                    message={message}
                                    isOwnMessage={message.sender === 'You'}
                                />
                            ))
                        ) : (
                            <div className="text-center text-gray-500">
                                NO CHAT HISTORY AVAILABLE
                            </div>
                        )}
                    </div>
                    {/* Chat Input */}
                    <div className="p-4 border-t flex items-center space-x-2">
                        <button className="text-gray-500 hover:text-gray-700">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </button>
                        <input
                            type="text"
                            placeholder="Write Message..."
                            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button className="text-orange-500 hover:text-orange-600">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                />
                            </svg>
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                    Select a chat to start messaging
                </div>
            )}
        </div>
    );
}