import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function Calendar() {
  const [calendarTrainings, setcalendarTrainings] = useState([
    {
      activity: "",
      date: "",
      duration: "",
      name: "",
    },
  ]);

  useEffect(() => {
    fetchTrainingsForCalendar();
  }, []);

  const fetchTrainingsForCalendar = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((responce) => responce.json())
      .then((data) =>
        setcalendarTrainings(
          data.map((data) => ({
            activity: data.activity,
            date: data.date,
            duration: data.duration,
            name: data.customer.firstname + " " + data.customer.lastname,
          }))
        )
      )
      .catch((error) => console.error(error));
  };
  return (
    <div
      style={{
        marginTop: 30,
        height: "80%",
        width: "60%",
        margin: "auto",
      }}
    >
      <FullCalendar
        eventColor="#9966CC"
        eventDisplay="block"
        events={calendarTrainings.map((training) => ({
          date: training.date,
          title:
            training.name +
            ", " +
            training.activity +
            " : " +
            training.duration +
            " minutes",
        }))}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        editable={true}
        weekNumbers={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        headerToolbar={{
          start: "timeGridDay, dayGridWeek, dayGridMonth",
          center: "title",
          end: "prev, today, next",
          dispaly: "inverse-background",
        }}
      />
    </div>
  );
}
