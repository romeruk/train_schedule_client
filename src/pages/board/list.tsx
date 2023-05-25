import React, { useMemo } from "react";
import { DateField, useAutocomplete } from "@refinedev/mui";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { HttpError, useTable } from "@refinedev/core";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {
  Autocomplete,
  Box,
  TextField,
  Typography,
} from "@mui/material";

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

export const BoardList = () => {
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

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      "field" in item ? item : []
    );

    const departureStationId =
      logicalFilters.find((item) => item.field === "departureStation")?.value ||
      "";

    const arrivalStationId =
      logicalFilters.find((item) => item.field === "arrivalStation")?.value ||
      "";

			const departureDate =
      logicalFilters.find((item) => item.field === "departureDate")?.value ||
      "";

    const dpData = autocompleteProps.options.find(
      (v) => v.station_id.toString() === departureStationId
    );
    const arvData = autocompleteProps.options.find(
      (v) => v.station_id.toString() === arrivalStationId
    );

    return {
      departureStation: dpData,
      arrivalStation: arvData,
			departureDate
    };
  }, [autocompleteProps.options, filters]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;

  return (
    <>
      <Box
        mb={2}
        mt={3}
        display="flex"
        width="84%"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Box display="flex" gap={2} flexWrap="wrap" mb={{ xs: "20px", sm: 0 }}>
          <Autocomplete
            disabled={autocompleteProps.loading}
            value={currentFilterValues.departureStation ?? null}
            sx={{ width: 300 }}
            {...autocompleteProps}
            onChange={(_, option) => {
              setFilters([
                {
                  field: "departureStation",
                  operator: "eq",
                  value: option?.station_id,
                },
              ]);
            }}
            getOptionLabel={(option) => {
              return option.station_title;
            }}
            isOptionEqualToValue={(option, value) =>
              value === undefined ||
              option?.station_id?.toString() === value?.station_id?.toString()
            }
            placeholder="Route from"
            renderInput={(params) => (
              <TextField
                value={currentFilterValues.departureStation}
                {...params}
                label="Select route from"
                margin="normal"
                variant="outlined"
                required
              />
            )}
          />

          <Autocomplete
            sx={{ width: 300 }}
            {...autocompleteProps}
            disabled={autocompleteProps.loading}
            value={currentFilterValues.arrivalStation ?? null}
            onChange={(_, option) => {
              setFilters([
                {
                  field: "arrivalStation",
                  operator: "eq",
                  value: option?.station_id,
                },
              ]);
            }}
            getOptionLabel={(option) => {
              return option.station_title;
            }}
            isOptionEqualToValue={(option, value) =>
              value === undefined ||
              option?.station_id?.toString() === value?.station_id?.toString()
            }
            placeholder="Route to"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select route to"
                margin="normal"
                variant="outlined"
                required
              />
            )}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Departure date"
							format="YYYY-MM-DD"
							// value={currentFilterValues.departureDate}
              onChange={(value) => {
                setFilters([
                  {
                    field: "departureDate",
                    operator: "eq",
                    value: value.format("YYYY-MM-DD"),
                  },
                ]);
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Train number</TableCell>
              <TableCell align="right">Arrival time</TableCell>
              <TableCell align="right">Departure time</TableCell>
              <TableCell align="right">Departure from</TableCell>
              <TableCell align="right">Arrival to</TableCell>
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
                <TableCell align="right">
                  {row.departure_start_station}
                </TableCell>
                <TableCell align="right">{row.arrival_end_station}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
