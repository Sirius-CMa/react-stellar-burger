import { isToday, format, isYesterday } from 'date-fns';
import { TOrder } from 'src/typesData';


export const getCurrentDate = (date: Date | number) => {
  if (isToday(date)) {
    return 'Сегодня'
  } else if (isYesterday(date)) {
    return 'Вчера'
  } else {
    return format((date), 'MM.dd.yyyy');
  }
};

export const reformatData = (turgetOrder: TOrder) => {
  const time = format(new Date(turgetOrder.createdAt), "hh:mm");
  const date = new Date(turgetOrder.createdAt);
  const currentDay = getCurrentDate(date);
  return { time, currentDay };
};
