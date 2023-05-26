import { Create, useAutocomplete } from "@refinedev/mui";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { HttpError } from "@refinedev/core";
import { Controller } from "react-hook-form";

type Inputs = {
  train_no: string;
};

interface IRoute {
  route_id: string;
  route_title: string;
}

export const TrainCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
		control,
    formState: { errors },
  } = useForm<Inputs, HttpError, Inputs & { route_id: IRoute }>();

  const { autocompleteProps } = useAutocomplete<IRoute>({
    resource: "routes",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Controller
          control={control}
          name="route_id"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Autocomplete
              {...autocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.route_id);
              }}
              getOptionLabel={({ route_title }) => route_title}
              isOptionEqualToValue={(option, value) =>
                value === undefined ||
                option?.route_title?.toString() === value?.route_title?.toString()
              }
              placeholder="Select a route"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select route"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.route_id}
                  helperText={errors?.route_id?.message}
                  required
                />
              )}
            />
          )}
        />
        <TextField
          {...register("train_no", {
            required: "This field is required",
            minLength: {
              value: 1,
              message: "Min length is 1",
            },
          })}
          error={!!errors.train_no}
          helperText={errors?.train_no?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Train number"
          name="train_no"
					required
        />
      </Box>
    </Create>
  );
};
