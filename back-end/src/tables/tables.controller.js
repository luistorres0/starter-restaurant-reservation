const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

//TODO: REMOVE DUMMY DATA WHEN DB IS SETUP

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

// ================================================================================================================== //
// ============================================== VALIDATION MIDDLEWARE ============================================= //
// ================================================================================================================== //

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

  res.locals.newTable = tableData;
  next();
}

// ====================================================== //

async function tableExists(req, res, next) {
  const { tableId } = req.params;

  // const foundTable = tables.find((table) => table.table_id === Number(tableId));
  const foundTable = await service.read(Number(tableId));
  if (!foundTable) {
    return next({
      status: 400,
      message: `Table ${tableId} not found.`,
    });
  }

  res.locals.table = foundTable;
  next(); // next stop: 'validateSeatReservations()'
}

// ====================================================== //

async function validateSeatReservation(req, res, next) {
  // get the foundTable
  const { table } = res.locals;
  const { reservation_id } = req.body.data;

  // try to find the reservation for incoming reservation_id
  const reservation = await service.getReservationById(Number(reservation_id));

  // if no reservation found for provided id then throw error
  if (!reservation) {
    return next({
      status: 400,
      message: `Reservation for id ${reservation_id} not found.`,
    });
  }

  // if reservation found, check if reservation party size is less than or equal to table capacity
  if (reservation.people > table.capacity) {
    return next({
      status: 400,
      message: "Reservation party size exceeds table capacity.",
    });
  }

  // also check if table is free
  if (table.reservation_id) {
    return next({
      status: 400,
      message: "Table is already occupied.",
    });
  }
  // if validation checks pass, move on to 'update()'
  next();
}

// ================================================================================================================== //
// ================================================= ROUTE HANDLERS ================================================= //
// ================================================================================================================== //

async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}

// ====================================================== //

async function create(req, res, next) {
  const newTable = res.locals.newTable;

  const data = await service.create(newTable);

  res.json({ data });
}

// ====================================================== //

async function update(req, res, next) {
  const { reservation_id } = req.body.data;
  const { table } = res.locals;

  const data = await service.update(table.table_id, Number(reservation_id));
  console.log(data);

  res.json({ data });
}

// ====================================================== //

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [validateNewTable, asyncErrorBoundary(create)],
  update: [tableExists, validateSeatReservation, update],
};
