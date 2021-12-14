import React from "react";
import "./App.css";
import Customerlist from "./components/Customers/Customerlist";
import Traininglist from "./components/Trainings/Traininglist";
import Calendar from "./components/Calendar";
import Statistics from "./components/Statistics";
import Navbar from "./components/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Switch>
            <Route
              exact
              from="/"
              render={(props) => <Customerlist {...props} />}
            />
            <Route
              exact
              from="/Customerlist"
              render={(props) => <Customerlist {...props} />}
            />
            <Route
              exact
              from="/Traininglist"
              render={(props) => <Traininglist {...props} />}
            />

            <Route
              exact
              from="/Calendar"
              render={(props) => <Calendar {...props} />}
            />
            <Route
              exact
              from="/Statistics"
              render={(props) => <Statistics {...props} />}
            />

            <Route render={() => <h2>Page not found</h2>} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}
