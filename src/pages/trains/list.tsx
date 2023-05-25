import React from "react";
import {
  useDataGrid,
  List,
  EditButton,
  DateField,
} from "@refinedev/mui";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

interface ITrain {
  train_id: string;
  train_no: string;
  route_title: string;
  route_id: string;
  created_at: string;
  updated_at: string;
}

export const TrainList: React.FC = () => {
  const { dataGridProps } = useDataGrid<ITrain>({
    pagination: {
      current: 1,
      pageSize: 10,
      mode: "server",
    },
  });

  const columns = React.useMemo<GridColumns<ITrain>>(
    () => [
      {
        field: "train_id",
        headerName: "ID",
        type: "string",
        width: 300,
        sortable: false,
        filterable: false,
      },
      {
        field: "train_no",
        headerName: "Train number",
        type: "string",
        flex: 0.5,
        sortable: false,
        filterable: false,
      },
      {
        field: "route_title",
        headerName: "Route",
        type: "string",
        flex: 0.5,
        sortable: false,
        filterable: false,
      },
      {
        field: "created_at",
        headerName: "Created At",
        renderCell: function render({ row }) {
          return <DateField format="DD/MM/YYYY hh:mm:ss" value={row.created_at} />;
        },
        flex: 1,
        sortable: false,
        filterable: false,
      },
      {
        field: "updated_at",
        headerName: "Updated At",
        renderCell: function render({ row }) {
          return <DateField format="DD/MM/YYYY hh:mm:ss" value={row.updated_at} />;
        },
        flex: 1,
        sortable: false,
        filterable: false,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.train_id} />
              <Link to={`${row.train_id}/route/${row.route_id}/schedule`}>
                Schedule
              </Link>
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        flex: 1,
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid

        getRowId={(row) => row.train_id}
        {...dataGridProps}
        columns={columns}
        autoHeight
      />
    </List>
  );
};
