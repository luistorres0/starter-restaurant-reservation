const knex = require("../db/connection");

const list = (date) => {
  if (date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
      .orderBy("reservation_time");
  }

  return knex("reservations").select("*").orderBy("reservation_time");
};

const create = (newReservation) => {
  return knex("reservations")
    .insert(newReservation, "*")
    .then((reservations) => reservations[0]);
};

const read = (reservation_id) => {
  return knex("reservations").select("*").where({ reservation_id }).first();
};

const updateReservationStatus = (reservation_id, status) => {
  return knex("reservations")
    .update({ status }, "*")
    .where({ reservation_id })
    .then((reservations) => reservations[0]);
};

module.exports = {
  list,
  create,
  read,
  updateReservationStatus,
};
