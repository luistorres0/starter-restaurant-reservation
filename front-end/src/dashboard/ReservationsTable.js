import React from "react";
import ReservationRecord from "./ReservationRecord";

const ReservationsTable = ({ reservations }) => {
  const notFinishedReservations = reservations.filter(
    (reservation) => reservation.status !== "finished"
  );
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
          <th>Status</th>
          <th>Seat</th>
        </tr>
      </thead>
      <tbody>
        {notFinishedReservations.map((reservation, index) => (
          <ReservationRecord key={reservation.reservation_id} reservation={reservation} />
        ))}
      </tbody>
    </table>
  );
};

export default ReservationsTable;
