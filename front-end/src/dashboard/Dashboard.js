import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import { next, previous, today } from "../utils/date-time";
import ReservationsTable from "./ReservationsTable";
import RestaurantTablesTable from "./RestaurantTablesTable";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  // State variable for the reservations
  const [reservations, setReservations] = useState([]);
  // For setting an error if fetching the reservations goes wrong.
  const [reservationsError, setReservationsError] = useState(null);

  // State variable for the tables
  const [tables, setTables] = useState([...window.tables]); //TODO: CHANGE DEFAULT TO NULL WHEN API FETCH IS DONE
  // For setting an error if fetching the tables goes wrong.
  const [tablesError, setTablesError] = useState(null);

  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const handleChangeDate = (newDate) => {
    history.push(`/dashboard?date=${newDate}`);
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>

      <button onClick={() => handleChangeDate(today())} className="btn btn-primary">
        Today
      </button>

      <button onClick={() => handleChangeDate(previous(date))} className="btn btn-primary mx-2">
        Previous
      </button>

      <button onClick={() => handleChangeDate(next(date))} className="btn btn-primary">
        Next
      </button>

      <ErrorAlert error={reservationsError} />
      <ReservationsTable reservations={reservations} />

      <hr style={{ "borderTop": "1px solid black"}} className="mt-5" />

      {/* Display the tables */}
      <RestaurantTablesTable tables={tables} />
    </main>
  );
}

export default Dashboard;
