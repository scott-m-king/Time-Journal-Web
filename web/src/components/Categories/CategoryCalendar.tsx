import React, { useState, useEffect } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { Category } from "../../redux/types";
import { JournalEntry } from "../../generated/graphql";

interface CategoryCalendarProps {
  activeCategory: Category | undefined;
  entries: JournalEntry[] | undefined;
  maxHeight: number;
  start: string;
  end: string;
}

interface CalendarDataProps {
  day: string;
  value: number;
}

export const CategoryCalendar: React.FC<CategoryCalendarProps> = ({
  activeCategory,
  entries,
  maxHeight,
  start,
  end
}) => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    if (activeCategory !== undefined && entries) {
      const filteredEntries = entries.filter(
        (entry) => entry.categoryId === activeCategory.id
      );

      populateCalendar(filteredEntries);
    } else if (entries) {
      populateCalendar(entries);
    }
  }, [activeCategory, entries]);

  const populateCalendar = (data: JournalEntry[]) => {
    let result: CalendarDataProps[] = [];
    let days = new Map();

    for (let i = 0; i < data.length; i++) {
      if (days.has(data[i].date!)) {
        days.set(data[i].date!, days.get(data[i].date!) + data[i].duration);
      } else {
        days.set(data[i].date!, data[i].duration);
      }
    }

    days.forEach((value, key) => {
      result.push({
        day: getCurrentDayTimestamp(new Date(key)),
        value: value,
      });
    });

    setData(result);
  };

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
    )
      .toISOString()
      .slice(0, 10);
  };

  return (
    <div style={{ height: maxHeight }}>
      <ResponsiveCalendar
        data={data}
        from={start}
        to={end}
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

