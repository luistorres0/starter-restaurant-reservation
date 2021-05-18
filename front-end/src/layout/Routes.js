import React, { useEffect, useState } from "react";

import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { next, today } from "../utils/date-time";
import NewReservationForm from "../newReservation/NewReservationForm";
import NewTableForm from "../newTable/NewTableForm";
import SeatReservationForm from "../seatReservation/SeatReservationForm";
import { listReservations, listTables } from "../utils/api";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const urlDate = new URLSearchParams(useLocation().search).get("date");
  const date = urlDate || next(today()); //TODO: CHANGE BACK TO 'today()' AFTER TESTING SEAT RESERVATIONS ROUTE

  // State variable for the reservations
  const [reservations, setReservations] = useState([]);

  // For setting an error if fetching the reservations goes wrong.
  const [reservationsError, setReservationsError] = useState(null);

  // State variable for the tables
  const [tables, setTables] = useState([]); //TODO: CHANGE DEFAULT TO NULL WHEN API FETCH IS DONE

  // For setting an error if fetching the tables goes wrong.
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadReservations, [date]);

  function loadReservations() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatReservationForm reservations={reservations} tables={tables} />
      </Route>
      <Route path="/reservations/new">
        <NewReservationForm loadReservations={loadReservations} date={date} />
      </Route>
      <Route path="/tables/new">
        <NewTableForm loadTables={loadTables} />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          reservations={reservations}
          tables={tables}
          reservationsError={reservationsError}
          tablesError={tablesError}
          date={date}
        />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
