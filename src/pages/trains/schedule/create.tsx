import { Create, useAutocomplete } from "@refinedev/mui";
import { useParams } from "react-router-dom";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { HttpError } from "@refinedev/core";
import { Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

type Inputs = {
  arrival_time: string;
  departure_time: string;
};

interface IStation {
  station_id: string;
  station_title: string;
}

export const ScheduleCreate = () => {
  const { id, routeId } = useParams();

  const {
    saveButtonProps,
    refineCore: { formLoading },
    control,
    formState: { errors },
  } = useForm<Inputs, HttpError, Inputs & { station_id: IStation }>({
    refineCoreProps: {
      resource: `trains/${id}/route/${routeId}/schedule`,
    },
  });

  const { autocompleteProps } = useAutocomplete<IStation>({
    resource: "stations",
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
          name="station_id"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Autocomplete
              {...autocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.station_id);
              }}
              getOptionLabel={({ station_title }) => station_title}
              isOptionEqualToValue={(option, value) => {
                return (
                  value === undefined ||
                  option?.station_id?.toString() ===
                    value?.station_id?.toString()
                );
              }}
              placeholder="Select a station"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select route"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.station_id}
                  helperText={errors?.station_id?.message}
                  required
                />
              )}
            />
          )}
        />

        <Controller
          control={control}
          name="departure_time"
					rules={{ required: "This field is required" }}
          render={({ field, fieldState }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                {...field}
                label="Departure time"
                slotProps={{
                  textField: {
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />

        <Controller
          control={control}
          name="arrival_time"
					rules={{ required: "This field is required" }}
          render={({ field, fieldState }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                {...field}
                label="Arrival time"
                slotProps={{
                  textField: {
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />
      </Box>
    </Create>
  );
};
