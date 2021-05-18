// dummy tables
tables = [
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

async function list(req, res, next) {
  const data = tables;
  res.json({ data });
}

module.exports = {
  list,
};
