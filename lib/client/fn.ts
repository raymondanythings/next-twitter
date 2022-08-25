export function findHashtags(content: string) {
  const result = content.split("#");
  return result;
}

export function timeForToday(value: Date) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "Just now";
  if (betweenTime < 60) {
    return `${betweenTime}m`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}h`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}d`;
  }

  return `${Math.floor(betweenTimeDay / 365)}y`;
}
