import React, { useState, useEffect } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { Category } from "../../redux/types";
import { JournalEntry, useMeQuery } from "../../generated/graphql";
import { populateCalendar } from "../../Functions/dataProcessing";
import { useTheme, Card } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import { CATEGORY_PAGE_CALENDAR_HEIGHT } from "../../App/CategoryList";

interface CategoryCalendarProps {
  activeCategory: Category | undefined;
  entries: JournalEntry[] | undefined;
  maxHeight: number;
  start: string;
  end: string;
}

export const CategoryCalendar: React.FC<CategoryCalendarProps> = ({
  activeCategory,
  entries,
  maxHeight,
  start,
  end,
}) => {
  const [data, setData] = useState<Array<any>>([]);
  const { loading, data: meData } = useMeQuery();
  const muiTheme = useTheme();

  const isLightTheme = () => {
    return meData && meData.me && meData?.me.theme === "light";
  };

  const theme = {
    textColor: muiTheme.palette.text.primary,
    tooltip: {
      container: {
        background: isLightTheme() ? "white" : blueGrey[800],
      },
    },
  };

  useEffect(() => {
    if (activeCategory !== undefined && entries) {
      const filteredEntries = entries.filter(
        (entry) => entry.categoryId === activeCategory.id
      );
      setData(populateCalendar(filteredEntries));
    } else if (entries) {
      setData(populateCalendar(entries));
    }
  }, [activeCategory, entries]);

  const light = ["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"];

  return (
    <div style={{ height: maxHeight }}>
      <ResponsiveCalendar
        data={data}
        theme={theme as any}
        from={start}
        to={end}
        emptyColor={isLightTheme() ? "#eeeeee" : blueGrey[700]}
        colors={light}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor={
          isLightTheme()
            ? "white"
            : maxHeight === CATEGORY_PAGE_CALENDAR_HEIGHT
            ? muiTheme.palette.background.default
            : muiTheme.palette.background.paper
        }
        dayBorderWidth={2}
        dayBorderColor={
          isLightTheme()
            ? "white"
            : maxHeight === CATEGORY_PAGE_CALENDAR_HEIGHT
            ? muiTheme.palette.background.default
            : muiTheme.palette.background.paper
        }
        onClick={({ value }) => {
          return;
        }}
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
            itemTextColor: muiTheme.palette.text.primary,
          },
        ]}
        tooltip={({ color, day, value }) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Brightness1Icon style={{ fontSize: 12, color: color }} />
            {"\u00A0\u00A0"}
            {day}:{"\u00A0"}
            <b>{value} mins</b>
          </div>
        )}
      />
    </div>
  );
};
