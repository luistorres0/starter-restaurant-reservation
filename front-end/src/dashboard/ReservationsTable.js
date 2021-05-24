import React from "react";
import { updateReservationStatus } from "../utils/api";
import ReservationRecord from "./ReservationRecord";

const ReservationsTable = ({ reservations, refreshReservations }) => {
  const notFinishedReservations = reservations.filter(
    (reservation) => reservation.status !== "finished"
  );

  const onCancelReservationHandler = async (reservation_id) => {
    const isOk = window.confirm("Do you want to cancel this reservation? This cannot be undone.");

    if (isOk) {
      console.log("cancelling reservation: " + reservation_id);
      await updateReservationStatus(reservation_id, "cancelled");
      await refreshReservations();
    }
  };

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
          <th>Edit</th>
          <th>Cancel</th>
        </tr>
      </thead>
      <tbody>
        {notFinishedReservations.map((reservation, index) => (
          <ReservationRecord
            key={reservation.reservation_id}
            reservation={reservation}
            onCancel={onCancelReservationHandler}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ReservationsTable;
