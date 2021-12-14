import React, { useState, useEffect } from "react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import { AgGridReact } from "ag-grid-react";

function Customerlist() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((error) => console.error(error));
  }, []);

  const columns = [
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ marginTop: 20, height: 600, width: "90%", margin: "auto" }}
    >
      <AgGridReact
        rowData={customers}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
}

export default Customerlist;
