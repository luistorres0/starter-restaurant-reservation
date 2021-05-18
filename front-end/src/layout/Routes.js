import React, { useEffect, useState } from "react";

import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservationForm from "../newReservation/NewReservationForm";
import NewTableForm from "../newTable/NewTableForm";
import SeatReservationForm from "../seatReservation/SeatReservationForm";
import { listReservations } from "../utils/api";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const urlDate = new URLSearchParams(useLocation().search).get("date");
  const date = urlDate || today();

  // State variable for the reservations
  const [reservations, setReservations] = useState([]);

  // For setting an error if fetching the reservations goes wrong.
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
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
        <SeatReservationForm />
      </Route>
      <Route path="/reservations/new">
        <NewReservationForm />
      </Route>
      <Route path="/tables/new">
        <NewTableForm />
      </Route>
      <Route path="/dashboard">
        <Dashboard reservations={reservations} error={reservationsError} date={date} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
