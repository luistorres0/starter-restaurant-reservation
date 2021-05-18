import React from "react";

const RestaurantTableRecord = ({ table }) => {
  const { table_id, table_name, capacity, reservation_id } = table;
  return (
    <tr>
      <td>{table_id}</td>
      <td>{table_name}</td>
      <td>{capacity}</td>
      <td>
        <span data-table-id-status={`${table_id}`}>{reservation_id ? "Occupied" : "Free"}</span>
      </td>
    </tr>
  );
};

export default RestaurantTableRecord;
