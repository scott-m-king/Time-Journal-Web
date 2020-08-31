import React, { useState, useEffect } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { Category } from "../../redux/types";
import { JournalEntry } from "../../generated/graphql";

interface CategoryCalendarProps {
  activeCategory: Category | undefined;
  entries: JournalEntry[] | undefined;
}

export const CategoryCalendar: React.FC<CategoryCalendarProps> = ({
  activeCategory,
  entries,
}) => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    let result: any[] = [];

    if (activeCategory !== undefined && entries) {
      let arr = entries.filter(
        (entry) => entry.categoryId === activeCategory.id
      );

      for (let i = 0; i < arr.length; i++) {
        console.log(data);
        result.push({
          day: getCurrentDayTimestamp(new Date(arr[0].date!)),
          value: arr[i].duration,
        });
      }
      setData(result);
    } else if (entries) {
      for (let i = 0; i < entries.length; i++) {
        result.push({
          day: getCurrentDayTimestamp(new Date(entries[i].date!)),
          value: entries[i].duration,
        });
      }
      setData(result);
    }
  }, [activeCategory, entries]);

  const getCurrentDayTimestamp = (d: Date) => {
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

  return (
    <div style={{ height: 450 }}>
      <ResponsiveCalendar
        data={data}
        from="2020-02-01"
        to="2021-12-31"
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
    </div>
  );
};
