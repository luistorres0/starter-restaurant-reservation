const knex = require("../db/connection");

function getReservationById(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

module.exports = {
  getReservationById,
};
