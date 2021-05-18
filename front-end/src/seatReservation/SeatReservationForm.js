import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";

// dummy tables for testing.
const testTables = [
  {
    table_id: 1,
    table_name: "#1",
    capacity: 2,
    reservation_id: null,
  },
  {
    table_id: 2,
    table_name: "#2",
    capacity: 4,
    reservation_id: null,
  },
];

// dummy reservations for testing.
const testReservations = [
  {
    reservation_id: 1,
    first_name: "Luis",
    last_name: "Torres",
    mobile_number: "931-446-4816",
    reservation_date: "2021-05-20",
    reservation_time: "12:00",
    people: 2,
  },
  {
    reservation_id: 2,
    first_name: "Jeanette",
    last_name: "Opoku",
    mobile_number: "931-446-4816",
    reservation_date: "2021-05-20",
    reservation_time: "15:00",
    people: 5,
  },
];

const SeatReservationForm = () => {
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [tables, setTables] = useState([...window.tables]); //TODO: Change default to null when backend is implemented
  const [tableId, setTableId] = useState(0);
  const { reservation_id } = useParams();

  const history = useHistory();

  const onChangeHandler = (event) => {
    setTableId(event.target.value);
  };

  const onCreateHandler = async (event) => {
    event.preventDefault();

    const tablesIndex = testTables.findIndex((table) => table.table_id === Number(tableId));
    const reservationsIndex = testReservations.findIndex(
      (reservation) => reservation.reservation_id === Number(reservation_id)
    );
    const currentTable = testTables[tablesIndex];
    const currentReservation = testReservations[reservationsIndex];

    console.log("res id", reservation_id);
    console.log("table", currentTable);
    console.log("reservation", currentReservation);

    if (validateForm(currentTable, currentReservation)) {
      testTables[tablesIndex].reservation_id = Number(reservation_id);

      history.push("/dashboard");

      // TODO: RETURN HERE WHEN YOUR READY TO CREATE THE TABLE.
      //   try {
      //     const createdReservation = await createReservation({ data: { ...formData } });
      //     formatReservationDate(createdReservation);
      //     history.push(`/dashboard?date=${createdReservation.reservation_date}`);
      //   } catch (e) {
      //     setError(e);
      //   }
      // }
    }
  };

  const validateForm = (table, reservation) => {
    const errors = [];
    let isValid = true;

    // check if the reservation party exceeds the capacity of the table
    if (reservation.people > table.capacity) {
      errors.push({
        message: "Party size exceeds table capacity.",
      });

      isValid = false;
    }

    setValidationErrors(errors);

    return isValid;
  };

  const onCancelHandler = () => {
    history.goBack();
  };

  return (
    <div>
      <h2 className="mt-3 mb-5">Seat Reservation</h2>

      {validationErrors.map((valError, index) => (
        <ErrorAlert key={index} error={valError} />
      ))}

      <form onSubmit={onCreateHandler} className="w-50">
        <div className="form-group row">
          <label htmlFor="table_id" className="col-sm-2 col-form-label">
            Table number
          </label>
          <div className="col-sm-10">
            <select
              className="form-select"
              id="table_id"
              name="table_id"
              onChange={onChangeHandler}
              value={tableId}
            >
              {/* TODO: OPTIONS WITH TABLES */}
              {/* First the default option */}
              <option defaultValue={0}>
                Select table
              </option>
              {testTables.map((table) => (
                <option key={table.table_id} value={table.table_id}>
                  {`${table.table_name} - ${table.capacity}`}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group col mt-5 p-0">
          <button className="btn btn-secondary mr-2" onClick={onCancelHandler}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SeatReservationForm;
