import { isToday, format, isYesterday } from 'date-fns';


export const getCurrentDate = (date) => {
  if (isToday(date)) {
    return 'Сегодня'
  } else if (isYesterday(date)) {
    return 'Вчера'
  } else {
    return format((date), 'MM.dd.yyyy');
  }
};

export const reformatData = (turgetOrder) => {
  const time = format(new Date(turgetOrder.createdAt), "hh:mm");
  const date = new Date(turgetOrder.createdAt);
  const currentDay = getCurrentDate(date);
  return { time, currentDay };
};
