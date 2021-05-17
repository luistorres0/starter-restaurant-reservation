import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date";

const NewReservationForm = () => {
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  const defaultFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [formData, setFormData] = useState({ ...defaultFormData });
  const history = useHistory();

  const onChangeHandler = (event) => {
    const value = event.target.name === "people" ? Number(event.target.value) : event.target.value;

    setFormData((currentFormData) => {
      return {
        ...currentFormData,
        [event.target.name]: value,
      };
    });
  };

  const onCancelHandler = () => {
    history.goBack();
  };

  const onCreateHandler = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const createdReservation = await createReservation({ data: { ...formData } });

        formatReservationDate(createdReservation);

        history.push(`/dashboard?date=${createdReservation.reservation_date}`);
      } catch (e) {
        setError(e);
      }
    }
  };

  const validateForm = () => {
    setValidationErrors([]);
    const date = new Date(formData.reservation_date);

    let isValid = true;

    // check if date is a Tuesday
    if (date.getUTCDay() === 2) {
      setValidationErrors((currentErrors) => [
        ...currentErrors,
        {
          message: "Reservation date cannot fall on a Tuesday.",
        },
      ]);
      isValid =  false;
    }

    //check if date is in the past
    const todayDate = new Date();
    if (date < todayDate) {
      setValidationErrors((currentErrors) => [
        ...currentErrors,
        {
          message: "Reservation date cannot be a date in the past.",
        },
      ]);
      isValid =  false;
    }

    console.log(formData.reservation_time);

    return isValid;
  };

  return (
    <div>
      <h2 className="mt-3 mb-5">Create New Reservation</h2>
      {validationErrors.map((valError, index) => (
        <ErrorAlert key={index} error={valError} />
      ))}
      <form onSubmit={onCreateHandler} className="w-50">
        <div className="form-group row">
          <label htmlFor="first_name" className="col-sm-2 col-form-label">
            First Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="first_name"
              name="first_name"
              onChange={onChangeHandler}
              value={formData.first_name}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="last_name" className="col-sm-2 col-form-label">
            Last Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="last_name"
              name="last_name"
              onChange={onChangeHandler}
              value={formData.last_name}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="reservation_date" className="col-sm-2 col-form-label">
            Reservation Date
          </label>
          <div className="col-sm-10">
            <input
              type="date"
              className="form-control"
              id="reservation_date"
              name="reservation_date"
              onChange={onChangeHandler}
              value={formData.reservation_date}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="reservation_time" className="col-sm-2 col-form-label">
            Reservation Time
          </label>
          <div className="col-sm-10">
            <input
              type="time"
              className="form-control"
              id="reservation_time"
              name="reservation_time"
              onChange={onChangeHandler}
              value={formData.reservation_time}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="people" className="col-sm-2 col-form-label">
            People
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="people"
              name="people"
              onChange={onChangeHandler}
              value={formData.people}
              min={1}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="mobile_number" className="col-sm-2 col-form-label">
            Mobile #
          </label>
          <div className="col-sm-10">
            <input
              type="tel"
              className="form-control"
              id="mobile_number"
              name="mobile_number"
              onChange={onChangeHandler}
              // pattern="[0-9]{3}-[0-9]{4}"
              placeholder="888-888-8888"
              value={formData.mobile_number}
              required
            />
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

export default NewReservationForm;
