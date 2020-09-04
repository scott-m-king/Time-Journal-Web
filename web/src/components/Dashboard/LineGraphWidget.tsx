import React, { useEffect } from "react";
import {
  DataObject,
  data2,
  generateData,
} from "../../Functions/dataProcessing";
import { ResponsiveLine } from "@nivo/line";
import { Typography } from "@material-ui/core";

interface LineGraphProps {
  data: DataObject[] | undefined;
}

export const LineGraphWidget: React.FC<LineGraphProps> = ({ data }) => {
  return (
    <>
      {data ? (
        <ResponsiveLine
          // data={generateData()}
          data={data!}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
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
          colors={{ scheme: "paired" }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          enableSlices="x"
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
      ) : (
        <Typography
          variant="h6"
          style={{
            textAlign: "center",
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          No entries yet!
        </Typography>
      )}
    </>
  );
};
