function calendarDraw(days, currentDayIndex, currentMonthIndex) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  const cellCount = 49;
  let table = '<table>\n';

  table += `<th colspan="7" class="month">${monthNames[currentMonthIndex]}</th>`;
  table += '<tr>';
  for (let i = 0; i < cellCount; i += 1) {
    if (i >= 0 && i < 7) {
      if (i === 0 || i === 6) {
        table += `<th class="weekend">${dayNames[i].toUpperCase()}</th>`;
        continue;
      }

      table += `<th class="day">${dayNames[i].toUpperCase()}</th>`;

      if (i === 6) {
        table += '</tr>\n';
      }
      continue;
    }

    if (i % 7 === 0) {
      table += '</tr>\n';
    }

    if (i === currentDayIndex + 7) {
      table += `<td class="current-day">${days[i - 7]}</td>`;
      continue;
    }
    if (days[i - 7] === undefined) {
      break;
    }

    if (days[i - 7][0] !== undefined) {
      if (((i - 7) % 7 === 0) || (i - 6) % 7 === 0) {
        table += `<td class="weekend">${days[i - 7]}</td>`;
        continue;
      }
      
      table += `<td class="current-month">${days[i - 7]}</td>`;
      continue;
    }

    table += `<td>${days[i - 7]}</td>`;
  }

  table += '</table>';
  return table;
}

function calendar(year, month, day) {
  if (day !== undefined) {
    const date = new Date(year, month, day);
  }

  const date = new Date(year, month, 1);
  const firstDay = new Date(year, month - 1, 1).getDay();
  const cellCount = 49;
  // console.log(`${date.getDay()} ${date.getDate()} | ${date.getMonth()} | ${date.getFullYear()}`);
  const output = {};
  output.days = [];
  output.currentDay = day;
  output.currentMonthIndex = month - 1;

  // setting and getting the last date of the current month
  date.setMonth(month);
  date.setDate(0);
  const cmLastDate = date.getDate();

  // setting and getting the last date of the previous month
  date.setMonth(month - 1);
  date.setDate(0);
  const pmLastDate = date.getDate();

  for (let cIndex = 0, currentMonthDay = 1, nextMonthDay = 1; cIndex < cellCount; cIndex += 1) {
    if (currentMonthDay <= cmLastDate) {
      if (output.days.length === output.currentDay) {
        output.currentDayIndex = cIndex + firstDay - 1;
      }

      if (cIndex < firstDay) {
        output.days.splice(0, 0, (pmLastDate - cIndex));
        continue;
      }
      output.days.push([currentMonthDay]);
      currentMonthDay += 1;
      continue;
    }

    if ((cellCount - cIndex) % 7 === 0) {
      break;
    }

    output.days.push(nextMonthDay);
    nextMonthDay += 1;
  }

  // console.log(output);
  return calendarDraw(output.days, output.currentDayIndex, output.currentMonthIndex);
}

const today = new Date();
let d = Number(today.getDate());
const m = Number(today.getMonth()) + 1;
const y = Number(today.getFullYear());


for (let i = 1; i <= 12; i += 1) {
  if (i === m) {
    document.querySelector('.container').innerHTML += `<div class="main-calendar">${calendar(y, i, d)}<div class="info"></div></div>`;
    continue;
  }
  document.querySelector('.container').innerHTML += calendar(y, i);
}
document.querySelector('.title').innerHTML += ` ${y}`;
