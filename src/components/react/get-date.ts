export function getDate() {
  const startDateYear = new Date().getFullYear();
  const startDateMonth = new Date().getMonth();
  const startDateDay = new Date().getDate();
  const startDate = `${startDateDay}.${startDateMonth}.${startDateYear}`;

  return startDate;
}