/**
 * List handler for reservation resources
 */

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

async function list(req, res, next) {
  const { date } = req.query;
  const data = await service.list(date);

  res.json({
    data,
  });
}

// Validates by checking if all required fields are present in the new reservation body.
function validateNewReservationProperties(req, res, next) {
  const REQUIRED_PROPS = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];

  const newReservation = req.body.data;
  if (!newReservation) {
    return next({
      status: 400,
      message: "Couldn't find data. Make sure you have a data key in your request body.",
    });
  }

  const missingProps = REQUIRED_PROPS.filter((prop) => newReservation[prop] === undefined);

  if (missingProps.length) {
    return next({
      status: 400,
      message: `Please provide the following props: ${missingProps.join(", ")}`,
    });
  }

  for (let prop in newReservation) {
    if (prop !== "people") {
      if (!newReservation[prop].length) {
        return next({
          status: 400,
          message: `${prop} cannot be empty.`,
        });
      }
    }
  }

  const timeStamp = Date.parse(newReservation.reservation_date);
  if (isNaN(timeStamp)) {
    return next({
      status: 400,
      message: "reservation_date is not a valid date",
    });
  }

  const timeFormat = /\d\d:\d\d/;
  const time = newReservation.reservation_time;
  if (!time.match(timeFormat)) {
    return next({
      status: 400,
      message: "reservation_time is not a valid time",
    });
  }

  const people = newReservation.people;
  if (typeof people !== "number" || people < 1) {
    return next({
      status: 400,
      message: "people is not valid",
    });
  }

  // check if date falls on a Tuesday
  const date = new Date(`${newReservation.reservation_date}T${newReservation.reservation_time}:00`);
  if (date.getUTCDay() === 2) {
    return next({
      status: 400,
      message: "Invalid date. The restaurant is closed on Tuesdays",
    });
  }

  // check if date falls in the past
  const todaysDate = new Date();
  if (date < todaysDate) {
    return next({
      status: 400,
      message: "Invalid date. Please select a date from the future.",
    });
  }

  // check if time is before the restaurant opens at 10:30am
  const hours = date.getHours();
  const mins = date.getMinutes();
  if (hours < 10 || (hours === 10 && mins < 30)) {
    return next({
      status: 400,
      message: "Cannot reserve a time before the restaurant opens at 10:30am",
    });
  }

  // check if time is after 9:30pm. Time is too close to closing time.
  if ((hours === 21 && mins > 30) || (hours === 22 && mins < 30)) {
    return next({
      status: 400,
      message: "Cannot reserve a time after 9:30 PM. Too close to closing time.",
    });
  }

  // check if time is at or after 10:30pm. Restaurant closes at 10:30pm.
  if (hours > 22 || (hours === 22 && mins >= 30)) {
    return next({
      status: 400,
      message: "Cannot reserve a time after 10:30 PM. Restaurant closes at 10:30 PM.",
    });
  }

  next();
}

async function create(req, res, next) {
  const newReservation = req.body.data;
  const data = await service.create(newReservation);

  res.status(201).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [validateNewReservationProperties, asyncErrorBoundary(create)],
};
