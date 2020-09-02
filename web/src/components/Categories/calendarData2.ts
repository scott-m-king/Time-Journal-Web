export const data2 = () => {
  let arr = [];
  for (let i = 0; i < 200; i++) {
    arr.push({
      day: randomDate(new Date(2020, 1, 1), new Date(2021, 1, 1)),
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

const arr = [
  "Uncategorized",
  "Leisure",
  "School",
  "Exercise",
  "Chores",
  "Work",
  "Social",
  "Family",
  "Misc.",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const nivo = ["#e8c1a0", "#f47560", "#f1e15b", "#e8a838", "#61cdbb", "#97e3d5"];

interface Datum {
  x: string;
  y: number;
}

interface DataObject {
  id: string;
  color: string;
  data: Datum[];
}

export const generateData = () => {
  let result: DataObject[] = [];

  for (let i = 0; i < arr.length; i++) {
    let obj: DataObject = {
      id: arr[i],
      color: nivo[Math.round(Math.random() * 5)],
      data: [],
    };
    for (let j = 0; j < 12; j++) {
      obj.data.push({
        x: months[j],
        y: Math.round(Math.random() * (600 - 1) + 1),
      });
    }
    result.push(obj);
  }
  return result;
};

export const data3 = generateData();
