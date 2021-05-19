import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { updateTable } from "../utils/api";

const SeatReservationForm = ({ reservations, tables, loadTables }) => {
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [tableId, setTableId] = useState(0);
  const { reservation_id } = useParams();

  const history = useHistory();

  const onChangeHandler = (event) => {
    setTableId(event.target.value);
  };

  const onCreateHandler = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await updateTable(tableId, { data: { reservation_id } });
        loadTables();
        history.push("/dashboard");
      } catch (e) {
        setError(e);
      }
    }
  };

  const validateForm = () => {
    const errors = [];
    let isValid = true;

    const reservation = reservations.find(
      (reservation) => reservation.reservation_id === Number(reservation_id)
    );

    const table = tables.find((table) => table.table_id === Number(tableId));

    // check if the reservation party exceeds the capacity of the table
    if (reservation.people > table.capacity) {
      errors.push({
        message: "Party size exceeds table capacity.",
      });

      isValid = false;
    }

    // check if the table is already occupied
    if (table.reservation_id) {
      errors.push({
        message: "Table is already occupied.",
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
              <option defaultValue={0}>Select table</option>
              {tables.map((table) => (
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
      <ErrorAlert error={error} />
    </div>
  );
};

export default SeatReservationForm;
