import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  useGetUserCategoriesQuery,
  useGetAllUserEntriesQuery,
} from "../../generated/graphql";
import { useSelector } from "react-redux";
import { CategoryState } from "../../redux/reducers/categoriesReducer";

export const CategoryTable = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const MAX_HEIGHT = windowHeight - 675;
  const {
    loading: entryLoading,
    data: entryData,
  } = useGetAllUserEntriesQuery();
  const {
    loading: categoryLoading,
    data: categoryData,
  } = useGetUserCategoriesQuery();
  const [rows, setRows] = useState<Array<any>>([]);
  const activeCategory = useSelector<
    CategoryState,
    CategoryState["selectedCategory"]
  >((state) => state.selectedCategory);

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [activeCategory, entryLoading, entryData, categoryLoading, categoryData]);

  const loadData = () => {
    if (!categoryLoading && categoryData && !entryLoading && entryData) {
      if (activeCategory === undefined) {
        let allRows: any[] = [];
        entryData.getAllUserEntries.map((entry) => {
          allRows.push({
            title: entry.title,
            date: entry.date,
            duration: entry.duration,
            category: categoryData.getUserCategories.find(
              (elem) => elem.id === entry.categoryId
            )?.description,
          });
        });
        setRows(allRows);
      } else {
        let filteredRows: any[] = [];

        entryData.getAllUserEntries
          .filter((entry) => {
            return entry.categoryId === activeCategory.id;
          })
          .map((filteredEntry) => {
            filteredRows.push({
              title: filteredEntry.title,
              date: filteredEntry.date,
              duration: filteredEntry.duration,
              category: activeCategory.description,
            });
          });
        setRows(filteredRows);
      }
    }
  };

  const updateWindowDimensions = () => {
    setWindowHeight(window.innerHeight);
  };

  return (
    <div>
      <TableContainer component={Paper} style={{ maxHeight: MAX_HEIGHT }}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Duration</TableCell>
              <TableCell align="right">Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.title}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.duration}</TableCell>
                <TableCell align="right">{row.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
