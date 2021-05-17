import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Dummy database. Remove when you implement posting to backend API.
window.tables = [];

const NewTableForm = () => {
  //   const [error, setError] = useState(null);
  //   const [validationErrors, setValidationErrors] = useState([]);

  const defaultFormData = {
    table_name: "",
    capacity: "",
  };

  const [formData, setFormData] = useState({ ...defaultFormData });
  const history = useHistory();

  const onChangeHandler = (event) => {
    setFormData((currentFormData) => {
      return {
        ...currentFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onCreateHandler = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      // TODO: Delete this when done setting up posting to backend.
      window.tables.push(formData);
      console.log(window.tables);

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

  const validateForm = () => {
    // const errors = [];
    let isValid = true;

    // setValidationErrors(errors);

    return isValid;
  };

  const onCancelHandler = () => {
    history.goBack();
  };

  return (
    <div>
      <h2 className="mt-3 mb-5">Create Table</h2>

      <form onSubmit={onCreateHandler} className="w-50">
        <div className="form-group row">
          <label htmlFor="table_name" className="col-sm-2 col-form-label">
            Table Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="table_name"
              name="table_name"
              onChange={onChangeHandler}
              value={formData.table_name}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="capacity" className="col-sm-2 col-form-label">
            Capacity
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="capacity"
              name="capacity"
              onChange={onChangeHandler}
              value={formData.capacity}
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
    </div>
  );
};

export default NewTableForm;
