import { groupMessagesByDate } from "../../utils/messageGrouper";

const messages = [
  {
    id: 1,
    sender: 'john_doe',
    content: 'Hey, how are you?',
    timestamp: '2024-10-05T10:00:00',
    isRead: true,
  },
  {
    id: 2,
    sender: 'you',
    content: 'I am good, what about you?',
    timestamp: '2024-10-05T10:05:00',
    isRead: true,
  },
  {
    id: 3,
    sender: 'john_doe',
    content: 'All good! Have you finished the report?',
    timestamp: '2024-10-05T10:10:00',
    isRead: false,
  },
  {
    id: 4,
    sender: 'you',
    content: 'Almost done! I’ll send it over in a bit.',
    timestamp: '2024-10-05T10:12:00',
    isRead: true,
  },
  {
    id: 5,
    sender: 'john_doe',
    content: 'Cool, take your time.',
    timestamp: '2024-10-05T10:15:00',
    isRead: false,
  },
  {
    id: 6,
    sender: 'jane_smith',
    content: 'Hey, have you seen the new design?',
    timestamp: '2024-10-04T14:20:00',
    isRead: true,
  },
  {
    id: 7,
    sender: 'you',
    content: 'Not yet, I’ll check it out now!',
    timestamp: '2024-10-04T14:25:00',
    isRead: true,
  },
  {
    id: 8,
    sender: 'jane_smith',
    content: 'Let me know what you think.',
    timestamp: '2024-10-04T14:30:00',
    isRead: false,
  },
  {
    id: 9,
    sender: 'john_doe',
    content: 'Can we schedule a call for tomorrow?',
    timestamp: '2024-10-03T09:00:00',
    isRead: true,
  },
  {
    id: 10,
    sender: 'you',
    content: 'Sure, I’m free in the morning.',
    timestamp: '2024-10-03T09:05:00',
    isRead: true,
  },
  {
    id: 11,
    sender: 'john_doe',
    content: 'Great, let’s do 10 AM.',
    timestamp: '2024-10-03T09:10:00',
    isRead: false,
  },
  {
    id: 12,
    sender: 'you',
    content: 'Sounds good!',
    timestamp: '2024-10-03T09:15:00',
    isRead: true,
  },
  {
    id: 13,
    sender: 'alice_wonder',
    content: 'Check out this article I found.',
    timestamp: '2024-09-28T13:30:00',
    isRead: true,
  },
  {
    id: 14,
    sender: 'you',
    content: 'Thanks for sharing! I’ll read it.',
    timestamp: '2024-09-28T13:35:00',
    isRead: true,
  },
  {
    id: 15,
    sender: 'bob_builder',
    content: 'Can you send me the project files?',
    timestamp: '2024-09-28T09:45:00',
    isRead: true,
  },
  {
    id: 16,
    sender: 'you',
    content: 'Sure, I’ll email them to you now.',
    timestamp: '2024-09-28T09:50:00',
    isRead: true,
  },
  {
    id: 17,
    sender: 'you',
    content: 'Did you get the files?',
    timestamp: '2024-09-28T10:00:00',
    isRead: true,
  },
  {
    id: 18,
    sender: 'bob_builder',
    content: 'Yep, thanks!',
    timestamp: '2024-09-28T10:05:00',
    isRead: true,
  },
  {
    id: 19,
    sender: 'charlie_brown',
    content: 'Are we still on for the meeting tomorrow?',
    timestamp: '2024-09-25T08:00:00',
    isRead: true,
  },
  {
    id: 20,
    sender: 'you',
    content: 'Yes, see you at 3 PM!',
    timestamp: '2024-09-25T08:05:00',
    isRead: true,
  },
  {
    id: 21,
    sender: 'you',
    content: 'Don’t forget to review the notes before the meeting. And dont blahgjsdfgsjfgsadhfgsadkjfggsjdafhshagfd',
    timestamp: '2024-09-25T08:10:00',
    isRead: true,
  },
  {
    id: 22,
    sender: 'charlie_brown',
    content: 'Got it, thanks!',
    timestamp: '2024-09-25T08:15:00',
    isRead: true,
  },
  {
    id: 22,
    sender: 'charlie_brown',
    content: 'see you',
    timestamp: '2024-09-25T08:15:00',
    isRead: true,
  }
];

const groupedMessages = groupMessagesByDate(messages);

const ChatMessages = () => {
  return (
    <div>
      {Object.entries(groupedMessages).map(([date, messages]) => (
        <div key={date}>
          <p className="text-gray-500 text-center my-4">{date}</p>
          {messages.map((message, index) => {
            const isSender = message.sender === 'you';
            const isFirstMessage = index === 0 || messages[index - 1].sender !== message.sender;
            // const isLastMessage = index === messages.length - 1 || messages[index + 1].sender !== message.sender;

            return (
              <div key={message.id} className={`mb-1 flex ${isSender ? 'justify-end' : 'justify-start'}`}>
                <p
                  className={`max-w-[70%] px-4 py-2 rounded-lg relative text-wrap break-words ${isSender ? 'bg-blue-accent' : 'bg-dark-secondary'} ${isFirstMessage ? (isSender ? 'rounded-tr-none' : 'rounded-tl-none') : ''}`}
                >
                  {isFirstMessage && (
                    <span
                      className={`absolute ${isSender ? '-right-2 rotate-90' : '-left-2 -rotate-90'} w-0 h-0 border-l-4 border-r-4
                                  ${isSender ? 'border-b-blue-accent' : 'border-b-dark-secondary'}
                                  border-b-[8px] border-l-transparent border-r-transparent top-0`}
                    ></span>
                  )}


                  <span>{message.content}</span>
                </p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;

