import React from "react";

const ReservationRecord = (props) => {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = props.reservation;
  return (
    <tr>
      <td>{reservation_id}</td>
      <td>{first_name}</td>
      <td>{last_name}</td>
      <td>{reservation_date}</td>
      <td>{reservation_time}</td>
      <td>{people}</td>
      <td>{mobile_number}</td>
      <td>
        <a className="btn btn-outline-primary" href={`/reservations/${reservation_id}/seat`}>
          Seat
        </a>
      </td>
    </tr>
  );
};

export default ReservationRecord;
