import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

// Встановити часовий пояс за замовчуванням
dayjs.tz.setDefault('UTC'); // Замість 'UTC' встановіть вашу часову зону

// Методи для роботи з датами і часом
export const formatDate = (date) => {
  return dayjs(date).format('DD-MM-YYYY');
};

export const parseDate = (dateString) => {
  return dayjs(dateString).tz(); // Поверне дату у встановленій часовій зоні
};
