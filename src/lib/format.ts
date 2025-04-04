export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-UK', {
    year: '2-digit',
    month: 'short',
    day: 'numeric',
  }).format(date);
};
