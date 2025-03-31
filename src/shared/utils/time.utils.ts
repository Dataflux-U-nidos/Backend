export function parseTime(timeStr: string): number {
  if (timeStr.includes('*')) {
    return timeStr.split('*').reduce((acc, cur) => acc * parseFloat(cur), 1);
  }
  if (timeStr.endsWith('s')) {
    return parseFloat(timeStr.slice(0, -1));
  }
  if (timeStr.endsWith('m')) {
    return parseFloat(timeStr.slice(0, -1)) * 60;
  }
  if (timeStr.endsWith('h')) {
    return parseFloat(timeStr.slice(0, -1)) * 3600;
  }
  if (timeStr.endsWith('d')) {
    return parseFloat(timeStr.slice(0, -1)) * 86400;
  }
  return parseFloat(timeStr);
}
