import React from "react";
import { deleteReservationFromTable, updateReservationStatus } from "../utils/api";
import RestaurantTableRecord from "./RestaurantTableRecord";

const RestaurantTablesTable = ({ tables, loadTables, refreshReservations }) => {
  const onFinishHandler = async (table_id, reservation_id) => {
    const isOk = window.confirm("Is this table ready to seat new guests? This cannot be undone.");

    if (isOk) {
      await deleteReservationFromTable(table_id);
      // await updateReservationStatus(reservation_id, "finished");
      await loadTables();
      await refreshReservations();
    }
  };

  return (
    <div>
      <h4 className="mt-5 mb-1">Tables</h4>
      <table className="table w-100">
        <thead>
          <tr>
            <th>Table ID</th>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Finish</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table, index) => (
            <RestaurantTableRecord key={index} table={table} onFinishHandler={onFinishHandler} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantTablesTable;
