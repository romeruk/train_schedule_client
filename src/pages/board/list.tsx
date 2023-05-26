import React, { useEffect, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DateField, useAutocomplete } from "@refinedev/mui";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { HttpError, useTable } from "@refinedev/core";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IStation {
  station_id: string;
  station_title: string;
  created_at: string;
  updated_at: string;
}

interface IBoard {
  train_id: "string";
  train_no: "string";
  departure_time: "string";
  arrival_time: "string";
  departure_start_station: "string";
  arrival_end_station: "string";
}

type FormValues = {
  departureStation: IStation | null;
  arrivalStation: IStation | null;
  departureDate: Dayjs | null;
};

export const BoardList = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      departureDate: null,
      arrivalStation: null,
      departureStation: null,
    },
  });

  const { autocompleteProps } = useAutocomplete<IStation>({
    resource: "stations",
  });

  const {
    tableQueryResult: { data, isLoading, isError },
    filters,
    setFilters,
  } = useTable<IBoard, HttpError>({
    pagination: {
      mode: "off",
    },
    syncWithLocation: true,
  });

  const trainsData = data?.data ?? [];

  const onSubmit: SubmitHandler<FormValues> = (data, e) => {
    const { departureDate, departureStation, arrivalStation } = data;
    console.log({
      departureDate: departureDate?.format("YYYY-MM-DD"),
      departureStation: departureStation?.station_id,
      arrivalStation: arrivalStation?.station_id,
    });

    const buildFilters = [
      {
        field: "departureStation",
        operator: "eq",
        value: departureStation?.station_id,
      },
      {
        field: "arrivalStation",
        operator: "eq",
        value: arrivalStation?.station_id,
      },
      {
        field: "departureDate",
        operator: "eq",
        value: departureDate?.format("YYYY-MM-DD"),
      },
    ];

    setFilters(buildFilters);

    e?.preventDefault();
  };

  const onError = (errors, e) => console.log(errors, e);

  useEffect(() => {
    if (!getValues("departureDate")) {
      const logicalFilters = filters.flatMap((item) =>
        "field" in item ? item : []
      );

      const departureDate: string | null =
        logicalFilters.find((item) => item.field === "departureDate")?.value ||
        null;

      setValue("departureDate", dayjs(departureDate));
    }
  }, [filters, getValues, setValue]);

  useEffect(() => {
    if (!getValues("arrivalStation") && !getValues("departureStation")) {
      const logicalFilters = filters.flatMap((item) =>
        "field" in item ? item : []
      );

      const departureStationId: string | null =
        logicalFilters.find((item) => item.field === "departureStation")
          ?.value || null;

      const arrivalStationId: string | null =
        logicalFilters.find((item) => item.field === "arrivalStation")?.value ||
        null;

      const dpData = autocompleteProps.options.find(
        (v) => v.station_id.toString() === departureStationId
      );
      const arvData = autocompleteProps.options.find(
        (v) => v.station_id.toString() === arrivalStationId
      );

      setValue("arrivalStation", arvData ?? null);
      setValue("departureStation", dpData ?? null);
    }
  }, [autocompleteProps.options, filters, getValues, setValue]);

  return (
    <>
      <Box
        mb={2}
        mt={3}
        display="flex"
        width="100%"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit, onError)}
          display="flex"
          gap={2}
          flexWrap="wrap"
          mb={{ xs: "20px", sm: 0 }}
        >
          <Controller
            control={control}
            name="departureStation"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Autocomplete
                {...autocompleteProps}
                {...field}
                sx={{ width: 300 }}
                disabled={isLoading || autocompleteProps.loading}
                onChange={(_, option) => {
                  return field.onChange(option);
                }}
                getOptionLabel={(option) => {
                  return option.station_title;
                }}
                isOptionEqualToValue={(option, value) => {
                  return (
                    value === undefined ||
                    option?.station_id?.toString() ===
                      value?.station_id?.toString()
                  );
                }}
                placeholder="Route from"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ margin: 0 }}
                    label="Select route"
                    margin="normal"
                    variant="outlined"
                    error={!!errors.departureStation}
                    helperText={errors?.departureStation?.message}
                  />
                )}
              />
            )}
          />

          <Controller
            control={control}
            name="arrivalStation"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Autocomplete
                {...autocompleteProps}
                {...field}
                // value={currentFilterValues.arrivalStation}
                sx={{ width: 300 }}
                disabled={isLoading || autocompleteProps.loading}
                onChange={(_, option) => {
                  field.onChange(option);
                }}
                getOptionLabel={(option) => {
                  return option.station_title;
                }}
                isOptionEqualToValue={(option, value) =>
                  value === undefined ||
                  option?.station_id?.toString() ===
                    value?.station_id?.toString()
                }
                placeholder="Route to"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ margin: 0 }}
                    label="Select route to"
                    margin="normal"
                    variant="outlined"
                    error={!!errors.arrivalStation}
                    helperText={errors?.arrivalStation?.message}
                  />
                )}
              />
            )}
          />

          <Controller
            control={control}
            name="departureDate"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  disabled={isLoading}
                  minDate={dayjs(new Date())}
                  label="Departure date"
                  format="YYYY-MM-DD"
                  slotProps={{
                    textField: {
                      error: !!errors.departureDate,
                      helperText: errors?.departureDate?.message,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />

          <Button type="submit" disabled={isLoading} variant="outlined">
            Get data
          </Button>
        </Box>
      </Box>
      {!trainsData.length || isError ? (
        <Typography>No Data found</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Train number</TableCell>
                <TableCell align="right">Start station</TableCell>
                <TableCell align="right">End station</TableCell>
                <TableCell align="right">Departure time</TableCell>
                <TableCell align="right">Arrival time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trainsData.map((row) => (
                <TableRow
                  key={row.train_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.train_no}
                  </TableCell>
                  <TableCell align="right">
                    {row.departure_start_station}
                  </TableCell>
                  <TableCell align="right">{row.arrival_end_station}</TableCell>
                  <TableCell align="right">
                    <DateField
                      format="DD/MM/YYYY hh:mm:ss"
                      value={row.departure_time}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <DateField
                      format="DD/MM/YYYY hh:mm:ss"
                      value={row.arrival_time}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
