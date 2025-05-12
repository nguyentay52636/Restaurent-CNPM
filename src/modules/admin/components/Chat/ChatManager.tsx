import React, { useState } from 'react';
import { Chat, dataChats, Message } from './DataChat'; // Adjust the import path
import ListItem from './components/ListItem';
import RoomChat from './components/RoomChat';

export default function ChatManager() {
    const [selectedChatId, setSelectedChatId] = useState<number | null>(1); // Default to first chat
    const [chats, setChats] = useState<Chat[]>(dataChats);

    // Find the selected chat
    const selectedChat = chats.find((chat) => chat.id === selectedChatId) || null;

    // Handle chat selection
    const handleSelectChat = (chatId: number) => {
        setSelectedChatId(chatId);

        // Clear unread count when selecting a chat
        setChats(prevChats =>
            prevChats.map(chat => {
                if (chat.id === chatId) {
                    return { ...chat, unreadCount: 0 };
                }
                return chat;
            })
        );
    };

    // Handle sending a new message
    const handleSendMessage = (content: string) => {
        if (!selectedChatId || !content.trim()) return;

        // Create a new message
        const newMessage: Message = {
            id: Date.now(), // Use timestamp as unique ID
            sender: 'You',
            content: content.trim(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        // Update the chats state with the new message
        setChats(prevChats =>
            prevChats.map(chat => {
                if (chat.id === selectedChatId) {
                    // Add the new message to this chat
                    const updatedMessages = [...chat.messages, newMessage];

                    return {
                        ...chat,
                        messages: updatedMessages,
                        lastMessage: content.trim(),
                    };
                }
                return chat;
            })
        );

        // Simulate a response after a short delay (1-3 seconds)
        setTimeout(() => {
            const responses = [
                "Cảm ơn bạn đã liên hệ với chúng tôi!",
                "Vâng, chúng tôi sẽ xử lý yêu cầu của bạn ngay.",
                "Xin vui lòng chờ trong giây lát nhé!",
                "Chúng tôi đã nhận được tin nhắn của bạn.",
                "Cảm ơn bạn đã sử dụng dịch vụ của nhà hàng chúng tôi!"
            ];

            // Pick a random response
            const responseContent = responses[Math.floor(Math.random() * responses.length)];

            // Create the response message
            const responseMessage: Message = {
                id: Date.now(),
                sender: selectedChat?.name || 'Unknown',
                content: responseContent,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };

            // Add the response to the chat
            setChats(prevChats =>
                prevChats.map(chat => {
                    if (chat.id === selectedChatId) {
                        return {
                            ...chat,
                            messages: [...chat.messages, responseMessage],
                            lastMessage: responseContent,
                        };
                    }
                    return chat;
                })
            );
        }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/3 border-r">
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold text-black">Messages</h1>
                </div>
                <div className="overflow-y-auto h-[calc(100vh-64px)]">
                    {chats.map((chat) => (
                        <ListItem
                            key={chat.id}
                            chat={chat}
                            isSelected={selectedChatId === chat.id}
                            onSelect={handleSelectChat}
                        />
                    ))}
                </div>
            </div>
            {/* Chat Room */}
            <RoomChat
                selectedChat={selectedChat}
                onSendMessage={handleSendMessage}
            />
        </div>
    );
}