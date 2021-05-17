import React from "react";

const RestaurantTableRecord = ({ table }) => {
  const {  table_name, capacity, isFree } = table;
  return (
    <tr>
      <td>{table.table_id}</td>
      <td>{table_name}</td>
      <td>{capacity}</td>
      <td><span data-table-id-status={`${table.table_id}`}>{isFree ? "Free" : "Occupied"}</span></td>
    </tr>
  );
};

export default RestaurantTableRecord;
