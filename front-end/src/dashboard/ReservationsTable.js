import React from "react";
import ReservationRecord from "./ReservationRecord";

const ReservationsTable = ({ reservations }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>People</th>
          <th>Mobile #</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation, index) => (
          <ReservationRecord key={index} reservation={reservation} />
        ))}
      </tbody>
    </table>
  );
};

export default ReservationsTable;
