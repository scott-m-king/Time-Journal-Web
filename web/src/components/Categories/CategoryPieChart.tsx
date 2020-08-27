import React from "react";
import { ResponsivePie } from "@nivo/pie";

interface CategoryDataProps {}

const data = [
  {
    id: "sass",
    label: "sass",
    value: 120,
    color: "",
  },
  {
    id: "go",
    label: "go",
    value: 326,
    color: "",
  },
  {
    id: "python",
    label: "python",
    value: 561,
    color: "",
  },
  {
    id: "c",
    label: "c",
    value: 146,
    color: "",
  },
  {
    id: "scala",
    label: "scala",
    value: 365,
    color: "",
  },
  {
    id: "sass1",
    label: "sass",
    value: 120,
    color: "",
  },
  {
    id: "go2",
    label: "go",
    value: 326,
    color: "",
  },
  {
    id: "python3",
    label: "python",
    value: 561,
    color: "",
  },
  {
    id: "c4",
    label: "c",
    value: 146,
    color: "",
  },
  {
    id: "scala5",
    label: "scala",
    value: 365,
    color: "",
  },
  {
    id: "sass6",
    label: "sass",
    value: 120,
    color: "",
  },
  {
    id: "go7",
    label: "go",
    value: 326,
    color: "",
  },
  {
    id: "python8",
    label: "python",
    value: 561,
    color: "",
  },
  {
    id: "c9",
    label: "c",
    value: 146,
    color: "",
  },
  {
    id: "scala10",
    label: "scala",
    value: 365,
    color: "",
  },
];

export const CategoryPieChart: React.FC<CategoryDataProps> = ({}) => {
  return (
    <div style={{ height: 450 }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "set3" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: "color" }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};
