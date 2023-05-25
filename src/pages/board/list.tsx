import React from "react";
import { useAutocomplete } from "@refinedev/mui";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTable } from "@refinedev/core";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import {
  Autocomplete,
  Box,
  MenuItem,
  Select,
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
    // current,
    // setCurrent,
    // setPageSize,
    // pageCount,
    // sorter,
    // setSorter,
    // filters,
    // setFilters,
  } = useTable<IBoard>();

  const trainsData = data?.data ?? [];

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
            sx={{ width: 300 }}
            {...autocompleteProps}
            onChange={(_, value) => {
              console.log(value);
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
            onChange={(_, value) => {
              console.log(value);
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
            <DateTimePicker label="Departure time" />
          </LocalizationProvider>
          {/* <TextField
            variant="outlined"
            color="info"
            placeholder="Search by title"
            value={""}
            onChange={(e) => {
              // setFilters([
              //   {
              //     field: "title",
              //     operator: "contains",
              //     value: e.currentTarget.value
              //       ? e.currentTarget.value
              //       : undefined,
              //   },
              // ]);
            }}
          />
          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }}
            defaultValue=""
            value={""}
            onChange={(e) => {
              // setFilters(
              //   [
              //     {
              //       field: "propertyType",
              //       operator: "eq",
              //       value: e.target.value,
              //     },
              //   ],
              //   "replace"
              // );
            }}
          >
            <MenuItem value="">All</MenuItem>
            {[
              "Apartment",
              "Villa",
              "Farmhouse",
              "Condos",
              "Townhouse",
              "Duplex",
              "Studio",
              "Chalet",
            ].map((type) => (
              <MenuItem key={type} value={type.toLowerCase()}>
                {type}
              </MenuItem>
            ))} */}
          {/* </Select> */}
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
                <TableCell align="right">{row.departure_time}</TableCell>
                <TableCell align="right">{row.arrival_time}</TableCell>
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
