import React from "react";
import { deleteReservationFromTable } from "../utils/api";
import RestaurantTableRecord from "./RestaurantTableRecord";

const RestaurantTablesTable = ({ tables, loadTables }) => {
  const onFinishHandler = async (table_id) => {
    const isOk = window.confirm("Is this table ready to seat new guests? This cannot be undone.");

    if (isOk) {
      console.log(`Deleting table: ${table_id}`);
      await deleteReservationFromTable(table_id);
      await loadTables();
    }
  };

  return (
    <div>
      <h4 className="mt-5 mb-1">Tables</h4>
      <table className="table w-25">
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
