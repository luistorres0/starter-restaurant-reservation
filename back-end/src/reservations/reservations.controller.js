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
  const date = new Date(newReservation.reservation_date);
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
