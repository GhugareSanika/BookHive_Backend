import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200) console.log("GET request send successfully");
      else console.log("GET request failed", res.statusCode);
    })
    .on("error", (e) => console.error("Error while sending request", e));
});

export default job;

// import cron from "cron";
// import https from "https";

// // Validate the API_URL first
// if (!process.env.API_URL) {
//   throw new Error("API_URL environment variable is not defined");
// }

// // Ensure URL starts with https://
// const apiUrl = process.env.API_URL.startsWith("https://")
//   ? process.env.API_URL
//   : `https://${process.env.API_URL}`;

// const job = new cron.CronJob(
//   "*/14 * * * *", // Every 14 minutes
//   function () {
//     console.log(`Sending request to ${apiUrl} at ${new Date().toISOString()}`);

//     const req = https.get(apiUrl, (res) => {
//       let data = "";

//       res.on("data", (chunk) => {
//         data += chunk;
//       });

//       res.on("end", () => {
//         if (res.statusCode === 200) {
//           console.log("GET request successful", {
//             status: res.statusCode,
//             headers: res.headers,
//             body: data,
//           });
//         } else {
//           console.error("GET request failed", {
//             status: res.statusCode,
//             headers: res.headers,
//             body: data,
//           });
//         }
//       });
//     });

//     req.on("error", (e) => {
//       console.error("Request failed completely", {
//         error: e.message,
//         stack: e.stack,
//       });
//     });

//     req.on("timeout", () => {
//       console.error("Request timed out");
//       req.destroy();
//     });

//     req.setTimeout(10000); // 10 second timeout
//   },
//   null, // onComplete
//   true, // auto start
//   "UTC" // timezone
// );

// // Handle process termination
// process.on("SIGINT", () => {
//   job.stop();
//   process.exit();
// });

// export default job;
