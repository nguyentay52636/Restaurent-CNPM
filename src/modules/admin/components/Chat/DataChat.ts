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
        name: 'Nguyễn Văn An',
        initials: 'A',
        color: 'bg-orange-500',
        lastMessage: 'Xin chào, bạn có khỏe không?',
        unreadCount: 3,
        messages: [
            {
                id: 1,
                sender: 'Nguyễn Văn An',
                content: 'Chào bạn, tôi muốn đặt bàn cho bữa tối ngày mai.',
                timestamp: '14:00',
            },
            {
                id: 2,
                sender: 'You',
                content: 'Dạ vâng, chúng tôi có thể đặt bàn cho quý khách. Quý khách muốn đặt bàn cho mấy người ạ?',
                timestamp: '14:05',
            },
            {
                id: 3,
                sender: 'Nguyễn Văn An',
                content: 'Chúng tôi có 5 người, và muốn đặt bàn vào lúc 7 giờ tối.',
                timestamp: '14:10',
            },
            {
                id: 4,
                sender: 'You',
                content: 'Vâng, chúng tôi đã ghi nhận đặt bàn của quý khách. Cảm ơn quý khách đã sử dụng dịch vụ!',
                timestamp: '14:15',
            },
        ],
    },
    {
        id: 2,
        name: 'Trần Thị Hoa',
        initials: 'H',
        color: 'bg-purple-500',
        lastMessage: 'Món ăn hôm nay rất ngon...',
        unreadCount: 2,
        messages: [],
    },
    {
        id: 3,
        name: 'Lê Thị Mai',
        initials: 'M',
        color: 'bg-pink-500',
        lastMessage: 'Tôi muốn đặt tiệc sinh nhật...',
        unreadCount: 3,
        messages: [],
    },
    {
        id: 4,
        name: 'Phạm Văn Linh',
        initials: 'L',
        color: 'bg-green-500',
        lastMessage: 'Cảm ơn về bữa tối tuyệt vời...',
        unreadCount: 2,
        messages: [],
    },
];