// dummy tables
let tables = [
  {
    table_id: 1,
    table_name: "#1",
    capacity: 4,
    reservation_id: null,
  },
  {
    table_id: 2,
    table_name: "#2",
    capacity: 3,
    reservation_id: null,
  },
  {
    table_id: 3,
    table_name: "#3",
    capacity: 6,
    reservation_id: null,
  },
];

let table_id_max = 0;

async function validateNewTable(req, res, next) {
  const tableData = req.body.data;
  tableData.capacity = Number(tableData.capacity);

  // check if capacity is 1 or greater
  if (tableData.capacity < 1) {
    return next({
      status: 400,
      message: "Capacity must be 1 or greater",
    });
  }

  // check if table name length is 2 or greater.
  if (tableData.table_name.length < 2) {
    return next({
      status: 400,
      message: "Table name must be 2 or greater",
    });
  }

  table_id_max = Math.max(table_id_max, tables.length);
  table_id_max++;
  const newId = table_id_max;

  const newTable = {
    table_id: newId,
    ...tableData,
    reservation_id: null,
  };

  res.locals.newTable = newTable;
  next();
}

async function list(req, res, next) {
  const data = tables;
  res.json({ data });
}

async function create(req, res, next) {
  const newTable = res.locals.newTable;

  tables.push(newTable);

  res.json({ data: newTable });
}

async function update(req, res, next) {
  const { reservation_id } = req.body.data;
  const { tableId } = req.params;

  const foundTable = tables.find((table) => table.table_id === Number(tableId));
  foundTable.reservation_id = Number(reservation_id);

  res.json({ data: foundTable });
}

module.exports = {
  list,
  create: [validateNewTable, create],
  update,
};
