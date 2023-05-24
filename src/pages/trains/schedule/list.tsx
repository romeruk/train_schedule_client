import React, { useCallback } from "react";
import { useCustomMutation, useApiUrl } from "@refinedev/core";
import { List, useDataGrid } from "@refinedev/mui";
import { useParams, useLocation } from "react-router-dom";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { Button } from "@mui/material";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

interface ISchedule {
  station_title: string;
  arrival_time: string;
  departure_time: string;
  station_id: string;
}

type ScheduleOptional = Optional<ISchedule, "arrival_time" | "departure_time" | "station_title">;

export const ScheduleList = () => {
  const API_URL = useApiUrl();
  const { mutate } = useCustomMutation();
  const { id, routeId } = useParams();

  const { dataGridProps } = useDataGrid<ISchedule>({
    pagination: {
      mode: "off",
    },
    resource: `trains/${id}/route/${routeId}/schedule`,
  });

  const onClickDelete = useCallback((station_id: string) => {
    const schedule = dataGridProps.rows.map((d: ScheduleOptional, index) => {

			delete d["station_title"];

      if (d.arrival_time === "") {
        delete d["arrival_time"];
      }

      if (d.departure_time === "") {
        delete d["departure_time"];
      }

      return {
        ...d,
        schedule_order: index + 1,
      };
    }).filter(schedule => schedule.station_id !== station_id);

    mutate({
      url: `${API_URL}/trains/${id}/route/${routeId}/schedule`,
      method: "put",
      values: {
        schedule,
      },
    });
  }, [API_URL, dataGridProps.rows, id, mutate, routeId]);

  const columns = React.useMemo<GridColumns<ISchedule>>(
    () => [
      {
        field: "station_title",
        headerName: "Station",
        type: "string",
        flex: 1,
        sortable: false,
        filterable: false,
      },
      {
        field: "arrival_time",
        headerName: "Arrival time",
        type: "string",
        flex: 1,
        sortable: false,
        filterable: false,
      },
      {
        field: "departure_time",
        headerName: "Departure time",
        type: "string",
        flex: 0.5,
        sortable: false,
        filterable: false,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        filterable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <Button color="secondary" onClick={() => onClickDelete(row.station_id)}>
                Delete
              </Button>
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        flex: 1,
      },
    ],
    [onClickDelete]
  );

  return (
    <List>
      <DataGrid
        getRowId={(row) => row.station_id}
        {...dataGridProps}
        columns={columns}
        autoHeight
      />
    </List>
  );
};
