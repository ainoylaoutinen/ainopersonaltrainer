import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import _ from "lodash";

export default function Statistics() {
  const [values, setValues] = useState([
    {
      activity: "",
      duration: "",
    },
  ]);
  const _ = require("lodash");

  useEffect(() => {
    getTrainingData();
  }, []);

  const getTrainingData = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) =>
        setValues(
          data.map((data) => ({
            activity: data.activity,
            duration: data.duration,
          }))
        )
      )
      .catch((error) => console.error(error));
  };

  const finalValues = _(values)
    .groupBy("activity")
    .map((objs, key) => ({
      activity: key,
      duration: _.sumBy(objs, "duration"),
    }))
    .value();

  return (
    <BarChart
      width={1000}
      height={800}
      data={finalValues}
      margin={{ top: 20, right: 20, left: 40, bottom: 5 }}
      style={{ margin: "auto" }}
    >
      <XAxis dataKey="activity" />
      <YAxis
        datakey="duration"
        label={{ value: "Duration(min)", angle: -90, position: "insideLeft" }}
      />
      <Tooltip />
      <Bar label={true} dataKey="duration" fill="#FFBB28"></Bar>
      <CartesianGrid stroke="#f5f6776" />
    </BarChart>
  );
}
