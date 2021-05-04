const request = require("request");
const notifier = require("node-notifier");

const districts = [
  { districtId: 505, districtName: "Jaipur I" },
  { districtId: 506, districtName: "Jaipur II" },
];

const age = parseInt(getArgValue("-age") || 18);
const interval = parseInt(getArgValue("-interval") || 60);

try {
  console.log(
    `Script starting for age: ${age} years, running at delay of time ${interval} Seconds`
  );

  coWinVaccineCheck();
} catch (err) {
  console.error(err);
  notifyError();
}

function getArgValue(argument) {
  const argumentIndex =
    process.argv.findIndex((arg) => {
      return arg == argument;
    }) + 1;
  return argumentIndex > 0 ? process.argv[argumentIndex] : null;
}

function dateToday() {
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  today = dd + "-" + mm + "-" + yyyy;
  return today;
}

function runForDistrict(districtId, districtName, age) {
  const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=${districtId}&date=${dateToday()}`;

  // console.log(`Caling URL ${url}`);

  request(url, { json: true }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Running for ${districtName}`);

    let slotsAvailable = 0;
    let dates = new Set();
    if (body.centers) {
      body.centers.map((center) => {
        center.sessions.forEach((session) => {
          if (session.min_age_limit == age && session.available_capacity > 0) {
            slotsAvailable += session.available_capacity;
            dates.add(session.date);
          }
        });
      });
    }

    if (slotsAvailable > 0) {
      notifyAvailable(age, slotsAvailable, districtName, Array.from(dates));
    }
  });
}

function notifyAvailable(age, slotsAvailable, districtName, dates) {
  notifier.notify({
    title: `Slots Available for Age ${age}+ : ${slotsAvailable}`,
    message: `${districtName} Dates Available are ${dates}`,
  });
}

function notifyError() {
  notifier.notify({
    title: `Script Error`,
    message: `Script has some error. Please check the logs`,
  });
}

function coWinVaccineCheck() {
  console.log(
    `coWinVaccineCheck Function running at Time ${Date(Date.now()).toString()}`
  );

  districts.forEach((district) => {
    runForDistrict(district.districtId, district.districtName, age);
  });

  console.log(`Waiting for ${interval} seconds. `);
  setTimeout(arguments.callee, interval * 1000);
}
