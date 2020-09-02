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

export const data3 = [
  {
    id: "japan",
    color: "",
    data: [
      {
        x: "plane",
        y: 149,
      },
      {
        x: "helicopter",
        y: 251,
      },
      {
        x: "boat",
        y: 133,
      },
      {
        x: "train",
        y: 202,
      },
      {
        x: "subway",
        y: 274,
      },
      {
        x: "bus",
        y: 264,
      },
      {
        x: "car",
        y: 119,
      },
      {
        x: "moto",
        y: 169,
      },
      {
        x: "bicycle",
        y: 2,
      },
      {
        x: "horse",
        y: 150,
      },
      {
        x: "skateboard",
        y: 197,
      },
      {
        x: "others",
        y: 155,
      },
    ],
  },
  {
    id: "france",
    color: "",
    data: [
      {
        x: "plane",
        y: 181,
      },
      {
        x: "helicopter",
        y: 280,
      },
      {
        x: "boat",
        y: 34,
      },
      {
        x: "train",
        y: 126,
      },
      {
        x: "subway",
        y: 9,
      },
      {
        x: "bus",
        y: 198,
      },
      {
        x: "car",
        y: 76,
      },
      {
        x: "moto",
        y: 138,
      },
      {
        x: "bicycle",
        y: 50,
      },
      {
        x: "horse",
        y: 20,
      },
      {
        x: "skateboard",
        y: 254,
      },
      {
        x: "others",
        y: 207,
      },
    ],
  },
  {
    id: "us",
    color: "",
    data: [
      {
        x: "plane",
        y: 14,
      },
      {
        x: "helicopter",
        y: 200,
      },
      {
        x: "boat",
        y: 65,
      },
      {
        x: "train",
        y: 234,
      },
      {
        x: "subway",
        y: 235,
      },
      {
        x: "bus",
        y: 112,
      },
      {
        x: "car",
        y: 125,
      },
      {
        x: "moto",
        y: 239,
      },
      {
        x: "bicycle",
        y: 54,
      },
      {
        x: "horse",
        y: 165,
      },
      {
        x: "skateboard",
        y: 174,
      },
      {
        x: "others",
        y: 54,
      },
    ],
  },
  {
    id: "germany",
    color: "",
    data: [
      {
        x: "plane",
        y: 228,
      },
      {
        x: "helicopter",
        y: 3,
      },
      {
        x: "boat",
        y: 38,
      },
      {
        x: "train",
        y: 176,
      },
      {
        x: "subway",
        y: 207,
      },
      {
        x: "bus",
        y: 216,
      },
      {
        x: "car",
        y: 38,
      },
      {
        x: "moto",
        y: 73,
      },
      {
        x: "bicycle",
        y: 244,
      },
      {
        x: "horse",
        y: 228,
      },
      {
        x: "skateboard",
        y: 67,
      },
      {
        x: "others",
        y: 126,
      },
    ],
  },
  {
    id: "norway",
    color: "",
    data: [
      {
        x: "plane",
        y: 224,
      },
      {
        x: "helicopter",
        y: 262,
      },
      {
        x: "boat",
        y: 200,
      },
      {
        x: "train",
        y: 182,
      },
      {
        x: "subway",
        y: 184,
      },
      {
        x: "bus",
        y: 110,
      },
      {
        x: "car",
        y: 157,
      },
      {
        x: "moto",
        y: 156,
      },
      {
        x: "bicycle",
        y: 261,
      },
      {
        x: "horse",
        y: 230,
      },
      {
        x: "skateboard",
        y: 95,
      },
      {
        x: "others",
        y: 257,
      },
    ],
  },
];
