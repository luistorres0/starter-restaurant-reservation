import React from "react";
import ReservationRecord from "./ReservationRecord";

const ReservationsTable = ({ reservations }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>People</th>
          <th>Mobile #</th>
          <th>Seat</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation, index) => (
          <ReservationRecord
            key={reservation.reservation_id}
            reservation={reservation}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ReservationsTable;
