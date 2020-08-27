import React, { useState } from "react";
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
    color: "rgba(255, 255, 255, 0.1)",
  },
];

interface DefProps {
  match: {
    id: string;
  };
  id: string;
}

export const CategoryPieChart: React.FC<CategoryDataProps> = ({}) => {
  const [fill, setFill] = useState<Array<DefProps>>([]);
  const [activeId, setActiveId] = useState<string>("");

  const handleClick = (event: any) => {
    if (activeId !== event.id) {
      let fillArray: DefProps[] = [];

      data.forEach((element) => {
        if (element.id !== event.id) {
          fillArray.push({
            match: {
              id: element.id,
            },
            id: "unselected",
          });
        }
      });
      setActiveId(event.id);
      setFill(fillArray);
    } else {
      setActiveId("");
      setFill([]);
    }
  };

  return (
    <div style={{ height: 450 }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "set3" }}
        borderWidth={0}
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
        defs={[
          {
            id: "unselected",
            type: "linearGradient",
            colors: [
              { offset: 100, color: "#d6d6d6" },
              { offset: 100, color: "#d6d6d6" },
            ],
          },
        ]}
        fill={fill}
        onClick={(e) => handleClick(e)}
      />
    </div>
  );
};
