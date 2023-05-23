import React from "react";
import { useDataGrid, List, EditButton, ShowButton } from "@refinedev/mui";
import { DataGrid, GridColumns } from "@mui/x-data-grid";

interface IStation {
  station_id: string;
  station_title: string;
  created_at: string;
  updated_at: string;
}

export const StationList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IStation>({
    pagination: {
      current: 1,
      pageSize: 10,
      mode: "server",
    }
  });

  const columns = React.useMemo<GridColumns<IStation>>(
    () => [
      {
        field: "station_id",
        headerName: "ID",
        type: "string",
				width: 300,
      },
      {
        field: "station_title",
        headerName: "Station",
        type: "string",
				flex: 0.5
      },
      {
        field: "created_at",
        headerName: "Created At",
        type: "string",
				flex: 1
      },
      { field: "updated_at", headerName: "Updated At", type: "string", flex: 1 },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.station_id} />
              {/* <ShowButton hideText recordItemId={row.station_id} /> */}
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    []
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