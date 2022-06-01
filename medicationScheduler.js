/**
 * Medication Scheduler, use given meds and timing to create a message for all meds taken in the day.
 * 
 * @date 06/01/2022
 * @input array of meds object containing med type and time taken during day, as well as the period of the medication.
 * @output meds schedule on the given date, sorted in ascending time order.
 * Sample output:
    {
    12:00: "asp, adv",
    15:30: "asp",
    19:30: "adv",
    7:00: "adv",
    8:00: "asp"
    }
 */

const input = [
  {
    name: "asp",
    startedOn: "10-2-2021",
    endedOn: "08-2-2022",
    times: ["8:00", "12:00", "15:30"],
  },
  {
    name: "adv",
    startedOn: "12-2-2021",
    endedOn: "05-2-2022",
    times: ["7:00", "12:00", "19:30"],
  },
];

// solution - parse the target date and filter on the med taken lists to get the correct med on that date
// then sort the med lists as well as combine meds that have the same taken time, output the final list
const getScheduleForDay = (input, date) => {
  const currentDay = Date.parse(date);
  const medsTaken = [];
  input.forEach((med) => {
    const medStart = Date.parse(med.startedOn);
    const medEnd = Date.parse(med.endedOn);
    if (currentDay >= medStart && currentDay <= medEnd) {
      med.times.forEach((time) => {
        medsTaken.push({ time, name: med.name });
      });
    }
  });

  // sort meds taken by time of the day
  medsTaken.sort((a, b) => {
    const timeA = a.time.split(":").join("");
    const timeB = b.time.split(":").join("");
    return eval(timeA - timeB);
  });

  const result = {};
  medsTaken.forEach((item) => {
    if (result[item.time] === undefined) result[item.time] = item.name;
    else result[item.time] += `, ${item.name}`;
  });
  return result;
};

console.log(getScheduleForDay(input, "01-01-2022"));
