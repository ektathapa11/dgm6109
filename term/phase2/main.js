"use strict";

let dailyPhoneData = [

    {
        date: "2026-02-08", // date of observation
        appSwitches: 110, // number of times apps were switched
        totalScreenTimeMinutes: 420, // total screen time in minutes
        notifications: 89, // total notifications received
        mentalOverload2pm: 3, // overload level recorded at 2pm (scale 1–5)
        mentalOverload10pm: 4, // overload level recorded at 10pm (scale 1–5)
        dailyAverageOverload: 3.5
    }, // observation for Feb 8, 2026

    {
        date: "2026-02-09",
        appSwitches: 142,
        totalScreenTimeMinutes: 510,
        notifications: 118,
        mentalOverload2pm: 4,
        mentalOverload10pm: 5,
        dailyAverageOverload: 4.5
    }, // observation for Feb 9, 2026

    {
        date: "2026-02-10",
        appSwitches: 156,
        totalScreenTimeMinutes: 545,
        notifications: 132,
        mentalOverload2pm: 4,
        mentalOverload10pm: 5,
        dailyAverageOverload: 4.5
    }, // observation for Feb 10, 2026

    {
        date: "2026-02-11",
        appSwitches: 128,
        totalScreenTimeMinutes: 470,
        notifications: 104,
        mentalOverload2pm: 3,
        mentalOverload10pm: 5,
        dailyAverageOverload: 4
    } // observation for Feb 11, 2026

]; // list of daily phone usage observations


// console.log(JSON.stringify(dailyPhoneData));
showData(dailyPhoneData);

