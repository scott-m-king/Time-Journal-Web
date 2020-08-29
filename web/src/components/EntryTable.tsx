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
} from "../generated/graphql";
import { Link } from "react-router-dom";
import { Chip } from "@material-ui/core";
import { Category } from "../redux/types";
import { setSelectedCategory } from "../redux/actions";
import { useDispatch } from "react-redux";

export const EntryTable2 = () => {
  const [entries, setEntries] = useState<Array<Array<string>>>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
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
  ];

  const options = {
    elevation: 1,
    print: false,
    onRowsDelete: async (row: any) => {
      for (let i = 0; i < row.data.length; i++) {
        await handleDelete(
          entryData!.getAllUserEntries[row.data[i].dataIndex].id
        );
      }
    },
    textLabels: {
      body: {
        noMatch: "No entries found",
      },
    },
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
        arr.push(element.notes ? element.notes : null);
        final.push(arr);
      });

      setEntries(final);
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
