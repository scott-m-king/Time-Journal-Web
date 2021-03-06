/**
 * This repo is lit
 * https://github.com/gregnb/mui-datatables
 */

import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import {
  useGetAllUserEntriesQuery,
  useDeleteEntryMutation,
  GetUserCategoriesQuery,
  GetUserCategoriesDocument,
  GetAllUserEntriesQuery,
  GetAllUserEntriesDocument,
  useGetUserCategoriesQuery,
} from "../../generated/graphql";
import { Link } from "react-router-dom";
import {
  Chip,
  IconButton,
  CircularProgress,
  useTheme,
} from "@material-ui/core";
import { Category, JournalEntry } from "../../redux/types";
import { setSelectedCategory } from "../../redux/actions";
import { setEntryToEdit } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CreateIcon from "@material-ui/icons/Create";
import { RootState } from "../../redux/reducers";
import { Colours } from "../../styles/Colours";

export const EntryTable = () => {
  const [entries, setEntries] = useState<Array<Array<string>>>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [edit, setEdit] = useState<JournalEntry | undefined>(undefined);
  const {
    loading: entryLoading,
    data: entryData,
  } = useGetAllUserEntriesQuery();
  const {
    loading: categoryLoading,
    data: categoryData,
  } = useGetUserCategoriesQuery();
  const [deleteEntry] = useDeleteEntryMutation();
  const dispatch = useDispatch();
  const editEntry = useSelector(
    (state: RootState) => state.editEntry.editEntry
  );
  const theme = useTheme();

  useEffect(() => {
    setEdit(editEntry);
  }, [editEntry]);

  const columns = [
    {
      name: "Title",
      options: {
        filter: true,
      },
    },
    {
      name: "Date",
      options: {
        filter: true,
      },
    },
    {
      name: "Duration",
      options: {
        filter: true,
      },
    },
    {
      name: "Category",
      options: {
        filter: true,
        customBodyRender: (value: string, tableMeta: any, updateValue: any) => {
          const handleClick = () => {
            const cat = categories.find((cat) => cat.id === parseInt(value));
            dispatch(setSelectedCategory(cat));
          };
          return (
            <Link to="/ok/category_list" style={{ textDecoration: "none" }}>
              <Chip
                color="primary"
                style={{ color: theme.palette.text.primary }}
                variant="outlined"
                size="small"
                label={
                  categories.find((category) => parseInt(value) === category.id)
                    ?.description
                }
                onClick={handleClick}
              />
            </Link>
          );
        },
      },
    },
    {
      name: "Additional Notes",
      options: {
        filter: true,
      },
    },
    {
      name: "Edit",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string, tableMeta: any, updateValue: any) => {
          const handleClick = () => {
            const entry: any = entryData!.getAllUserEntries.find(
              (elem) => parseInt(value) === elem.id
            );
            console.log(editEntry);
            dispatch(setEntryToEdit(entry));
          };

          return (
            <div>
              {edit && parseInt(value) === edit.id! ? (
                <IconButton aria-label="edit" size="small">
                  <CreateIcon style={{ color: Colours.secondary }} />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="edit"
                  size="small"
                  onClick={handleClick}
                >
                  <CreateIcon style={{ color: theme.palette.text.secondary }} />
                </IconButton>
              )}
            </div>
          );
        },
      },
    },
  ];

  const [deletingItems, setDeletingItems] = useState(false);

  const options = {
    elevation: 1,
    print: false,
    onRowsDelete: async (row: any) => {
      // entry list is reversed because we want to see most recently added entries first.
      setDeletingItems(true);
      const reversedEntries = entryData!.getAllUserEntries.slice().reverse();
      let toDelete = [];
      for (let i = 0; i < row.data.length; i++) {
        toDelete.push(reversedEntries[row.data[i].dataIndex].id);
      }
      await handleDelete(toDelete);
      setDeletingItems(false);
    },
    textLabels: {
      body: {
        noMatch: "No entries found",
      },
    },
    customSort: (data: any[], dataIndex: number, rowIndex: string) => {
      switch (dataIndex) {
        case 0:
          return data.sort((a, b) => {
            const titleA = a.data[dataIndex]
              .charAt(0)
              .toUpperCase()
              .charCodeAt(0);
            const titleB = b.data[dataIndex]
              .charAt(0)
              .toUpperCase()
              .charCodeAt(0);
            return (titleA < titleB ? -1 : 1) * (rowIndex === "desc" ? 1 : -1);
          });
        case 1:
          return data.sort((a, b) => {
            const dateA = new Date(a.data[dataIndex]).getTime();
            const dateB = new Date(b.data[dataIndex]).getTime();
            return (dateA < dateB ? -1 : 1) * (rowIndex === "desc" ? 1 : -1);
          });
        case 2:
          return data.sort((a, b) => {
            const timeA = a.data[dataIndex];
            const timeB = b.data[dataIndex];
            return (timeA < timeB ? -1 : 1) * (rowIndex === "desc" ? 1 : -1);
          });
        case 3:
          return data.sort((a, b) => {
            const catA = a.data[dataIndex];
            const catB = b.data[dataIndex];
            return (
              (categories
                .find((cat) => cat.id === catA)!
                .description.charAt(0)
                .toUpperCase()
                .charCodeAt(0) <
              categories
                .find((cat) => cat.id === catB)!
                .description.charAt(0)
                .toUpperCase()
                .charCodeAt(0)
                ? -1
                : 1) * (rowIndex === "desc" ? 1 : -1)
            );
          });
        default:
          return data.sort((a, b) => {
            return (
              (a.data[dataIndex].length < b.data[dataIndex].length ? -1 : 1) *
              (rowIndex === "desc" ? 1 : -1)
            );
          });
      }
    },
  };

  const handleDelete = async (idArray: number[]) => {
    await deleteEntry({
      variables: {
        idArray,
      },
      update: (store, { data }) => {
        if (!data) {
          return null;
        }
        store.writeQuery<GetUserCategoriesQuery>({
          query: GetUserCategoriesDocument,
          data: {
            getUserCategories: data.deleteEntry.categories,
          },
        });
        store.writeQuery<GetAllUserEntriesQuery>({
          query: GetAllUserEntriesDocument,
          data: {
            getAllUserEntries: data.deleteEntry.entries,
          },
        });
      },
    });
  };

  useEffect(() => {
    if (!categoryLoading && categoryData && categoryData.getUserCategories) {
      setCategories(categoryData.getUserCategories);
    }
  }, [categoryData]);

  useEffect(() => {
    fillTable();
  }, [entryData]);

  const fillTable = () => {
    if (!entryLoading && entryData && entryData.getAllUserEntries) {
      let final: any[] = [];
      entryData.getAllUserEntries.map((element) => {
        let arr: any[] = [];
        arr.push(element.title);
        arr.push(element.date!);
        arr.push(element.duration);
        arr.push(element.categoryId);
        arr.push(element.notes ? element.notes : "");
        arr.push(element.id);
        final.push(arr);
      });

      // entry list is reversed because we want to see most recently added entries first. This affects delete.
      setEntries(final.reverse());
    }
  };

  const loadingComponent = (
    <div
      style={{
        position: "absolute",
        zIndex: 110,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255,255,255,0.8)",
      }}
    >
      <CircularProgress size={24} />
    </div>
  );

  return (
    <div style={{ position: "relative" }}>
      {deletingItems && loadingComponent}
      <MUIDataTable
        title={"Entries"}
        data={entries}
        columns={columns}
        options={options}
      />
    </div>
  );
};
