import React, { useCallback } from "react";
import { useDelete } from "@refinedev/core";
import { DateField, DeleteButton, List, useDataGrid } from "@refinedev/mui";
import { useParams } from "react-router-dom";
import { DataGrid, GridColumns } from "@mui/x-data-grid";

interface ISchedule {
  station_title: string;
  arrival_time: string;
  departure_time: string;
  station_id: string;
	schedule_order: number;
}

export const ScheduleList = () => {
  const { mutate } = useDelete();
  const { id, routeId } = useParams();

  const { dataGridProps } = useDataGrid<ISchedule>({
    pagination: {
      mode: "off",
    },
    resource: `trains/${id}/route/${routeId}/schedule`,
  });

  console.log("dataGridProps", dataGridProps.rows);
  const onClickDelete = useCallback(
    (station_id: string) => {
      mutate({
        resource: `trains/${id}/route/${routeId}/station`,
        id: station_id,
        invalidates: ["all"],
      });
    },
    [id, mutate, routeId]
  );

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
        renderCell: function render({ row }) {
					if (row.arrival_time == "" || !row.arrival_time) {
						return "-"
					}

          return <DateField format="DD/MM/YYYY hh:mm:ss" value={row.arrival_time} />;
        },
        flex: 1,
        sortable: false,
        filterable: false,
      },
      {
        field: "departure_time",
        headerName: "Departure time",
        renderCell: function render({ row }) {
					if (row.departure_time == "" || !row.departure_time) {
						return "-"
					}

          return <DateField format="DD/MM/YYYY hh:mm:ss" value={row.departure_time} />;
        },
        flex: 0.5,
        sortable: false,
        filterable: false,
      },
			{
				field: 'schedule_order',
				headerName: "Order",
        type: "number",
        flex: 0.3,
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
              <DeleteButton onClick={() => onClickDelete(row.station_id)} />
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
