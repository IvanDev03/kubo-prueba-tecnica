export function getThreeWeeksAgoFormatted() {
  const today = new Date();
  const threeWeeksAgo = new Date();
  threeWeeksAgo.setDate(today.getDate() - 21);

  const year = threeWeeksAgo.getFullYear();
  const month = String(threeWeeksAgo.getMonth() + 1).padStart(2, '0');
  const day = String(threeWeeksAgo.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
