import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Category } from "../../redux/types";
import { JournalEntry } from "../../generated/graphql";

interface CategoryTableProps {
  activeCategory: Category | undefined;
  categories: Category[] | undefined;
  entries: JournalEntry[] | undefined;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({
  activeCategory,
  categories,
  entries,
}) => {
  const [windowHeight, setWindowHeight] = useState(0);
  const MAX_HEIGHT = windowHeight - 683;
  const [rows, setRows] = useState<Array<any>>([]);

  const loadData = () => {
    if (categories && entries) {
      if (activeCategory === undefined) {
        let allRows: any[] = [];
        entries.forEach((entry) => {
          allRows.push({
            title: entry.title,
            date: entry.date,
            duration: entry.duration,
            category: categories.find((elem) => elem.id === entry.categoryId)
              ?.description,
          });
        });
        setRows(allRows);
      } else {
        let filteredRows: any[] = [];

        entries
          .filter((entry) => {
            return entry.categoryId === activeCategory.id;
          })
          .forEach((filteredEntry) => {
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

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [activeCategory, categories, entries]);

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
            {rows.map((row, index) => (
              <TableRow key={index}>
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
