import React from "react";
import Typography from "@material-ui/core/Typography";
import { CreateEntryForm } from "../Forms/CreateEntryForm";

interface CreateEntryProps {}

export const CreateEntry = () => {
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <Typography variant="h4">Create Journal Entry</Typography>
      <CreateEntryForm onSubmit={handleSubmit} />
    </div>
  );
};
