/**
 * This repo is lit
 * https://github.com/gregnb/mui-datatables
 */

import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import {
  useGetAllUserEntriesQuery,
  useDeleteEntryMutation,
  GetUserCategoriesQuery,
  GetUserCategoriesDocument,
  GetAllUserEntriesQuery,
  GetAllUserEntriesDocument,
} from "../generated/graphql";
import { Link } from "react-router-dom";
import { Chip } from "@material-ui/core";

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
          console.log(value);
        };
        return (
          <Link to="/ok/category_list" style={{ textDecoration: "none" }}>
            <Chip
              variant="outlined"
              size="small"
              label={value}
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

export const EntryTable2 = () => {
  const [entries, setEntries] = React.useState<Array<any>>([]);
  const { loading, data } = useGetAllUserEntriesQuery();
  const [deleteEntry] = useDeleteEntryMutation();

  const options = {
    elevation: 1,
    print: false,
    onRowsDelete: (row: any) => {
      handleDelete(data!.getAllUserEntries[row.data[0].dataIndex].id);
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
    if (!loading && data && data.getAllUserEntries) {
      let final: any[] = [];

      data.getAllUserEntries.map((element) => {
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
  }, [data]);

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
