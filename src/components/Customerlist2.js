import React, { useState, useEffect } from "react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { AgGridReact } from "ag-grid-react";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import Snackbar from "@mui/material/Snackbar";
import AddTraining from "./AddTraining";
import Button from "@mui/material/Button";

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((error) => console.error(error));
  }, []);

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((error) => console.error(error));
    console.log(customers);
  };

  const addCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => fetchCustomers()) //so that it updates.
      .then((error) => console.error(error));
  };

  const editCustomer = (link, updatedCustomer) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedCustomer),
    })
      .then((response) => {
        setMessage("Customer info edited");
      })
      .then((_) => {
        setOpen(true);
        fetchCustomers();
      })
      .catch((error) => console.error(error));
  };

  const deleteCustomer = (url) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setMessage("Customer deleted");
            setOpen(true);
            fetchCustomers();
          } else {
            alert("Something went wrong");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const addTraining = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(training),
    })
      .then((response) => fetchCustomers())
      .then(setOpen())
      .then(setMessage("new training added"))
      .then((error) => console.error(error));
  };

  const columns = [
    {
      headerName: "",
      sortable: false,
      filter: false,
      width: 140,
      field: "links", //links to a customer; what value will be rendered to this cell
      cellRendererFramework: (params) => (
        <AddTraining addTraining={addTraining} row={params} />
      ),
    },
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
    {
      headerName: "",
      sortable: false,
      filter: false,
      width: 120,
      field: "links",
      cellRendererFramework: (params) => (
        <EditCustomer editCustomer={editCustomer} row={params} />
        //data comes from params. same as props in editCustomer
      ),
    },
    {
      headerName: "",
      sortable: false,
      filter: false,
      width: 120,
      field: "links",
      cellRendererFramework: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => deleteCustomer(params.value)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <AddCustomer addCustomer={addCustomer} />
      <div
        className="ag-theme-alpine"
        style={{ marginTop: 30, width: "95%", margin: "auto" }}
      >
        <AgGridReact
          rowData={customers}
          animateRows="true"
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          headerHeight={60}
        />
      </div>
    </div>
  );
}
