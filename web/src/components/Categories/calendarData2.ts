export const data2 = () => {
  let arr = [];
  for (let i = 0; i < 200; i++) {
    arr.push({
      day: randomDate(new Date(2014, 12, 1), new Date(2016, 12, 31)),
      value: i,
    });
  }
  return arr;
};

function randomDate(start: Date, end: Date) {
  return getCurrentDayTimestamp(
    new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
  );
}

// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd?page=2&tab=votes#tab-top
function getCurrentDayTimestamp(d: Date) {
  return new Date(
    Date.UTC(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours(),
      d.getMinutes(),
      d.getSeconds()
    )
    // `toIsoString` returns something like "2017-08-22T08:32:32.847Z"
    // and we want the first part ("2017-08-22")
  )
    .toISOString()
    .slice(0, 10);
}