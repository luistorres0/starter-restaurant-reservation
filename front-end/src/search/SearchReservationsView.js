import React, { useState } from "react";
import ReservationsTable from "../dashboard/ReservationsTable";

const SearchReservationsView = () => {
  const [matchedReservations, setMatchedReservations] = useState([]);
  const [formMobileNumber, setFormMobileNumber] = useState("");

  const onChangeHandler = (event) => {
    setFormMobileNumber(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log(formMobileNumber);
  };

  return (
    <div>
      <h2 className="mt-3 mb-5">Search</h2>
      {/* Render the form for searching by mobile number */}
      <form onSubmit={onSubmitHandler}>
        <div className="input-group">
          <input
            className="form-control col-3"
            type="text"
            name="mobile_number"
            id="mobile_number"
            placeholder="Enter a customer's phone number"
            onChange={onChangeHandler}
            value={formMobileNumber}
          />
          <button type="submit" className="btn btn-primary">
            Find
          </button>
        </div>
      </form>

      <hr style={{ borderTop: "1px solid black" }} className="mt-5" />

      {/* Render the results of the search */}
      <h5 className="my-3">Search Results</h5>
      <ReservationsTable reservations={matchedReservations} />
    </div>
  );
};

export default SearchReservationsView;
