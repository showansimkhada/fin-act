export function formatDate(date: string) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = '' + d.getFullYear();
      
      if (month.length < 2) {
          month = '0' + month;
      }
      if (day.length < 2) {
          day = '0' + day;
      }
      return [year, month, day].join('-');
}

export function getWeekNumber(date: string) {
  let cD = new Date(date);
  let sD = new Date(cD.getFullYear(), 0, 1);
  var days = Math.floor((cD.getTime() - sD.getTime()) / (24 * 60 * 60 * 1000));
  var num = Math.ceil(days / 7);
  return num;
}

export function getWeekday(date: string) {
  let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return weekDays[new Date(date).getDay()];
}

export function getStartDate(d: string) {
  const date = new Date(d);
  const day = date.getDay(); // 👉️ get day of week

  // 👇️ day of month - day of week (-6 if Sunday), otherwise +1
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const startDate = formatDate(String(new Date(date.setDate(diff))));
  return startDate;
}
