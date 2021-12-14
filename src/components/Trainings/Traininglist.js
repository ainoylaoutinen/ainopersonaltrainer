import React, { useState, useEffect } from "react";
import moment from "moment";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function Traininglist() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((error) => console.error(error));
  }, []);

  const columns = [
    { field: "activity", sortable: true, filter: true, width: 300 },
    {
      headerName: "date",
      field: "date",
      sortable: true,
      filter: true,
      width: 250,
      cellRendererFramework: (params) => (
        <div>{moment(params.value).format("DD/MM/YYYY, h:mm a")}</div>
      ),
    },
    {
      headerName: "duration (minutes)",
      align: "center",
      field: "duration",
      sortable: true,
      filter: true,
      width: 250,
    },
    {
      headerName: "Customer",
      valueGetter: ({ data }) =>
        `${data.customer.firstname} ${data.customer.lastname}`,
      sortable: true,
      filter: true,
      width: 300,
    },
  ];

  return (
    <div
      className="ag-theme-alpine"
      style={{
        marginTop: 30,
        height: 600,
        width: "60%",
        margin: "auto",
      }}
    >
      <AgGridReact
        rowData={trainings}
        animateRows="true"
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        headerHeight={60}
      />
    </div>
  );
}
