import React from "react";

const RestaurantTableRecord = ({ table }) => {
  const { table_name, capacity } = table;
  return (
    <tr>
      <td>{table_name}</td>
      <td>{capacity}</td>
    </tr>
  );
};

export default RestaurantTableRecord;
