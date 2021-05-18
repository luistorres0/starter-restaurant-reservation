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

async function list(req, res, next) {
  const data = tables;
  res.json({ data });
}

async function create(req, res, next) {
  table_id_max = Math.max(table_id_max, tables.length);
  table_id_max++;
  const newId = table_id_max;

  const newTable = {
    table_id: newId,
    ...req.body.data,
    reservation_id: null,
  };

  newTable.capacity = Number(newTable.capacity);

  tables.push(newTable);

  res.json({ data: newTable });
}

module.exports = {
  list,
  create,
};
