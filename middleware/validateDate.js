const moment = require("moment");

async function isValidDate(query) {
  const { from, to, limit } = query;
  if (from && !moment(from, "YYYY-MM-DD", true).isValid()) {
    throw new Error("Invalid start date format.");
  }
  if (to && !moment(to, "YYYY-MM-DD", true).isValid()) {
    throw new Error("Invalid end date format.");
  }
  const limitVal = limit ? parseInt(limit, 10) : null;
  if (limitVal !== null && isNaN(limitVal)) {
    throw new Error("Invalid limit parameter: must be a number");
  }
  return "";
}

module.exports = { isValidDate };
