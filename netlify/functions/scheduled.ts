import { schedule } from "@netlify/functions";
import fetch from "node-fetch";
import dayjs from "dayjs";

export const handler = schedule("*/1 * * * *", async () => {
  await fetch('https://urlcron.netlify.app/api/schedule', {
    method: "POST",
    body: JSON.stringify({
      date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    }),
  });
  return {
    statusCode: 200,
  };
});
