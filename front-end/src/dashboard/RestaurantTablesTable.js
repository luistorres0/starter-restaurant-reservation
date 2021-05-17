import React from "react";
import RestaurantTableRecord from "./RestaurantTableRecord";

const RestaurantTablesTable = ({ tables }) => {
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
          </tr>
        </thead>
        <tbody>
          {tables.map((table, index) => (
            <RestaurantTableRecord key={index} table={table} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantTablesTable;
