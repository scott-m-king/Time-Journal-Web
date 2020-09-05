import React, { useState } from "react";
import { DataObject } from "../../Functions/dataProcessing";
import { ResponsiveLine } from "@nivo/line";
import { Typography, useTheme, Card } from "@material-ui/core";
import { useMeQuery } from "../../generated/graphql";
import { blueGrey } from "@material-ui/core/colors";
import Brightness1Icon from "@material-ui/icons/Brightness1";

interface LineGraphProps {
  data: DataObject[] | undefined;
}

export const LineGraphWidget: React.FC<LineGraphProps> = ({ data }) => {
  const muiTheme = useTheme();
  const { loading, data: meData } = useMeQuery();
  const [colors, setColors] = useState<Array<any>>([]);
  const [active, setActive] = useState<boolean>(false);

  const theme = {
    textColor: muiTheme.palette.text.primary,
  };

  return (
    <>
      {data ? (
        <ResponsiveLine
          // data={generateData()}
          data={data!}
          theme={theme as any}
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
          colors={
            active
              ? colors
              : {
                  scheme:
                    meData && meData.me && meData?.me.theme === "light"
                      ? "category10"
                      : "nivo",
                }
          }
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          enableSlices="x"
          sliceTooltip={({ slice }) => (
            <Card
              style={{
                padding: 6,
                backgroundColor:
                  meData && meData.me && meData?.me.theme === "light"
                    ? "white"
                    : blueGrey[800],
              }}
            >
              {slice.points.map((point, index) => (
                <div
                  key={index}
                  style={{
                    padding: 2,
                    backgroundColor:
                      meData && meData.me && meData?.me.theme === "light"
                        ? "white"
                        : blueGrey[800],
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Brightness1Icon
                    style={{ fontSize: 12, color: point.serieColor }}
                  />
                  {"\u00A0\u00A0"}
                  <b>{point.serieId}</b>: {point.data.yFormatted} mins
                </div>
              ))}
            </Card>
          )}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={false}
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
              itemTextColor: muiTheme.palette.text.primary,
              symbolSize: 9,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              onClick: (d) => {
                if (!active) {
                  const colorList = data.map((series) =>
                    series.id === d.id
                      ? d.color
                      : meData && meData.me && meData?.me.theme === "light"
                      ? blueGrey[100]
                      : blueGrey[800]
                  );
                  setColors(colorList);
                  setActive(true);
                } else {
                  setActive(false);
                }
              },
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
