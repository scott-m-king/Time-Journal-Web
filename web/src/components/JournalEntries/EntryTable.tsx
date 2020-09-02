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
import { Chip, IconButton } from "@material-ui/core";
import { Category, JournalEntry } from "../../redux/types";
import { setSelectedCategory } from "../../redux/actions";
import { setEntryToEdit } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CreateIcon from "@material-ui/icons/Create";
import { RootState } from "../../redux/reducers";
import { Colours } from "../../styles/Colours";

export const EntryTable2 = () => {
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
                  <CreateIcon />
                </IconButton>
              )}
            </div>
          );
        },
      },
    },
  ];

  const options = {
    elevation: 1,
    print: false,
    onRowsDelete: async (row: any) => {
      // entry list is reversed because we want to see most recently added entries first.
      const reversedEntries = entryData!.getAllUserEntries.slice().reverse();
      for (let i = 0; i < row.data.length; i++) {
        await handleDelete(reversedEntries[row.data[i].dataIndex].id);
      }
    },
    textLabels: {
      body: {
        noMatch: "No entries found",
      },
    },
    customSort: (data: any[], dataIndex: number, rowIndex: string) => {
      switch (dataIndex) {
        case 1:
          return data.sort((a, b) => {
            const dateA = new Date(a.data[dataIndex]).getTime();
            const dateB = new Date(b.data[dataIndex]).getTime();
            return (dateA < dateB ? -1 : 1) * (rowIndex === "desc" ? 1 : -1);
          });
        case 3:
          return data.sort((a, b) => {
            const catA = a.data[dataIndex];
            const catB = b.data[dataIndex];
            return (catA > catB ? -1 : 1) * (rowIndex === "desc" ? 1 : -1);
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
    // selectableRows: "none" as any,
  };

  const handleDelete = async (entryId: number) => {
    await deleteEntry({
      variables: {
        id: entryId,
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

  return (
    <>
      <MUIDataTable
        title={"Entries"}
        data={entries}
        columns={columns}
        options={options}
      />
    </>
  );
};
