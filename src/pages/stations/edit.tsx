import { Edit, useAutocomplete } from "@refinedev/mui";
import { Box, Autocomplete, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export const StationEdit = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    control,
    formState: { errors },
  } = useForm();

	console.log(queryResult);

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("station_title", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.station_title}
          helperText={(errors as any)?.station_title?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Station Title"
          name="station_title"
        />
      </Box>
    </Edit>
  );
};
