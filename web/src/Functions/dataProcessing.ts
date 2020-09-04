import { JournalEntry, Category } from "../generated/graphql";

// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd?page=2&tab=votes#tab-top
export const getCurrentDayTimestamp = (d: Date) => {
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
};

interface Datum {
  x: string;
  y: number;
}

export interface DataObject {
  id: string;
  color: string;
  data: Datum[];
}

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

export const generateLineGraphData = (
  entries: JournalEntry[],
  categories: Category[]
) => {
  if (entries.length === 0) {
    return undefined;
  }

  let parsed = sortByCategory(entries, categories);
  let result: DataObject[] = [];
  for (let i = 0; i < parsed.length; i++) {
    let obj: DataObject = {
      id: categories.find((elem) => elem.id === parsed[i][0].categoryId)!
        .description,
      color: "",
      data: [],
    };
    for (let j = 0; j < 12; j++) {
      obj.data.push({
        x: months[j],
        y: getAmount(parsed[i], j),
      });
    }
    result.push(obj);
  }
  return result;
};

const getAmount = (parsed: any[], month: number) => {
  const hello = parsed.filter((entry: any) => entry.date.getMonth() === month);

  if (hello.length === 1) {
    return hello[0].duration;
  }

  if (hello.length > 1) {
    let num = hello.reduce((acc: any, cur: any) => ({
      duration: acc.duration + cur.duration,
    }));
    return num.duration;
  } else {
    return 0;
  }
};

const sortByCategory = (entries: JournalEntry[], categories: Category[]) => {
  let tempEntries: any[] = [];
  let tempCategories: any[] = [];

  for (let entry of entries) {
    tempEntries.push({
      id: entry.id,
      date: new Date(entry.date),
      categoryId: entry.categoryId,
      duration: entry.duration,
      title: entry.title,
      notes: entry.notes,
    });
  }

  for (let category of categories) {
    tempCategories.push(category);
  }

  tempEntries.sort((a, b) => {
    return a.categoryId > b.categoryId ? 1 : -1;
  });

  tempCategories.sort((a, b) => {
    return a.id > b.id ? 1 : -1;
  });

  let result: any[] = [];
  let counter = 0;

  for (let category of tempCategories) {
    let resultEntries: any[] = [];
    while (
      counter < tempEntries.length &&
      tempEntries[counter].categoryId === category.id
    ) {
      resultEntries.push({
        id: tempEntries[counter].id,
        date: tempEntries[counter].date,
        categoryId: tempEntries[counter].categoryId,
        duration: tempEntries[counter].duration,
        title: tempEntries[counter].title,
        notes: tempEntries[counter].notes,
      });
      counter++;
    }
    if (resultEntries.length !== 0) {
      result.push(resultEntries);
    }
  }
  return result;
};


// const sortByDate = (entries: JournalEntry[]) => {
//   let temp: any[] = [];

//   for (let entry of entries) {
//     temp.push({
//       id: entry.id,
//       date: new Date(entry.date),
//       categoryId: entry.categoryId,
//       duration: entry.duration,
//       title: entry.title,
//       notes: entry.notes,
//     });
//   }

//   temp.sort((a, b) => {
//     return a.date > b.date ? 1 : -1;
//   });

//   let result: any[] = [];
//   let counter = 0;

//   for (let i = 0; i < 12; i++) {
//     let resultEntries: any[] = [];
//     while (temp[counter].date.getMonth() === i) {
//       resultEntries.push({
//         id: temp[counter].id,
//         date: getCurrentDayTimestamp(temp[counter].date),
//         categoryId: temp[counter].categoryId,
//         duration: temp[counter].duration,
//         title: temp[counter].title,
//         notes: temp[counter].notes,
//       });
//       counter++;
//     }
//     result.push(resultEntries);
//   }

//   return result;
// };

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

export const data2 = () => {
  let arr = [];
  for (let i = 0; i < 200; i++) {
    arr.push({
      day: randomDate(new Date(2019, 12, 1), new Date(2021, 2, 1)),
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
