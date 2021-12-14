import React, { useState } from "react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

export default function Traininglist() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data.content))
      .catch((error) => console.error(error));
  }, []);

  const columns = [
    { field: "activity", sortable: true, filter: true },
    { field: "date", sortable: true, filter: true },
    { field: "duration (min)", sortable: true, filter: true },
    { customer: "activity", sortable: true, filter: true },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ marginTop: 20, height: 600, width: "90%", margin: "auto" }}
    >
      <AgGridReact
        rowData={trainings}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
}
