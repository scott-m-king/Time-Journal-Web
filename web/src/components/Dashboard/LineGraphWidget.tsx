import React from "react";
import { generateData } from "../../Functions/calendarData2";
import { ResponsiveLine } from "@nivo/line";
interface LineGraphProps {}

export const LineGraphWidget: React.FC<LineGraphProps> = ({}) => {
  return (
    <>
      <ResponsiveLine
        data={generateData()}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        curve="cardinal"
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "month",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "minutes",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={{ scheme: "nivo" }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: 111,
            translateY: -50,
            itemsSpacing: 4,
            itemDirection: "left-to-right",
            itemWidth: 99,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 9,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};
