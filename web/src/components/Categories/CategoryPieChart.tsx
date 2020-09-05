import React, { useState, useEffect } from "react";
import { ResponsivePie, PieDatum } from "@nivo/pie";
import { Category } from "../../redux/types";
import { useTheme } from "@material-ui/core";

interface CategoryDataProps {
  activeCategory: Category | undefined;
  categoryList: Category[] | undefined;
  setActiveCategory(category: Category): void;
}

interface DefProps {
  match: {
    id: string;
  };
  id: string;
}

export const CategoryPieChart: React.FC<CategoryDataProps> = ({
  activeCategory,
  categoryList,
  setActiveCategory,
}) => {
  const [fill, setFill] = useState<Array<DefProps>>([]);
  const [chartData, setChartData] = useState<Array<PieDatum>>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const muiTheme = useTheme();

  useEffect(() => {
    if (categoryList) {
      let updatedData: PieDatum[] = [];
      categoryList.forEach((element) => {
        updatedData.push({
          id: element.description,
          label: element.description,
          value: element.duration,
          color: "",
        });
      });
      setCategories(categoryList);
      setChartData(updatedData);
    }
  }, [categoryList]);

  useEffect(() => {
    updateActiveCategory(
      activeCategory
        ? {
            id: activeCategory.description,
            label: activeCategory.description,
            value: activeCategory.duration,
            color: "",
          }
        : undefined
    );
  }, [activeCategory, chartData]);

  const handleClick = (event: PieDatum) => {
    const category = categories.find((e) => e.description === event.id);
    setActiveCategory(category!);
  };

  const updateActiveCategory = (selectedCategory: PieDatum | undefined) => {
    if (selectedCategory) {
      let fillArray: DefProps[] = [];

      chartData.forEach((element) => {
        if (element.id !== selectedCategory.id) {
          fillArray.push({
            match: {
              id: element.id.toString(),
            },
            id: "unselected",
          });
        }
      });
      setFill(fillArray);
    } else {
      setFill([]);
    }
  };

  return (
    <div style={{ height: 450 }}>
      <ResponsivePie
        data={chartData}
        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "set2" }}
        borderWidth={0}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={5}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor={muiTheme.palette.text.primary}
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
