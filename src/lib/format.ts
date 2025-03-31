export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-UK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};
