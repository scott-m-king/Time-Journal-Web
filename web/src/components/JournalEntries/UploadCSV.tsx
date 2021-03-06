import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";

import {
  useGetUserCategoriesQuery,
  useBatchUploadJournalEntryMutation,
  EntryInput,
  GetUserCategoriesQuery,
  GetUserCategoriesDocument,
  GetAllUserEntriesQuery,
  GetAllUserEntriesDocument,
} from "../../generated/graphql";
import { getCurrentDayTimestamp } from "../../Functions/dataProcessing";
import GetAppIcon from "@material-ui/icons/GetApp";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

export const UploadCSV = () => {
  const classes = useStyles();
  const [values, setValues] = useState<any>("");
  const { loading, data } = useGetUserCategoriesQuery();
  const [batchUpload] = useBatchUploadJournalEntryMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const csvFile = event.currentTarget.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setValues(reader.result);
      };
      reader.readAsText(csvFile);
    }
  };

  // https://stackoverflow.com/questions/19156148/i-want-to-remove-double-quotes-from-a-string
  useEffect(() => {
    if (values && !loading && data && data.getUserCategories) {
      const parsedArray: string[] = values
        .split(/\r\n|\r|\n/)
        .join()
        .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

      for (let i = 0; i < parsedArray.length; i++) {
        let str = parsedArray[i];
        if (str.charAt(0) === `"` && str.charAt(str.length - 1) === `"`) {
          const arr = str.split(`"`);
          let result = "";
          for (let phrase of arr) {
            if (phrase !== "") {
              result = result.concat(phrase);
            }
          }
          parsedArray[i] = result;
        }
      }

      let arr: Array<Array<any>> = [];

      for (let i = 0; i < parsedArray.length; ) {
        let temp = [];
        for (let j = 0; j < 6; j++, i++) {
          temp.push(parsedArray[i]);
        }
        arr.push(temp);
      }

      let entryArray: EntryInput[] = [];
      let categoryList: string[] = [];

      // setting categories to infinity so that backend can deal
      for (let i = 1; i < arr.length; i++) {
        entryArray.push({
          id: 0,
          title: arr[i][0],
          date: getCurrentDayTimestamp(new Date(arr[i][1])),
          duration: parseInt(arr[i][2]),
          categoryId: 0,
          notes: arr[i][4],
        });
        categoryList.push(arr[i][3]);
      }
      uploadFileToServer(entryArray, categoryList);
    }
  }, [values]);

  const uploadFileToServer = async (
    entryArray: EntryInput[],
    categoryList: string[]
  ) => {
    try {
      await batchUpload({
        variables: {
          entryArray: entryArray,
          categoryArray: categoryList,
        },
        update: (store, { data }) => {
          if (!data) {
            return null;
          }
          store.writeQuery<GetUserCategoriesQuery>({
            query: GetUserCategoriesDocument,
            data: {
              getUserCategories: data.batchUploadJournalEntry.categories,
            },
          });
          store.writeQuery<GetAllUserEntriesQuery>({
            query: GetAllUserEntriesDocument,
            data: {
              getAllUserEntries: data.batchUploadJournalEntry.entries,
            },
          });
        },
      });
    } catch (err) {
      console.log(err + ": this is on the frontend");
    }
  };

  const downloadTemplate = () => {
    window.open(
      "https://drive.google.com/file/d/1AagfH70NXsyHZxFGfpxu2TMcC4wT-s9Y/view?usp=sharing"
    );
  };

  return (
    <div className={classes.root}>
      <Button
        variant="outlined"
        color="inherit"
        className={classes.button}
        startIcon={<GetAppIcon />}
        component="span"
        onClick={downloadTemplate}
      >
        Open Template
      </Button>
      <input
        accept=".csv"
        className={classes.input}
        id="contained-button-file"
        multiple
        onChange={(e) => handleChange(e)}
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="outlined"
          color="inherit"
          className={classes.button}
          startIcon={<PublishIcon />}
          component="span"
        >
          Upload CSV
        </Button>
      </label>
    </div>
  );
};
