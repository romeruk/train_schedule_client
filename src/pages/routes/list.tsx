import React from "react";
import { useDataGrid, List, EditButton, ShowButton } from "@refinedev/mui";
import { DataGrid, GridColumns } from "@mui/x-data-grid";

interface IRoute {
  route_id: string;
  route_title: string;
  created_at: string;
  updated_at: string;
}

export const RouteList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IRoute>({
    pagination: {
      current: 1,
      pageSize: 10,
      mode: "server",
    }
  });

  const columns = React.useMemo<GridColumns<IRoute>>(
    () => [
      {
        field: "route_id",
        headerName: "ID",
        type: "string",
				width: 300,
      },
      {
        field: "route_title",
        headerName: "route",
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
              <EditButton hideText recordItemId={row.route_id} />
              {/* <ShowButton hideText recordItemId={row.route_id} /> */}
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
        getRowId={(row) => row.route_id}
        {...dataGridProps}
        columns={columns}
        autoHeight
      />
    </List>
  );
};