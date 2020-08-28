import React, { useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { data } from './piechartData';

interface CategoryDataProps {}

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
            colors: [{ offset: 100, color: "#d6d6d6" }],
          },
        ]}
        fill={fill}
        onClick={(e) => handleClick(e)}
      />
    </div>
  );
};
