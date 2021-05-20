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

// ====================================================== //

async function tableExists(req, res, next) {
  const { tableId } = req.params;

  const foundTable = tables.find((table) => table.table_id === Number(tableId));
  if(!foundTable){
    return next({
      status: 400,
      message: `Table ${tableId} not found.`
    })
  }

  res.locals.table = foundTable;
  next();
}

// ====================================================== //

async function validateSeatReservation(req, res, next){
  // get the foundTable
  // try to find the reservation for incoming reservation_id
  // if reservation found, check if reservation party size is less than or equal to table capacity
  // also check if table is free
  // if party size passes check, then assign reservation id to table.reservation_id
  // if not, throw error
  // if table is not free throw error
  next();
}

// ================================================================================================================== //
// ================================================= ROUTE HANDLERS ================================================= //
// ================================================================================================================== //

async function list(req, res, next) {
  const data = tables;
  res.json({ data });
}

// ====================================================== //

async function create(req, res, next) {
  const newTable = res.locals.newTable;

  tables.push(newTable);

  res.json({ data: newTable });
}

// ====================================================== //

async function update(req, res, next) {
  const { reservation_id } = req.body.data;
  const {table} = res.locals;

  table.reservation_id = Number(reservation_id);

  res.json({ data: table });
}

// ====================================================== //

module.exports = {
  list,
  create: [validateNewTable, create],
  update: [tableExists, update]
};
