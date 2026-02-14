export function formatDate(date: string, type: Number) {
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
  if (type === 0) {
    return [year, month, day].join('-');
  } else {
    return [day, month, year].join('/');
  }
}

export function getWeekNumber(date: string) {
  let cD = new Date(date);
  let sD = new Date(cD.getFullYear(), 0, 1);
  var days = Math.floor((cD.getTime() - sD.getTime()) / (24 * 60 * 60 * 1000));
  var num = Math.ceil(days / 7);
  return num;
}

export function getWeekday(date: string) {
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return weekDays[new Date(date).getDay()];
}

export function getMonth(num: number) {
  const month = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return month[num - 1];
}

export function getStartDate(d: string) {
  var da = new Date(d)
  da.setHours(da.getHours() + 12);
  const day = da.getDay(); // 👉️ get day of week

  // 👇️ day of month - day of week (-6 if Sunday), otherwise +1
  const diff = da.getDate() - day + (day === 0 ? -6 : 1);
  const startDate = formatDate(String(new Date(da.setDate(diff))), 0);
  return startDate;
}

export function getYear(date: string) {
  let x = date.split('-');
  return x[0]
}

// Separate the string and create array then add all the items from array
export function sumAmt(str: string) {
  let x = str.split(',')
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    // check if it got other expression
    if (!x[i].match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/) || !x[i]) {
    } else {
      sum += parseFloat(x[i])
    }
  }
  return sum.toFixed(2).toString();
}

interface amtSum {
  sign: string,
  amt: string,
}

// Convert the string into addition expression
export function stringAmt(str: string): {numbers: amtSum[]; sum: string}{
  if (!str) return {numbers: [], sum: '0'}
  let split = str.split(',');
  let arr: amtSum[] = [];
  let sum = 0;
  for (let i = 0; i < split.length; i++) {
    if (split[i].match(/\-/)) {
      let x = Math.abs(parseFloat(split[i]));
      let data: amtSum = {sign: "-", amt: x.toString()};
      arr.push(data)
      sum -= x;
    } else {
      let x = Math.abs(parseFloat(split[i]));
      let data: amtSum = {sign: "+", amt: x.toString()};
      arr.push(data)
      sum += x;
    }
  }
  return { numbers: arr, sum: sum.toFixed(2).toString()}
}

export function weeklySpent(fWI: number, sWI: number, ret: number, oB: number, cB: number): number {
  const a = (fWI + sWI + ret + oB - cB).toFixed(2)
  if (parseFloat(a) < 0) {
    return 0
  } else {
    return parseFloat(a)
  }
}

export function weeklySave(cB: number, oB: number, ret: number): number {
  const a = (cB - oB - ret ).toFixed(2)
  if (parseFloat(a) < 0) {
    return 0
  } else {
    return parseFloat(a)
  }
}