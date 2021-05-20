const knex = require("../db/connection");

function getReservationById(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function list() {
  return knex("tables").select("*");
}

function create(newTable) {
  return knex("tables")
    .insert(newTable, "*")
    .then((tables) => tables[0]);
}

module.exports = {
  getReservationById,
  list,
  create,
};
