import React from "react";
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
function Dashboard({ reservations, tables, reservationsError, tablesError, date, loadTables }) {
  const history = useHistory();

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

      <hr style={{ borderTop: "1px solid black" }} className="mt-5" />

      {/* Display the tables */}
      <ErrorAlert error={tablesError} />
      <RestaurantTablesTable tables={tables} loadTables={loadTables} />
    </main>
  );
}

export default Dashboard;
