import moment from 'moment';
import { IMessage } from '../types/message';

export const groupMessagesByDate = (messages: IMessage[]) => {
  type Accumulator = { [date: string]: IMessage[] };

  return messages.reduce<Accumulator>((acc, message) => {
    const messageDate = moment(message.timestamp).startOf('day');
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');

    let formattedDate: string;

    if (messageDate.isSame(today)) {
      formattedDate = 'Today';
    } else if (messageDate.isSame(yesterday)) {
      formattedDate = 'Yesterday';
    } else {
      formattedDate = messageDate.format('MMMM D, YYYY');
    }

    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(message);
    return acc;
  }, {} as Accumulator); 
};
