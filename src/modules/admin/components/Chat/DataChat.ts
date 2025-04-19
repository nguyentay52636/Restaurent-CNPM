// Define the Message interface
export interface Message {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
}

// Define the Chat interface
export interface Chat {
    id: number;
    name: string;
    initials: string;
    color: string;
    lastMessage: string;
    unreadCount: number;
    messages: Message[];
}

// Sample chat data based on the image
export const dataChats: Chat[] = [
    {
        id: 1,
        name: 'Anne Gloindian',
        initials: 'A',
        color: 'bg-orange-500',
        lastMessage: 'Sed veroe eos accusmus...',
        unreadCount: 3,
        messages: [
            {
                id: 1,
                sender: 'Anne Gloindian',
                content: 'At veroe eos accusamus et iusto dignissimos ducimus praesentium volupt.',
                timestamp: '2:00 PM',
            },
            {
                id: 2,
                sender: 'You',
                content: 'But I must explain to you how all this mistaken idea and much more.',
                timestamp: '2:00 PM',
            },
            {
                id: 3,
                sender: 'Anne Gloindian',
                content: 'At veroe eos accusamus et iusto dignissimos ducimus praesentium volupt.',
                timestamp: '2:00 PM',
            },
            {
                id: 4,
                sender: 'You',
                content: 'But I must explain to you how all this mistaken idea and much more.',
                timestamp: '2:00 PM',
            },
        ],
    },
    {
        id: 2,
        name: 'Hope Furaletter',
        initials: 'H',
        color: 'bg-purple-500',
        lastMessage: 'Sed veroe eos accusmus...',
        unreadCount: 2,
        messages: [],
    },
    {
        id: 3,
        name: 'Sarah Moonees',
        initials: 'S',
        color: 'bg-pink-500',
        lastMessage: 'Sed veroe eos accusmus...',
        unreadCount: 3,
        messages: [],
    },
    {
        id: 4,
        name: 'Lynne Gwistic',
        initials: 'L',
        color: 'bg-green-500',
        lastMessage: 'Sed veroe eos accusmus...',
        unreadCount: 2,
        messages: [],
    },
];